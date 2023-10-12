const crypto = require("crypto");
const path = require("path");
const multer = require("multer");

// upload barang
let file_bytes_barang=500;
let file_size_barang=file_bytes_barang*1024; // 500kb

const config_barang = {
    fileSize: file_size_barang, // 500000(5e+5) = 500 Kb, 1000000(1e+6) = 1mb
    fileFilter: function (req, file, callback) {
        let fileSize = parseInt(req.headers['content-length']);
        let mimetype=["image/png","image/jpg","image/jpeg"];
        if (
            !mimetype.includes(file.mimetype)
        ) {
           return callback(new Error("File : Only images are allowed"),false);
        }else if (fileSize > file_size_barang) {
            return callback(new Error(`File : Maximum photo size ${Math.round(file_size_barang/1024)} kb`),false);
        }else{
            return callback(null, true);
        }
    },
}

const storage_barang = multer.diskStorage({
    destination: function (req, file, cb) {
        let path_folder = global.root_dir;
        cb(null, path.join(path_folder, 'uploaded'))
    },
    filename: function (req, file, cb) {
        let hash = crypto.createHash('md5');
        let format_file=file.originalname.split(".");
        format_file=format_file[format_file.length-1];
        // Generate a random hex string with 8 characters
        const randomHex = [...Array(32)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
        let barang_name=`${hash.update(`barang_${randomHex}_${1}`).digest("hex")}.${format_file}`;
        cb(null,barang_name);
    }
});

const upload_barang = multer({ storage: storage_barang, fileFilter: config_barang.fileFilter, limits: { fileSize: config_barang.fileSize } });
// upload barang

module.exports = upload_barang;
