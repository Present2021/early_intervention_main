import SubmittedApplicationResource from "../resources/SubmittedApplicationResource.js";
import SubmittedApplication from "../models/SubmittedApplication.js";
import { NotFoundError } from "../helper/customError.js";
import User from "../models/User.js";


export const getSabApplications = async (req, resp) => {
	const applications = await SubmittedApplication.query();
	return resp.json(SubmittedApplicationResource.collection(applications));
};


export const verifyAllowanceQualification = async (req, resp) => {
	const { child_national_id_number } = req.body;

	const application = await SubmittedApplication.query()
		.whereJsonObject('child', {
			national_id_number: child_national_id_number,
		})
		.first();
	if (!application) {
		throw new NotFoundError('Application not found');
	}

	const user = await User.query().findById(application.user_id);

	await application.$query().patch({
		identity_verified: true,
	});
	await user.$query().patch({
		identity_verified: true,
	});

	return resp.json(new SubmittedApplicationResource(application).exec());
};


export const verifyAllowanceQualificationById = async (req, resp) => {
	const application = await SubmittedApplication.query()
		.findById(req.params.applicationId)
		.first();
	if (!application) {
		throw new NotFoundError('Application not found');
	}

	const user = await User.query().findById(application.user_id);

	await application.$query().patch({
		identity_verified: true,
	});
	await user.$query().patch({
		identity_verified: true,
	});

	return resp.json(new SubmittedApplicationResource(application).exec());
};


export const approveSabApplication = async (req, resp) => {
	const submittedApplication = await SubmittedApplication.query()
		.whereJsonObject('child', {
			national_id_number: req.body.child_national_id_number,
		})
		.where({
			status: 'pending',
		})
		.first();
	if (!submittedApplication) {
		throw new NotFoundError('Application not found');
	}
	await submittedApplication.$query().patch({
		status: 'approved',
		sab_memo: req.body.sab_memo,
	});
	return resp.json(submittedApplication);
};


export const rejectSabApplication = async (req, resp) => {
	const submittedApplication = await SubmittedApplication.query()
		.whereJsonObject('child', {
			national_id_number: req.body.child_national_id_number,
		})
		.where({
			status: 'pending',
		})
		.first();
	if (!submittedApplication) {
		throw new NotFoundError('Application not found');
	}
	await submittedApplication.$query().patch({
		status: 'rejected',
		sab_memo: req.body.sab_memo,
	});
	return resp.json(submittedApplication);
};


export const approveSabApplicationById = async (req, resp) => {
	const submittedApplication = await SubmittedApplication.query()
		.findById(req.params.applicationId)
		.where({
			status: 'pending',
		});
	if (!submittedApplication) {
		throw new NotFoundError('Application not found');
	}
	await submittedApplication.$query().patch({
		status: 'approved',
		sab_memo: req.body.sab_memo,
	});
	return resp.json(submittedApplication);
};


export const rejectSabApplicationById = async (req, resp) => {
	const submittedApplication = await SubmittedApplication.query()
		.findById(req.params.applicationId)
		.where({
			status: 'pending',
		});
	if (!submittedApplication) {
		throw new NotFoundError('Application not found');
	}
	await submittedApplication.$query().patch({
		status: 'rejected',
		sab_memo: req.body.sab_memo,
	});
	return resp.json(submittedApplication);
};


export const putSabMemo = async (req, resp) => {
	const submittedApplication = await SubmittedApplication.query().findById(req.params.applicationId)
		.where({
			status: 'pending',
		});
	if (!submittedApplication) {
		throw new NotFoundError('Application not found');
	}
	await submittedApplication.$query().patch({
		sab_memo: req.body.sab_memo,
	});
	return resp.json(submittedApplication);
};


export const submitAdditionalDocuments = async (req, resp) => {
	const submittedApplication = await SubmittedApplication.query().findById(req.params.applicationId);
	if (!submittedApplication) {
		throw new NotFoundError('Application not found');
	}
	await submittedApplication.$query().patch({
		status: 'waiting_additional_documents',
	});

	return resp.json({});
};
