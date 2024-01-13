import sharpen from '../sharp/index.js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const { BUILD_FOLDER_NAME, PUBLIC_UPLOADS_FOLDER_NAME } = process.env;

const middlewares = function (app) {
	app.use('/images/:path?/:filename', (req, res, next) => {
		const { width, height } = req.query;
		const { middlepath, filename } = req.params;

		const basePath = middlepath
			? path.join(`${BUILD_FOLDER_NAME}/client/images`, middlepath)
			: `${BUILD_FOLDER_NAME}/client/images`;

		const fullpath = path.join(basePath, filename);

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

	app.use(`/${PUBLIC_UPLOADS_FOLDER_NAME}/:middlepath?/:filename`, (req, res, next) => {
		const { width, height } = req.query;
		const { middlepath, filename } = req.params;

		const basePath = middlepath
			? path.join(PUBLIC_UPLOADS_FOLDER_NAME, middlepath)
			: PUBLIC_UPLOADS_FOLDER_NAME;
		const fullpath = path.join(basePath, filename);

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
