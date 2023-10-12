const services=require("./controller.service_1.js");
const response=require("../../helper/response");

module.exports={

    readImage:async(req,res)=>{
        try {

            const {filename}=req.params;

            let payload=await services.readImage(filename);

            if(payload){
                res.setHeader("Content-Type",payload["Content-Type"]);
                res.send(payload.buffer);
            }else{
                response.notFound({},res,"Not found file");
            }
            
        } catch (error) {
            return response.error({},res,error.message);
        }
    },

   init:async(req,res,next)=>{
        try {
            let payload=await services.init();

            return response.ok({
                payload
            },res);
        }catch(error){
            console.log(error);
            return response.error({},res,error.message);
        }
   }

};