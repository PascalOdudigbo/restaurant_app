exports.up = function (knex) {
    return knex.schema
        .createTable('users', function (table) {
            // Defining the users table
            table.increments('id').primary();
            table.string('name');
            table.string('mobile_number');
            table.string('postcode');
            table.string('email');
            table.string('password');
            table.string('role');
            table.timestamps(true, true);
        })
        .createTable('bookings', function (table) {
            // Defining booking table schema
            table.increments('id').primary();
            table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
            table.date('preferred_date');
            table.integer('preferred_guests');
            table.string('occasion');
            table.string('message');
            table.string('status');
            table.timestamps(true, true);
        })
        .createTable('menu_categories', function (table) {
            // Defining menu_categories table schema
            table.increments('id').primary();
            table.string('name');
            table.string('description');
            table.timestamps(true, true);
        })
        .createTable('menu_items', function (table) {
            // Defining menu_items table schema
            table.increments('id').primary();
            table.integer('menu_category_id').unsigned().references('id').inTable('menu_categories').onDelete('CASCADE');
            table.string('name');
            table.string('description');
            // Price should have 10 digits in total, 2 after the decimal point
            table.decimal('price', 10, 2);
            table.string('image');
            table.string('image_public_id');
            // Making item available by default
            table.boolean('is_available').defaultTo(true);
            table.timestamps(true, true);
        })
        .createTable('tables', function (table) {
            // Defining tables table schema
            table.increments('id').primary();
            table.integer('table_number');
            // Making table unoccupied by default
            table.boolean('is_occupied').defaultTo(false);
            table.timestamps(true, true);
        })
        .createTable('orders', function (table) {
            // Defining orders table schema
            table.increments('id').primary();
            table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
            table.integer('table_id').unsigned().references('id').inTable('tables').onDelete('CASCADE');
            table.string('status');
            table.timestamps(true, true);
        })
        .createTable('order_items', function (table) {
            // Defining order_items table schema
            table.increments('id').primary();
            table.integer('order_id').unsigned().references('id').inTable('orders').onDelete('CASCADE');
            table.integer('menu_item_id').unsigned().references('id').inTable('menu_items').onDelete('CASCADE');
            table.integer('quantity');
            table.timestamps(true, true);

        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('order_items')
        .dropTableIfExists('orders')
        .dropTableIfExists('tables')
        .dropTableIfExists('menu_items')
        .dropTableIfExists('menu_categories')
        .dropTableIfExists('bookings')
        .dropTableIfExists('users');
};