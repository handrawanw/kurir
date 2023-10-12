/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */


exports.seed = async function(knex) {
    // Deletes ALL existing entries
    
    await knex('kategori_barang').del();
    await knex('kategori_barang').insert([
      {
        id:1,
        name:"Android Smartphone",
        description:"..."
      },
      {
        id:2,
        name:"IOS Smartphone",
        description:"..."
      },
      {
        id:3,
        name:"Komputer",
        description:"..."
      },
      {
        id:4,
        name:"Kosmetik",
        description:"..."
      },
      {
        id:5,
        name:"Alat Rumah Tangga",
        description:"..."
      },
      {
        id:999,
        name:"Alat Rumah Tangga",
        description:"..."
      }
    ]);
  
  };
  
