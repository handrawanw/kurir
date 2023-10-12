const sub_query=require("./query_1");// CREATE,UPDATE,DELETE
const sub_query_1=require("./query_2"); // GET

module.exports={

    createBarang:sub_query.createBarang,
    updateBarang:sub_query.updateBarang,
    deleteBarang:sub_query.deleteBarang,
    listBarang:sub_query_1.listBarang

};