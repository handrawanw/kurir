const knex_pg=require("../../database/knex");

module.exports={

    createBarang:async({payload})=>{
        await knex_pg.transaction(async(trx)=>{
           let barang_id=await trx("barang").insert(payload).returning("id");
           barang_id=barang_id?barang_id[0].id:null;
           await trx("status_barang").insert({id_barang:barang_id,id_status_kiriman:1});
        });
    },

    updateBarang:async({payload,id_barang})=>{
        await knex_pg.transaction(async(trx)=>{
            await trx("barang").update(payload).where({'id':id_barang});
            await trx("barang").update({updated_at:knex_pg.fn.now()}).where({'id':id_barang});
        })
    },

    deleteBarang:async({id_barang})=>{
        await knex_pg.transaction(async(trx)=>{
            await trx("kurir_barang").where({'id_barang':id_barang}).del();
            await trx("status_barang").where({'id_barang':id_barang}).del();
            await trx("barang").where({'id':id_barang}).del();
        })
    }

};
