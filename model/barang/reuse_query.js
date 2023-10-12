const knex_pg=require("../../database/knex");

module.exports={

    existsBarangById:async({id_barang})=>{
        let query=knex_pg.select(["id","name","pictures","description","created_at","updated_at"]).from("barang");

        if(id_barang){
            query.where({"id":id_barang});
        }

        return query.first();
    },
    
};
