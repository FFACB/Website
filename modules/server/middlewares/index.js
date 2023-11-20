import express from 'express';
import sharpen from '../middlewares/index.js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const { BUILD_FOLDER_NAME, UPLOADS_FOLDER_NAME } = process.env;
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
    
export default  middleaware = (app) => {





	app.use('/images/:path?/:filename/:width?/:height?', (req, res, next) => {
		const { path: imagePath, filename, width, height } = req.params;

		const basePath = imagePath
			? path.join(`${BUILD_FOLDER_NAME}/client/images`, imagePath)
			: `${BUILD_FOLDER_NAME}/client/images`;
		const fullpath = path.join(__dirname, basePath, filename);

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
	});

	app.use('/uploads/:path?/:filename/:width?/:height?', (req, res, next) => {
		const { path: imagePath, filename, width, height } = req.params;

		// Construire le chemin complet de l'image
		const basePath = imagePath ? path.join(UPLOADS_FOLDER_NAME, imagePath) : UPLOADS_FOLDER_NAME;
		const fullpath = path.join(__dirname, basePath, filename);

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
	});


    app.use(`/${UPLOADS_FOLDER_NAME}`, express.static(UPLOADS_FOLDER_NAME));

};
