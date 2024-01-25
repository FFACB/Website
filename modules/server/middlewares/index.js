import dotenv from 'dotenv';
import path from 'path';
import sharpen from '../sharp/index.js';
import { inspect } from 'util';
dotenv.config();

const { BUILD_FOLDER_NAME, PUBLIC_UPLOADS_FOLDER_NAME } = process.env;

const middlewares = function (app,dirname) {


	app.use(['/uploads','/images'],(req, res, next) => {
	
		const imageRegex = /\.(jpg|jpeg|png|bmp|webp|avif)$/i;

		if (imageRegex.test(req.url)) {

			const { width, height } = req.query;
			const fullpath = path.join(dirname,req.baseUrl.includes("images") ? "static" :"" ,req.baseUrl,req.url).replace("\\","")
			console.log(fullpath)
			sharpen({
				fullpath,
				width,
				height,
				callback: (err, data, info, format) => {
					if (err) {
						return next(err);
					}

					res.type(format).send(data);
				}
			});

		} else {
			next();
		}
	});

};

export default middlewares;
