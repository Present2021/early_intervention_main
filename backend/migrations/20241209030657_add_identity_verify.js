/** @param { import("knex").Knex } knex */
export function up(knex) {
	return knex.schema
		.alterTable('application_submitted', function (table) {
			table.boolean('identity_verified').defaultTo(false);
		})
		.alterTable('users', function (table) {
			table.boolean('identity_verified').defaultTo(false);
		});

}

/** @param { import("knex").Knex } knex */
export function down(knex) {
	return knex.schema
		.alterTable('application_submitted', function (table) {
			table.dropColumn('identity_verified');
		})
		.alterTable('users', function (table) {
			table.dropColumn('identity_verified');
		});
}
