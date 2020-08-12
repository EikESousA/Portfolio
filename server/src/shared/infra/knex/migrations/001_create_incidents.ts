/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('thebehero_incident', table => {
    table.increments();

    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();

    table.string('ong_id').notNullable();
    table.foreign('ong_id').references('id').inTable('ongs');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('thebehero_incident');
}
