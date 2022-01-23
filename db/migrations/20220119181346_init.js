/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('user', (table) => {
    table.increments('id');
    table.string('first_name').notNullable();
    table.string('last_name');
    table.string('email').notNullable().unique();
    table.string('password');
    table.string('address');
    table.string('country');
    table.string('role');
    table.string('numberPhone');
  }) 
    .createTable('category', (table) => {
      table.increments('id');
      table.string('category_name');
    })
    .createTable('product', (table) => {
      table.increments('id');
      table.string('product_name');
      table.string('description', 400);
      table.integer('price');
      table.integer('category_id');
      table.foreign('category_id').references('category.id').onDelete('CASCADE').onUpdate('CASCADE');
    })
    .createTable('sale', (table) => {
      table.increments('id');
      table.date('sale_date');
      table.integer('quantity');
      table.string('status');
    })
    .createTable('stock_sheet', (table) => {
      table.increments('id');
      table.string('sheet_date');
      table.string('operation');
      table.integer('quantity');
      table.integer('product_id')
      table.foreign('product_id').references('product.id').onDelete('CASCADE').onUpdate('CASCADE');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema 
           .dropTable('user')
           .dropTable('product')
           .dropTable('category')
           .dropTable('sale')
           .dropTable('stock_sheet');
};