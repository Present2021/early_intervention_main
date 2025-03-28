import Joi from 'joi';
import multer from 'multer';

export class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UnauthorizedError';
        this.code = 401;
    }
}

export class ForbiddenError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ForbiddenError';
        this.code = 403;
    }
}

export class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
        this.code = 404;
    }
}

export class UnprocessableEntityError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UnprocessableEntityError';
        this.code = 422;
    }
}

export class InternalServerError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InternalServerError';
        this.code = 500;
    }
}


/** @type {import('express').RequestHandler} */
export function errorMiddleware(err, req, resp, next) {
	console.error(err);

    if (err.isJoi) resp.status(422);
    if (err instanceof multer.MulterError) {
        resp.status(422);
        err.message = `${err.message} - Field: ${err.field}`;
    }
	else resp.status(err.code ?? 500);

    resp.send({
        error: err.name ?? '',
        message: err.message ?? '',
        stack: err.stack ?? '',
    });
}


/**
 * @param {'query' | 'body' | 'headers' | 'file'} requestPropertyKey
 * @param {import("joi").ObjectSchema} joiSchema
 */
export function requestValidator(requestPropertyKey, joiSchema) {
	return (req, resp, next) => {
		Joi.attempt(req[requestPropertyKey], joiSchema);
		next();
	}
}
