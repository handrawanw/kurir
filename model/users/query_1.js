const knex_pg=require("../../database/knex");


module.exports={

    login:async({email})=>{
        let query=knex_pg.select(["*"]).from("users");

        query.where({email});

        return query.first();
    },
    
    changePassword:async({payload,id_users})=>{
        await knex_pg.transaction(async(trx)=>{
            await trx("users").update(payload).where({'id':id_users});
        })
    },
    
    updateAccount:async({payload,id_users,roles})=>{
        await knex_pg.transaction(async(trx)=>{
            await trx("users").update(payload).where({'id':id_users});
            let new_roles=[];
            if(Array.isArray(roles)){
                for(let id of roles){
                    new_roles.push({
                        id_roles:id,
                        id_users:id_users
                    })
                }
            }
            if(new_roles.length>0){
                await trx("users_roles").where({id_users}).del();
                await trx("users_roles").insert(new_roles);
            }
        })
    },    

};