const query=require("../../model/users/users.model");
const hashing=require("../../helper/hashing");
const jwttoken=require("../../helper/jwt_token");
const reuse_query=require("../../model/users/reuse_query");

let users={};

users.login=async({email,password})=>{
    try {

        let data=await query.login({
            email
        });

        if(data){
            let valid_password = hashing.checkPass(password, data.password);

            if(valid_password){
                let token = await jwttoken.generateToken({
                    id: data.id,
                    username: data.username
                });
                return {valid_password,data,token};
            }
            
        }

        return null;

    } catch (error) {
        return response.error({},res,error.message);
    }

}

users.updateAccount=async({payload,id_users,roles})=>{
    try {

        if(!Array.isArray(roles)){
            roles=[roles];
        }
        
        return query.updateAccount({payload,id_users,roles});
        
    } catch (error) {
        throw error;
    }
};

users.changePassword=async({payload,old_password,id_users})=>{
    try {

        let data=await reuse_query.getPassword({id_users});

        if(data){
            let valid_password = hashing.checkPass(old_password, data.password);
            if(valid_password){
                return query.changePassword({payload:{
                    password:hashing.hashPass(payload.password)
                },id_users});
            }else{
                throw({
                    code:332412,
                    message:"Password lama anda salah"
                })
            }
        }else{
            throw({
                code:332910,
                message:"Account tidak di kenal"
            })
        }
        
    } catch (error) {
        throw error;
    }
};


module.exports=users;