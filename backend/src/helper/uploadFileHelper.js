import multer from 'multer';
import path from 'path';
import fs from 'fs';

function getRandomNumber(max) {
	const array = new Uint32Array(1);
	crypto.getRandomValues(array);
	return array[0] % max;
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync('upload')) {
            fs.mkdirSync('upload');
        }
        cb(null, 'upload/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + getRandomNumber(1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

export default upload;
