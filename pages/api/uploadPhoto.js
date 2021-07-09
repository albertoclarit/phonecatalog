
import nextConnect from 'next-connect';
import multer from 'multer';
import {prepareConnection} from "./utils/getDbConnection";
import {getConnection} from "typeorm";
import {PhoneEntity} from "../../entities/Phone.entity";
const {Storage} = require('@google-cloud/storage');

const upload = multer({
    storage: multer.diskStorage({
        destination: process.env.UPLOAD_DIR,
        filename: (req, file, cb) => cb(null, file.originalname),
    }),
});

const apiRoute = nextConnect({
    onError(error, req, res) {
        res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.use(upload.single('file'));

apiRoute.post(  async (req, res) => {


    let id = req.body.id
    let filename  = req.file.filename


    const storage = new Storage();
    const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);
    const fullPath = `${process.env.UPLOAD_DIR}/${filename}` ;

    let result = await   bucket.upload(fullPath,{
        destination: `${filename}`,
    });

    const url = result[0].metadata.mediaLink;

    await prepareConnection()
    let  connection  = await getConnection()
    let phoneRepository = connection.getRepository(PhoneEntity)
    let entity = await phoneRepository.findOne(id)
    entity.imageFileName = url
    phoneRepository.save(entity)



    res.status(200).json({ data: 'success' });


});

export default apiRoute;

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};
