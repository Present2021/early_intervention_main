import Joi from "joi";

export const putInformationSchema = Joi.object({
    applicant: Joi.object({
        full_name: Joi.string().allow(null, ''),
        phone: Joi.string().allow(null, ''),
        relation_to_child: Joi.string().allow(null, '')
    }),
    child: Joi.object({
        full_name: Joi.string().allow(null, ''),
        gender: Joi.string().allow(null, ''),
        birthdate: Joi.date().allow(null, ''),
        household_address: Joi.string().allow(null, ''),
        contact_address: Joi.string().allow(null, ''),
        national_id_number: Joi.string().allow(null, ''),
        identities: Joi.array().items(Joi.string()),
        joint_evaluation_report_expired_on: Joi.date().allow(null, ''),
        diagnosis_certificate_issued_on: Joi.date().allow(null, ''),
    }),
    postal_bank_account: Joi.object({
        account_name: Joi.string().allow(null, ''),
        office_code: Joi.string().allow(null, ''),
        account_code_number: Joi.string().allow(null, ''),
        national_id_number: Joi.string().allow(null, '')
    }),
});


export const putUserInformationFileNames = [
    'household_certificate_copies[]',
    'joint_evaluation_report_copies[]',
    'diagnosis_certificate_copies[]',
    'postal_passbook_cover_copies[]',
    'low_income_certificate_copies[]',
    'delayed_school_entry_copies[]',
    'disability_identification_copies[]',
];


export const putApplicationDraftSchema = Joi.object({
    month: Joi.string().required(),
    transportation_count: Joi.number().allow(null, 0),
    self_pay_programs: Joi.array().items(
        Joi.object({
            date: Joi.string().required(),
            amount: Joi.number().required(),
            file_url: Joi.string().uri(),
        })
    ),
});

export const queryApplicationDraftSchema = Joi.object({
    months: Joi.array().items(Joi.date()),
});

export const submitApplicationSchema = Joi.object({
    months: Joi.array().items(Joi.date()).required(),
});

export const submitApplicationAdditionalDocumentsSchema = Joi.object({
    month: Joi.string().required(),
});

