const tableName = 'application_submitted';

/** @param { import("knex").Knex } knex */
export function up(knex) {
    return knex.schema.createTable(tableName, function (table) {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();

        table.string('status').notNullable().defaultTo('pending');

        table.json('applicant');
        table.json('child');
        table.json('postal_bank_account');
        table.json('attached_documents_object');
        table.json('application_months');

        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}

/** @param { import("knex").Knex } knex */
export function down(knex) {
    return knex.schema.dropTable(tableName);
}
