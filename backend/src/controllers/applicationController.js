import { UnprocessableEntityError, NotFoundError } from '../helper/customError.js';
import ApplicationDraft from '../models/ApplicationDraft.js';
import User from '../models/User.js';
import ApplicationDraftResource from '../resources/ApplicationDraftResource.js';
import { putUserInformationFileNames } from '../router/applicationSchema.js';
import UserInformationResource from '../resources/UserInformationResource.js';
import { knex } from '../models/BaseModel.js';
import SubmittedApplication from '../models/SubmittedApplication.js';
import SubmittedApplicationResource from '../resources/SubmittedApplicationResource.js';
import { getFileUrl, getKeyFromPath } from '../helpers/staticFileHelper.js';


// TODO:
const tmpUserId = 1;


function getKeyObjFromInputFieldNames(req, reqFileNames) {
    const obj = {};
    for (const reqFileName of reqFileNames) {
        if (req.files[reqFileName] != null) {
            const keyName = reqFileName.replace(/\[\]$/, '_keys');
            obj[keyName] = req.files[reqFileName].map(file => getKeyFromPath(file.path));
        }
    }
    return obj;
}

export const putUserInformation = async (req, resp) => {
    const { applicant, child, postal_bank_account } = req.body;
    const user = await User.query().findById(tmpUserId);

    const identity_verified = (req.files['joint_evaluation_report_copies[]'] || req.files['diagnosis_certificate_copies[]']) ? false : undefined;

    await user.$query().patch({
        applicant: { ...user.applicant, ...applicant },
        child: { ...user.child, ...child },
        postal_bank_account: { ...user.postal_bank_account, ...postal_bank_account },
        attached_documents_object: { ...user.attached_documents_object, ...getKeyObjFromInputFieldNames(req, putUserInformationFileNames) },
        identity_verified,
    });
    return resp.json(new UserInformationResource(user, true).exec());
}


export const getUserInformation = async (req, resp) => {
    const user = await User.query().findById(tmpUserId);
    return resp.json(new UserInformationResource(user).exec());
}


export const putApplicationDraft = async (req, resp) => {
    const { month, transportation_count } = req.body;
    const draft = await ApplicationDraft.query().findOne({
        user_id: tmpUserId,
        month,
    });
    
    const commonPartFromRequest = {};
    if (req.body.self_pay_programs == null) {
        commonPartFromRequest.self_pay_programs = [];
    }

    if (Array.isArray(req.body.self_pay_programs)) {
        const newProgramCount = req.body.self_pay_programs.filter(program => !program.file_url).length;
        if (newProgramCount !== (req.files['program_receipts[]']?.length ?? 0)) {
            throw new UnprocessableEntityError('The number of self-pay programs does not match the number of program receipts');
        }

        const self_pay_programs = req.body.self_pay_programs.map(program => ({
            date: program.date,
            amount: parseInt(program.amount, 10),
            file_url: program.file_url,
        }));
        for (let i = 0; i < (req.files['program_receipts[]'] ?? []).length; i++) {
            const fileKey = getKeyFromPath(req.files['program_receipts[]'][i].path);
            self_pay_programs[(self_pay_programs.length - newProgramCount) + i].file_url = getFileUrl(fileKey);
        }
        commonPartFromRequest.self_pay_programs = self_pay_programs;
    }

    Object.assign(commonPartFromRequest, {
        transportation_count,
        transportation_document_copy_file_key: getKeyFromPath(req.files.transportation_document_copy?.[0]?.path),
        program_document_copy_file_key: getKeyFromPath(req.files.program_document_copy?.[0]?.path),
    });

    if (!draft) {
        await ApplicationDraft.query().insert({
            user_id: tmpUserId,
            month,
            ...commonPartFromRequest,
        });
        const newDraft = await ApplicationDraft.query().findOne({
            user_id: tmpUserId,
            month,
        });
        return resp.json(new ApplicationDraftResource(newDraft, true).exec());
    }
    else {
        await draft.$query().patch({
            ...commonPartFromRequest,
        });
    };

    return resp.json(new ApplicationDraftResource(draft, true).exec());
}



export const getApplicationDrafts = async (req, resp) => {
    const drafts = await ApplicationDraft.query().where({
        user_id: tmpUserId,
        is_submitted: false,
    });
    return resp.json(ApplicationDraftResource.collection(drafts, true));
};


export const submitApplicationDraft = async (req, resp) => {
    const coverDocumentCopy = req.file;
    if (!coverDocumentCopy) {
        throw new UnprocessableEntityError('Cover document copy is required');
    }

    const drafts = await ApplicationDraft.query()
        .where({
            user_id: tmpUserId,
            is_submitted: false,
        })
        .whereIn('month', req.body.months);
    if (drafts.length === 0) {
        throw new UnprocessableEntityError('No application drafts found');
    }
    // Temporarily disable this check for testing
    // const submittedApplication = await SubmittedApplication.query().findOne({
    //     user_id: tmpUserId,
    //     status: 'pending',
    // });
    // if (submittedApplication) {
    //     throw new UnprocessableEntityError('Application already submitted');
    // }

    const user = await User.query().findById(tmpUserId);

    await knex.transaction(async trx => {
        await SubmittedApplication.query(trx).insert({
            user_id: tmpUserId,
            applicant: user.applicant,
            child: user.child,
            postal_bank_account: user.postal_bank_account,
            attached_documents_object: {
                ...user.attached_documents_object,
                cover_document_copy_key: getKeyFromPath(coverDocumentCopy.path),
            },
            application_months: ApplicationDraftResource.collection(drafts),
            identity_verified: user.identity_verified,
        });
        await ApplicationDraft.query(trx)
            .whereIn('id', drafts.map(draft => draft.id))
            .patch({
                is_submitted: true,
            });
    });
    return resp.json({})
};


export const getSubmittedApplications = async (req, resp) => {
    const submittedApplications = await SubmittedApplication.query()
        .where({
            user_id: tmpUserId,
        });
    return resp.json(SubmittedApplicationResource.collection(submittedApplications, true));
};

export const deleteApplicationDraft = async (req, res) => {
    const { month } = req.params;
    await ApplicationDraft.query()
        .where({ user_id: tmpUserId, month })
        .delete();
    
    res.status(200).json({});
};


export const submitApplicationAdditionalDocuments = async (req, resp) => {
    const application = await SubmittedApplication.query().findById(req.params.applicationId);
    if (!application) {
        throw new NotFoundError('Application not found');
    }
    const applicationMonth = application.application_months.find(applicationMonth => applicationMonth.month === req.body.month);
    if (!applicationMonth) {
        throw new UnprocessableEntityError('Application month not found');
    }
    
    applicationMonth.transportation_document_copy_file_key = getKeyFromPath(req.files.transportation_document_copy?.[0]?.path);
    applicationMonth.program_document_copy_file_key = getKeyFromPath(req.files.program_document_copy?.[0]?.path);

    await application.$query().patch({
        status: 'pending',
        application_months: application.application_months,
    });

    return resp.json({});
};
