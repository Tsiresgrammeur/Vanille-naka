/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('user', (table) => {
    table.increments('id');
    table.string('first_name');
    table.string('last_name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password');
    table.string('address').notNullable();
    table.string('postal_code').notNullable();
    table.string('town').notNullable();
    table.string('country').notNullable();
    table.string('role');
    table.string('numberPhone').notNullable();
  }) 
    .createTable('category', (table) => {
      table.increments('id');
      table.string('category_name').notNullable().unique();
    })
    .createTable('product', (table) => {
      table.increments('id');
      table.string('product_name');
      table.string('description', 400);
      table.float('price');
      table.integer('category_id');
      table.integer('quantity');
      table.foreign('category_id').references('category.id').onDelete('CASCADE').onUpdate('CASCADE');
    })
    .createTable('sale', (table) => {
      table.increments('id');
      table.integer('user_id');
      table.integer('product_id');
      table.date('sale_date');
      table.integer('quantity');
      table.foreign('product_id').references('product.id').onDelete('CASCADE').onUpdate('CASCADE');
      table.foreign('user_id').references('user.id').onDelete('CASCADE').onUpdate('CASCADE');
    })
    .createTable('stock_sheet', (table) => {
      table.increments('id');
      table.date('sheet_date');
      table.string('operation');
      table.integer('quantity');
      table.integer('product_id');
      table.foreign('product_id').references('product.id').onDelete('CASCADE').onUpdate('CASCADE');
    })
    .createTable('cart', (table) => {
      table.increments('id');
      table.json('order');
      table.integer('user_id');
      table.string('status');
      table.date('cart_date');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
return knex.schema 
           .dropTable('sale')
           .dropTable('stock_sheet')
           .dropTable('product')
           .dropTable('category')
           .dropTable('user')
           .dropTable('cart');
};
