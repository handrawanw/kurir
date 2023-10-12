/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists("barang",function(table){
      table.bigIncrements();
      table.string("name",64).defaultTo(null);
      table.integer("id_kategori_barang").references("id").inTable("kategori_barang").notNullable();
      table.text("pictures").defaultTo(null);
      table.text("description").defaultTo(null);
      table.text("penerima").defaultTo(null);
      table.string("phone",16).defaultTo('0');
      table.text("alamat").defaultTo(null);
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
    return knex.schema.dropTableIfExists("barang");
  };
