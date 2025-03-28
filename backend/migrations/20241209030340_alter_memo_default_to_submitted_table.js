const tableName = 'application_submitted';

/** @param { import("knex").Knex } knex */
export function up(knex) {
	return knex.schema.alterTable(tableName, function(table) {
		table.json('sab_memo').defaultTo([]).alter();
	});
}

/** @param { import("knex").Knex } knex */
export function down(knex) {
	return knex.schema.alterTable(tableName, function(table) {
	});
}
