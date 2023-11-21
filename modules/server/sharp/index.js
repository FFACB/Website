import dotenv from 'dotenv';
import sharp from 'sharp';

dotenv.config();

const { SHARP_DEFAULT_FORMAT = "webp", SHARP_DEFAULT_QUALITY = 80, SHARP_DEFAULT_WIDTH = 800, SHARP_DEFAULT_HEIGHT = 600 } = process.env;

const sharpenConfig = {
    format: SHARP_DEFAULT_FORMAT,
    quality: SHARP_DEFAULT_QUALITY,
    width: SHARP_DEFAULT_WIDTH,
    height: SHARP_DEFAULT_HEIGHT,
}

const sharpen = function ({
    fullpath = null,
    width = SHARP_DEFAULT_WIDTH,
    height = SHARP_DEFAULT_HEIGHT,
    callback = null,
}) {

    const localConfig = {
        ...sharpenConfig,
        width,
        height,
        fullpath
    }


    sharp(fullpath)
        .resize({
            width: parseInt(localConfig.width),
            height: parseInt(localConfig.height),
            fit: 'inside', // 'inside' ensures that the image is not upscaled
            withoutEnlargement: true, // Prevent enlargement of smaller images
            quality: parseInt(localConfig.quality),
        })
        .toBuffer((err, data, info) => {
            if (typeof callback === 'function') {
                return callback(err, data, info, SHARP_DEFAULT_FORMAT);
            }
        });


}

export default sharpen;