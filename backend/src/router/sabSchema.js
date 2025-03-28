import Joi from "joi";

export const querySabApplicationSchema = Joi.object({
    statuses: Joi.array().items(Joi.string().valid('pending', 'approved', 'rejected')),
    application_submitted_months: Joi.array().items(Joi.date()),
});

export const verifyAllowanceQualificationSchema = Joi.object({
    child_national_id_number: Joi.string().required(),
});

export const reviewApplicationSchema = Joi.object({
    child_national_id_number: Joi.string().required(),
    months: Joi.array().items(Joi.date()).required(),
    sab_memo: Joi.any(),
});

export const reviewApplicationByIdSchema = Joi.object({
    sab_memo: Joi.any(),
});

export const putSabMemoSchema = Joi.object({
    sab_memo: Joi.any().required(),
});
