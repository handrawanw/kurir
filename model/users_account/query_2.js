const knex_pg=require("../../database/knex");
const query_helper=require("../../helper/query_helper");

module.exports={

    listUsers:async({username,email,page,limit})=>{
        let offset=query_helper.parsePageToOffset({page,limit});

        let select=[
            "users.id","users.username","users.email","users.verified","users.gender","users.birthday","users.created_at","users.updated_at",
            knex_pg.raw("coalesce(json_agg(json_build_object('id',roles.id,'name',roles.name)) filter(where roles.id is not null),'[]') as roles")
        ];
        
        let query=knex_pg.select(select).from("users");

        query.leftJoin("users_roles as ur","ur.id_users","users.id");
        query.leftJoin("roles","roles.id","ur.id_roles");
        
        if(username){
            query.whereILike('users.username',`%${username}%`);
        }

        if(email){
            query.whereILike('users.email',`%${email}%`);
        }
        
        query.groupBy("users.id");

        let count = 0;
        
        if (limit) {
            let queryCountData = knex_pg.count("* as count").from(query.as("counts"));
            // console.log(queryCountData.toQuery());
            count = (await queryCountData)[0].count;
            // console.log(query.toQuery());
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
