/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").primary();

    table.string("name", 255).notNullable();
    table.string("email", 255).notNullable().unique();

    // Password fields
    table.string("password", 255).notNullable();        // bcrypt or plain
    table.text("password_base64");                     // btoa/atob base64 version

    // Contact & Address
    table.string("contact_no", 20);
    table.string("address1", 255);
    table.string("address2", 255);
    table.string("city", 100);
    table.string("state", 100);
    table.string("country", 100);

    // Image field (base64 OR file URL)
    table.text("image");

    // Role (no predefined values — you will insert your own)
    table.string("role", 100).notNullable();

    // Last login
    table.timestamp("last_login");

    // Timestamps
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
