import dotenv from 'dotenv';
import path from 'path';
import sharpen from '../sharp/index.js';
dotenv.config();

const { BUILD_FOLDER_NAME, PUBLIC_UPLOADS_FOLDER_NAME } = process.env;

const middlewares = function (app,dirname) {


	app.use("/.*\.png$/",(req, res, next) => {
	
		console.log(req.url)
		const imageRegex = /\.(jpg|jpeg|png|bmp|webp)$/i;

		if (imageRegex.test(req.url)) {

			const { width, height } = req.query;
			const fullpath = path.join(dirname,req.url).replace("\\","")

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


	// app.use((req, res, next) => {
	
	// 	const imageRegex = /\.(jpg|jpeg|png|bmp|webp)$/i;

	// 	if (imageRegex.test(req.url)) {

	// 		const { width, height } = req.query;
	// 		const fullpath = path.join(dirname,req.url).replace("\\","")

	// 		sharpen({
	// 			fullpath,
	// 			width,
	// 			height,
	// 			callback: (err, data, info, format) => {
	// 				if (err) {
	// 					return next(err);
	// 				}

	// 				res.type(format).send(data);
	// 			}
	// 		});

	// 	} else {
	// 		next();
	// 	}
	// });

	// ["/.*jpg$/","/.*jpeg$/","uploads/.*\.png$/","/.*webp$/"]

	// app.use('/images/:path?/:filename', (req, res, next) => {

	// 	const { width, height } = req.query;
	// 	const { middlepath, filename } = req.params;

	// 	const basePath = middlepath
	// 		? path.join(`${BUILD_FOLDER_NAME}/client/images`, middlepath)
	// 		: `${BUILD_FOLDER_NAME}/client/images`;

	// app.use(`/${PUBLIC_UPLOADS_FOLDER_NAME}/:middlepath?/:filename`, (req, res, next) => {
	// 	const { width, height } = req.query;
	// 	const { middlepath, filename } = req.params;

	// 	const basePath = middlepath
	// 		? path.join(PUBLIC_UPLOADS_FOLDER_NAME, middlepath)
	// 		: PUBLIC_UPLOADS_FOLDER_NAME;
	// 	const fullpath = path.join(basePath, filename);

	// 	sharpen({
	// 		fullpath,
	// 		width,
	// 		height,
	// 		callback: (err, data, info, format) => {
	// 			if (err) {
	// 				return next(err);
	// 			}

	// 			res.type(format).send(data);
	// 		}
	// 	});
	// });
};

export default middlewares;
