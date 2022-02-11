/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('product', (table) => {
    table.string('unit');
    })
   .alterTable('product', (table) => {
    table.dropColumn('quantity');
    });
    
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('product', (table) => {
    table.dropColumn('unit');
    })
   .alterTable('product', (table) => {
    table.integer('quantity');
    });
};
