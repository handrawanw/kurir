const knex_pg=require("../../database/knex");

module.exports={

    usersAccount:async({id_users})=>{
        let query=knex_pg.select([
            "users.id","users.username",
            "users.email","users.email","users.created_at",
            "users.pictures",
            "users.updated_at",
            knex_pg.raw("json_agg(json_build_object('id',roles.id,'name',roles.name)) as roles")
        ]).from("users");

        query.leftJoin("users_roles as ur","ur.id_users","users.id");
        query.leftJoin("roles","ur.id_roles","roles.id");

        if(id_users){
            query.where({"users.id":id_users});
        }

        query.groupBy("users.id");

        return query.first();
    },

    getPassword:async({id_users})=>{
        let query=knex_pg.select([
            "users.id","users.email",
            "users.password"
        ]).from("users");

        if(id_users){
            query.where({"users.id":id_users});
        }

        query.groupBy("users.id");

        return query.first();
    }
    
};
