import { BaseModel } from './BaseModel.js';

export default
class User extends BaseModel {
	static get tableName() {
		return 'users';
	}

	static get jsonAttributes() {
		return ['applicant', 'child', 'postal_bank_account', 'attached_documents_object'];
	}
}
