import { BaseModel } from './BaseModel.js';

export default class ApplicationDraft extends BaseModel {
	static get tableName() {
		return 'application_drafts';
	}

	static get jsonAttributes() {
		return ['self_pay_programs', 'program_receipts_file_keys'];
	}
}
