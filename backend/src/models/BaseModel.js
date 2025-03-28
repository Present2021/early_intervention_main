import Knex from 'knex';
import { Model } from 'objection';
import knexfile from '../../knexfile.js';
import objectionSoftDelete from 'objection-js-soft-delete';

export const knex = Knex(knexfile.development);
Model.knex(knex);

export { Model as BaseModel };

/**
 * Class decorator for soft delete.
 * Workaround of Issue #116, Ref: https://github.com/alex-w0/objection-js-soft-delete/issues/116
 */
const softDelete = objectionSoftDelete.default({
    columnName: 'deleted_at',
    deletedValue: knex.fn.now(),
    notDeletedValue: null,
});

/**
 * @type {Omit<typeof Model, 'new'> &
 * 		import('objection-js-soft-delete').SoftDeleteStatic<typeof Model>}
 */
export const SoftModel = softDelete(Model);
