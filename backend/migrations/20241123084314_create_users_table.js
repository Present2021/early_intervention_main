const tableName = 'users';

/** @param { import("knex").Knex } knex */
export function up(knex) {
	return knex.schema.createTable(tableName, function(table) {
        table.increments('id').primary();
        table.string('account').notNullable().unique();
        table.string('password').notNullable();

        table.json('applicant').defaultTo({});
        table.json('child').defaultTo({});
        table.json('postal_bank_account').defaultTo({});
        table.json('attached_documents_object').defaultTo({});

		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.timestamp('updated_at').defaultTo(knex.fn.now());
	});
}

/** @param { import("knex").Knex } knex */
export function down(knex) {
	return knex.schema.dropTable(tableName);
}
