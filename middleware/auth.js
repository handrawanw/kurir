const { verifytoken } = require("../helper/jwt_token");
const { checkPermission } = require("../helper/auth_roles");

// response
const response = require("../helper/response");
// response

module.exports = {

    authjwt:(req,res,next)=>{
        // const token = req.headers.authorization?.split(' ')[1];
        const authorization = req.headers.authorization || "";
        let token = authorization.replace("Basic ", "");
        token = token.replace("Bearer ", "");
        verifytoken(token, async(err, payload) => {
            if (err) {
                return response.unauthorized({
                    isTokenExpired: true
                }, res, "Your token is expired");
            } else {
                req.decoded = payload;
                next();
            }
        });
    },

    authrole:(permission_name="")=>{
        return async(req, res, next) => {
            let id_users=req.decoded.id;
            let permission=await checkPermission({id_users,permission_name});
            if(permission){
                return next();
            }else{
                return response.unauthorized({
                    isTokenExpired:false
                },res,"Roles anda tidak diizinkan akses api ini");
            }
        }
    }

};
