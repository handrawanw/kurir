/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists("kurir_barang",function(table){
      table.integer("id_barang").references("id").inTable("barang").notNullable();
      table.integer("id_users").references("id").inTable("users").notNullable();
      table.integer("created_by").references("id").inTable("users").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
      table.smallint("is_deleted").defaultTo(0);
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists("kurir_barang");
  };
  