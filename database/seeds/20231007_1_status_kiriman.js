/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */


exports.seed = async function(knex) {
    // Deletes ALL existing entries
    
    // await knex('status_kiriman').del();
    await knex('status_kiriman').insert([
      {
        id:1,
        name:"Menunggu Kurir",
        description:"..."
      },
      {
        id:2,
        name:"Paket Diantar",
        description:"..."
      },
      {
        id:3,
        name:"Selesai",
        description:"..."
      },
    ]);
  
  };
  
