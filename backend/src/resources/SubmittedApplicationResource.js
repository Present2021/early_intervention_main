import Resource from "resources.js";
import ApplicationDraftResource from "./ApplicationDraftResource.js";
import { getFileUrl, getFileUrls } from "../helpers/staticFileHelper.js";

export default
class SubmittedApplicationResource extends Resource {
	toArray() {
		const fileKeys = this.attached_documents_object || {};
		return {
			id: this.id,
			status: this.status,
			identity_verified: Boolean(this.identity_verified),
			applicant: {
				full_name: this.applicant.full_name,
				phone: this.applicant.phone,
				relation_to_child: this.applicant.relation_to_child,
			},
			child: {
				full_name: this.child.full_name,
				gender: this.child.gender,
				birthdate: this.child.birthdate,
				household_address: this.child.household_address,
				contact_address: this.child.contact_address,
				national_id_number: this.child.national_id_number,
				identities: this.child.identities,
				joint_evaluation_report_expired_on: this.child.joint_evaluation_report_expired_on,
				diagnosis_certificate_issued_on: this.child.diagnosis_certificate_issued_on,
			},
			postal_bank_account: {
				account_name: this.postal_bank_account.account_name,
				office_code: this.postal_bank_account.office_code,
				account_code_number: this.postal_bank_account.account_code_number,
				national_id_number: this.postal_bank_account.national_id_number,
			},


			household_certificate_copies_urls: Array.isArray(fileKeys.household_certificate_copies_keys)
				? getFileUrls(fileKeys.household_certificate_copies_keys) : undefined,
			joint_evaluation_report_copies_urls: Array.isArray(fileKeys.joint_evaluation_report_copies_keys)
				? getFileUrls(fileKeys.joint_evaluation_report_copies_keys) : undefined,
			diagnosis_certificate_copies_urls: Array.isArray(fileKeys.diagnosis_certificate_copies_keys)
				? getFileUrls(fileKeys.diagnosis_certificate_copies_keys) : undefined,
			postal_passbook_cover_copies_urls: Array.isArray(fileKeys.postal_passbook_cover_copies_keys)
				? getFileUrls(fileKeys.postal_passbook_cover_copies_keys) : undefined,
			low_income_certificate_copies_urls: Array.isArray(fileKeys.low_income_certificate_copies_keys)
				? getFileUrls(fileKeys.low_income_certificate_copies_keys) : undefined,
			delayed_school_entry_copies_urls: Array.isArray(fileKeys.delayed_school_entry_copies_keys)
				? getFileUrls(fileKeys.delayed_school_entry_copies_keys) : undefined,
			disability_identification_copies_urls: Array.isArray(fileKeys.disability_identification_copies_keys)
				? getFileUrls(fileKeys.disability_identification_copies_keys) : undefined,


			cover_document_copy_url: getFileUrl(fileKeys.cover_document_copy_key),

			application_months: this.application_months
				? ApplicationDraftResource.collection(this.application_months) : undefined,
			sab_memo: this.sab_memo,
		};
	}
}
