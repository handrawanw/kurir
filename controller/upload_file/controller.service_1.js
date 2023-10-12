const fs=require("fs");
const path=require("path");
const sizeOf=require('image-size');

let upload_file={};

upload_file.readImage=(filename)=>{
    let path_folder = __dirname.split("\\");
    path_folder = path.join(path_folder.slice(0, path_folder.length - 2).join("/"));
    if(fs.existsSync(path.join(path_folder,"uploaded",filename))){
        let data=fs.readFileSync(path.join(path_folder,"uploaded",filename));
        let mime_types={
            "jpg":"image/jpg",
            "png":"image/png",
            "jpeg":"image/jpeg"
        }
        let image_type=sizeOf(path.join(path_folder,"uploaded",filename));
        return {
            'Content-Type':mime_types[image_type['type']],
            buffer:data
        };
    }else{
        let data=fs.readFileSync(path.join(path_folder,"uploaded",'none.png'));
        let mime_types={
            "jpg":"image/jpg",
            "png":"image/png",
            "jpeg":"image/jpeg"
        }
        let image_type=sizeOf(path.join(path_folder,"uploaded",'none.png'));
        return {
            'Content-Type':mime_types[image_type['type']],
            buffer:data
        };
    }
};

module.exports=upload_file;