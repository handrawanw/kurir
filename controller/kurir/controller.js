const services = require("./controller.service_1.js");
const response = require("../../helper/response");

module.exports = {

    approvedJob: async (req, res) => {
        try {
            const { id_users } = req.params;

            const { id_barang } = req.body;

            let payload = await services.approvedJob({ id_users, id_barang });

            return response.ok({
                payload
            }, res);

        } catch (error) {
            console.log(error);
            return response.error({}, res, error.message);
        }
    },

    jobFinished: async (req, res) => {
        try {
            const id_users = req.decoded.id;

            const { id_barang } = req.body;

            let payload = await services.jobFinished({ id_users, id_barang });

            return response.ok({
                payload
            }, res);

        } catch (error) {
            console.log(error);
            return response.error({}, res, error.message);
        }
    },

    listUsers: async (req, res) => {
        try {
            const { page, limit } = req.query;

            let payload = await services.listUsers({ page, limit });

            return response.ok({
                payload
            }, res);

        } catch (error) {
            console.log(error);
            return response.error({}, res, error.message);
        }
    }

};