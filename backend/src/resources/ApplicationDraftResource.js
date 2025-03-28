import Resource from "resources.js";
import { getFileUrl } from "../helpers/staticFileHelper.js";

export default
class ApplicationDraftResource extends Resource {
	toArray() {
		return {
			month: this.month,
			transportation_count: Number(this.resource.transportation_count),
			self_pay_programs_total: Array.isArray(this.self_pay_programs)
				? this.self_pay_programs.reduce((total, program) => total + program.amount, 0) : undefined,
			self_pay_programs: Array.isArray(this.self_pay_programs)
				? this.self_pay_programs.map(program => ({
					date: program.date,
					amount: program.amount,
					file_url: program.file_url,
				}))
				: undefined,

			transportation_document_copy_url:
				this.transportation_document_copy_url ??
				(this.transportation_document_copy_file_key
					? getFileUrl(this.transportation_document_copy_file_key)
					: undefined),
			program_document_copy_url:
				this.program_document_copy_url ??
				(this.program_document_copy_file_key
					? getFileUrl(this.program_document_copy_file_key)
					: undefined),

			program_receipts_urls: Array.isArray(this.self_pay_programs)
				? this.self_pay_programs.map(program => program.file_url)
				: undefined,
		};
	}
}
