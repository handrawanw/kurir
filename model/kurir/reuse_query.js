const knex_pg=require("../../database/knex");

module.exports={

    existsBarangByUsers:async({id_users,id_barang})=>{
        let query=knex_pg.select(["id_users","id_barang"]).from("kurir_barang");

        query.where({id_users});
        query.where({id_barang});

        return query.first();
    }
    
};
