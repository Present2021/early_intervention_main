const tableName = 'application_drafts';

/** @param { import("knex").Knex } knex */
export function up(knex) {
	return knex.schema.createTable(tableName, function(table) {
        table.increments('id').primary();
		table.integer('user_id').unsigned().notNullable();
        table.string('month', 7).notNullable();
        table.boolean('is_submitted').defaultTo(false);

        table.tinyint('transportation_count').unsigned().defaultTo(0);
        table.json('self_pay_programs').defaultTo([]);

        table.string('transportation_document_copy_file_key');
        table.string('program_document_copy_file_key');

		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.timestamp('updated_at').defaultTo(knex.fn.now());
	});
}

/** @param { import("knex").Knex } knex */
export function down(knex) {
	return knex.schema.dropTable(tableName);
}
