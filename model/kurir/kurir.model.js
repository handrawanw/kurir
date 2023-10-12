const sub_query=require("./query_1");
const sub_query_1=require("./query_2");

module.exports={

    approvedJob:sub_query.approvedJob,
    listUsers:sub_query_1.listUsers,
    jobFinished:sub_query.jobFinished

};