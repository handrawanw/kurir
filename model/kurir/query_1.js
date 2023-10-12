const knex_pg=require("../../database/knex");

module.exports={

    approvedJob:async({id_users,id_barang})=>{
        await knex_pg.transaction(async(trx)=>{
            if(Array.isArray(id_barang)){
                for(let id of id_barang){
                    await trx("kurir_barang").insert({id_users,id_barang:id});
                    await trx("status_kiriman").update({id_status_kiriman:2}).where({id_barang:id});
                }
            }else{
                throw new Error("id_barang harus tipe array");
            }
        })
    },

    jobFinished:async({id_barang})=>{
        await knex_pg.transaction(async(trx)=>{
            await trx("status_barang").update({id_status_kiriman:3}).where({id_barang});
        })
    }
    
};
