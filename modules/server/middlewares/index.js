
import sharpen from '../sharp/index.js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const { BUILD_FOLDER_NAME, UPLOADS_FOLDER_NAME } = process.env;

const middlewares = function(app,__dirname)  {

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

	app.use('/uploads/:middlepath?/:filename/:width?/:height?', (req, res, next) => {

		const { middlepath, filename, width, height } = req.params;

		// Construire le chemin complet de l'image
		const basePath = middlepath ? path.join(UPLOADS_FOLDER_NAME, middlepath) : UPLOADS_FOLDER_NAME;
		console.log(basePath)
		const fullpath = path.join(__dirname, basePath, filename).replace(/\\/g, '/').replace("/D", 'D');
	
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


};

export default middlewares;