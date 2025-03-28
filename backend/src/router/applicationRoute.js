import asyncHandler from 'express-async-handler';
import {
    putInformationSchema,
    putUserInformationFileNames,
    putApplicationDraftSchema,
    queryApplicationDraftSchema,
    submitApplicationSchema,
} from './applicationSchema.js';
import { requestValidator } from '../helper/customError.js';
import upload from '../helper/uploadFileHelper.js';
import {
    putUserInformation,
    getUserInformation,
    getApplicationDrafts,
    putApplicationDraft,
    submitApplicationDraft,
    getSubmittedApplications,
    deleteApplicationDraft,
    submitApplicationAdditionalDocuments,
} from '../controllers/applicationController.js';


/** @param {import('express').Express} app */
function applicationRoute(app) {
    const prefix = "applications"

    app.put(`/information`,
        upload.fields(putUserInformationFileNames.map(name => ({ name }))),
        requestValidator('body', putInformationSchema),
        asyncHandler(putUserInformation),
    );

    app.get(`/information`, asyncHandler(getUserInformation));

    app.put(`/applications/draft`,
        upload.fields([
            { name: 'transportation_document_copy', maxCount: 1 },
            { name: 'program_document_copy', maxCount: 1 },
            { name: 'program_receipts[]' }
        ]),
        requestValidator('body', putApplicationDraftSchema),
        asyncHandler(putApplicationDraft),
    );

    app.get(`/applications/draft`,
        requestValidator('query', queryApplicationDraftSchema),
        asyncHandler(getApplicationDrafts),
    );

    app.post(`/applications/submit`,
        upload.single('cover_document_copy'),
        requestValidator('body', submitApplicationSchema),
        asyncHandler(submitApplicationDraft),
    );

    app.get(`/applications/submitted`,
        asyncHandler(getSubmittedApplications),
    );

    app.delete('/applications/draft/:month', asyncHandler(deleteApplicationDraft));

    app.post(`/${prefix}/:applicationId/submit-additional-documents`,
        upload.fields([
            { name: 'transportation_document_copy', maxCount: 1 },
            { name: 'program_document_copy', maxCount: 1 },
        ]),
        asyncHandler(submitApplicationAdditionalDocuments),
    );
}

export default applicationRoute;
