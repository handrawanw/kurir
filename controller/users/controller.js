const service=require("./controller.service_1");
const response=require("../../helper/response");
const reuse_query=require("../../model/users/reuse_query");

module.exports={

    login:async(req,res,next)=>{
        try {
            
            const {email="",password=""} = req.body;

            let payload=await service.login({email,password});
            
            if(payload){
                let {data,token}=payload;

                return response.ok({
                    account:{
                        id:data.id,
                        username:data.username
                    },
                    token
                },res);
                
            }

            return response.notFound({},res,`Invalid email atau password, silakan cek kembali`);

        } catch (error) {
            console.log(error);
            return response.error({},res,error.message);
        }

    },

    changePassword:async(req,res,next)=>{
        try {
            
            const id_users=req.decoded.id;

            const {old_password="",new_password=""} = req.body;

            await service.changePassword({
                payload:{
                    password:new_password
                },
                old_password,id_users
            });
            
            return response.ok({},res,"Password anda berhasil di ganti");

        } catch (error) {
            console.log(error);
            return response.error({},res,error.message);
        }

    },


    updateAccount: async (req, res, next) => {
        try {

            const id_users = req.decoded.id;

            let { username, email, birthday, gender, roles=[] } = req.body;

            let filename = req.file ? req.file.filename : null;

            payload={
                username, email, birthday, gender
            };

            if(filename){
                let user_data=await reuse_query.usersAccount({id_users});
                if(user_data){
                    if(user_data.pictures){
                        let pictures_old=user_data.pictures.split("\/");
                        pictures_old=pictures_old[pictures_old.length-1];
                        let path_folder = __dirname.split("\\");
                        path_folder = path.join(path_folder.slice(0, path_folder.length - 2).join("/"));
                        if(fs.existsSync(path.join(path_folder,"uploaded",pictures_old))){
                            await fs.unlinkSync(path.join(path_folder,"uploaded",pictures_old));
                        }
                    }
                }
                payload={
                    ...payload,
                    pictures: `https://evmon.konekthing.com/api/v1/upload/pictures/${filename}`
                }
            }

            await service.updateAccount({
                payload, id_users, roles
            });

            return response.ok({}, res);

        } catch (error) {
            console.log(error);
            return response.error({}, res, error.message);
        }
    },

};
