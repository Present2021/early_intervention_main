import { BaseModel } from './BaseModel.js';


export default
class SubmittedApplication extends BaseModel {
	static get tableName() {
		return 'application_submitted';
	}

	static get jsonAttributes() {
		return ['applicant', 'child', 'postal_bank_account', 'attached_documents_object', 'application_months', 'sab_memo'];
	}
}
