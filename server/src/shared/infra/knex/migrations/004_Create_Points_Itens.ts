import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('ecoleta_points_items', table => {
    table.increments('id').primary();
    table
      .string('point_id')
      .notNullable()
      .references('id')
      .inTable('ecoleta_points');
    table
      .string('item_id')
      .notNullable()
      .references('id')
      .inTable('ecoleta_items');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('ecoleta_points_items');
}
