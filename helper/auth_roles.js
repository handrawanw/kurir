const query_helper=require("./query_helper");
const knex_pg=require("../database/knex");

module.exports={

    checkPermission:async({id_users,permission_name})=>{
        let query=knex_pg.select([
            "permission.id","permission.name"
        ]).from("roles");

        query.innerJoin("roles_permission as rp","rp.id_roles","roles.id");
        query.innerJoin("permission","permission.id","rp.id_permission");
        query.innerJoin("users_roles as ur","ur.id_roles","roles.id");

        if(id_users){
            query.where({"ur.id_users":id_users});
        }

        if(permission_name){
            query.where({"permission.name":permission_name});
        }

        return query.first();
    }

};