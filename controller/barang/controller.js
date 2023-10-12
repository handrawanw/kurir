const services = require("./controller.service_1.js");
const response = require("../../helper/response");
const reuse_query = require("../../model/barang/reuse_query.js")
const path=require("path");
const fs=require("fs");

module.exports = {

    listBarang: async (req, res) => {
        try {

            const { name, description, page, limit } = req.query;

            let payload = await services.listBarang({
                name, description, page, limit
            });

            return response.ok({
                payload
            }, res);

        } catch (error) {
            console.log(error);
            return response.error({}, res, error.message);
        }
    },

    createBarang: async (req, res) => {
        try {

            const { name, pictures, alamat, description, penerima, phone, id_kategori_barang } = req.body;

            let filename = req.file ? req.file.filename : "none.png";

            await services.createBarang({
                payload: {
                    name, pictures, alamat, description, penerima, phone, id_kategori_barang,
                    pictures: `http://localhost:8000/api/v1/files/pictures/${filename}`
                }
            });

            return response.ok({}, res);

        } catch (error) {
            console.log(error);
            return response.error({}, res, error.message);
        }
    },

    updateBarang: async (req, res) => {
        try {

            const { id_barang } = req.params;

            const { name, pictures, alamat, description, penerima, phone, id_kategori_barang } = req.body;

            let filename = req.file ? req.file.filename : null;

            let payload = {
                name, pictures, alamat, description, penerima, phone, id_kategori_barang,
            };

            if (filename) {
                let _data = await reuse_query.existsBarangById({ id_barang });
                if (_data) {
                    let pictures_old = _data.pictures.split("\/");
                    pictures_old = pictures_old[pictures_old.length - 1];
                    let path_folder = global.root_dir;
                    if (fs.existsSync(path.join(path_folder, "uploaded", pictures_old))) {
                        await fs.unlinkSync(path.join(path_folder, "uploaded", pictures_old));
                    }
                }
                
                payload = {
                    ...payload,
                    pictures: `http://localhost:8000/api/v1/files/pictures/${filename}`
                }
            }


            await services.updateBarang({
                payload, id_barang
            });

            return response.ok({}, res);

        } catch (error) {
            console.log(error);
            return response.error({}, res, error.message);
        }
    },

    deleteBarang: async (req, res) => {
        try {

            const { id_barang } = req.params;

            let _data = await reuse_query.existsBarangById({ id_barang });
            if (_data) {
                let pictures_old = _data.pictures.split("\/");
                pictures_old = pictures_old[pictures_old.length - 1];
                let path_folder = global.root_dir;
                if (fs.existsSync(path.join(path_folder, "uploaded", pictures_old))) {
                    await fs.unlinkSync(path.join(path_folder, "uploaded", pictures_old));
                }
            }

            await services.deleteBarang({id_barang});

            return response.ok({}, res);

        } catch (error) {
            console.log(error);
            return response.error({}, res, error.message);
        }
    }

};