const query=require("../../model/kurir/kurir.model.js");
const reuse_query=require("../../model/kurir/reuse_query.js");

let kurir={};

kurir.approvedJob=async({id_barang,id_users})=>{
    try {
        return query.approvedJob({id_barang,id_users})
    } catch (error) {
        throw error;
    }
};

kurir.jobFinished=async({id_barang,id_users})=>{
    try {
        let exists_kurir=await reuse_query.existsBarangByUsers({id_barang,id_users});
        if(exists_kurir){
            return query.jobFinished({id_barang})
        }else{
            throw({
                code:395121,
                message:"Gagal update, barang ini bukan tanggung jawab anda"
            })
        }
    } catch (error) {
        throw error;
    }
};

kurir.listUsers=async({page,limit})=>{
    try {
        return query.listUsers({page,limit})
    } catch (error) {
        throw error;
    }
};

module.exports=kurir;