const knex_pg=require("../../database/knex");
let query_helper=require("../../helper/query_helper");

module.exports={

    listBarang:async({name, description, page, limit})=>{
        let offset=query_helper.parsePageToOffset({page,limit})

        let select=[
            "barang.id","barang.name","barang.pictures","barang.alamat","barang.description","barang.penerima","barang.phone","barang.created_at","barang.updated_at",
            "kb.name as kategori"
        ];

        let query=knex_pg.select(select).from("barang");

        query.innerJoin("kategori_barang as kb","kb.id","barang.id_kategori_barang");
        
        if(name){
            query.whereILike('barang.name',`%${name}%`);
        }

        if(description){
            query.whereILike('barang.description',`%${description}%`);
        }

        let count = 0;

        if (limit) {
            let queryCountData = knex_pg.count("* as count").from(query.as("counts"));
            // console.log(queryCountData.toQuery());
            count = (await queryCountData)[0].count;
            query.limit(limit);
        }

        if (offset) {
            query.offset(offset);
        }

        let datas = await query;

        let result = {
            per_page: limit ? parseInt(limit) : "all",
            last_page: limit ? Math.ceil(count / limit) : 1,
            total_data: parseInt(count),
            current_page: parseInt(page),
            data: datas
        };

        return result;
    }

};
