const query=require("../../model/barang/barang.model.js");

let barang={};

barang.listBarang=async({name,description,page,limit})=>{
    try {
        
        return query.listBarang({name,description,page,limit});
        
    } catch (error) {
        throw error;
    }
};

barang.createBarang=async({payload})=>{
    try {
        
        return query.createBarang({payload});
        
    } catch (error) {
        throw error;
    }
};

barang.updateBarang=async({payload,id_barang})=>{
    try {
        
        return query.updateBarang({payload,id_barang});
        
    } catch (error) {
        throw error;
    }
};

barang.deleteBarang=async({id_barang})=>{
    try {
        
        return query.deleteBarang({id_barang});
        
    } catch (error) {
        throw error;
    }
};

module.exports=barang;