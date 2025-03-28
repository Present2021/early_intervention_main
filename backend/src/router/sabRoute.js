import asyncHandler from 'express-async-handler';
import { requestValidator } from '../helper/customError.js';
import { querySabApplicationSchema, verifyAllowanceQualificationSchema, reviewApplicationSchema, putSabMemoSchema, reviewApplicationByIdSchema } from './sabSchema.js';
import {
	approveSabApplication,
	getSabApplications,
	rejectSabApplication,
	putSabMemo,
	submitAdditionalDocuments,
	verifyAllowanceQualification,
	approveSabApplicationById,
	rejectSabApplicationById,
	verifyAllowanceQualificationById,
} from '../controllers/sabApplicationController.js';
import upload from '../helper/uploadFileHelper.js';

/** @param {import('express').Express} app */
export default function applicationRoute(app) {
	const prefix = "sab";

	app.get(`/${prefix}/applications`,
		requestValidator('query', querySabApplicationSchema),
		asyncHandler(getSabApplications),
	);

	app.post(`/${prefix}/verify-allowance-qualification`,
		upload.none(),
		requestValidator('body', verifyAllowanceQualificationSchema),
		asyncHandler(verifyAllowanceQualification),
	);

	app.post(`/${prefix}/applications/:applicationId/verify-allowance-qualification`,
		upload.none(),
		asyncHandler(verifyAllowanceQualificationById),
	);

	app.post(`/${prefix}/applications/approve`,
		upload.none(),
		requestValidator('body', reviewApplicationSchema),
		asyncHandler(approveSabApplication),
	);

	app.post(`/${prefix}/applications/reject`,
		upload.none(),
		requestValidator('body', reviewApplicationSchema),
		asyncHandler(rejectSabApplication),
	);

	app.post(`/${prefix}/applications/:applicationId/approve`,
		upload.none(),
		requestValidator('body', reviewApplicationByIdSchema),
		asyncHandler(approveSabApplicationById),
	);

	app.post(`/${prefix}/applications/:applicationId/reject`,
		upload.none(),
		requestValidator('body', reviewApplicationByIdSchema),
		asyncHandler(rejectSabApplicationById),
	);

	app.put(`/${prefix}/applications/:applicationId/memo`,
		upload.none(),
		requestValidator('body', putSabMemoSchema),
		asyncHandler(putSabMemo),
	);

	app.post(`/${prefix}/applications/:applicationId/request-additional-documents`,
		upload.none(),
		asyncHandler(submitAdditionalDocuments),
	);

}
