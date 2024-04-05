import { prisma } from '$lib/server/prisma';
import { writeFileSync, existsSync, mkdirSync, readFileSync } from 'fs';
import { Resolution } from '$lib/client/uploads/pictures/resolution';
import { Quality } from '$lib/client/uploads/pictures/quality';
import { PUBLIC_UPLOADS_FOLDER_NAME } from '$env/static/public';
import sharp from 'sharp';
import type { PictureRelation } from '@prisma/client';

export async function savePicture(
	pictureID: string,
	resolution: Resolution | number |string| null,
	quality: Quality | number|string,
	required: boolean,
	resizeOptions: sharp.ResizeOptions = {
		fit: 'inside',
		withoutEnlargement: true
	}
): Promise<{ succes: boolean; relation : PictureRelation | null, errorMsg: string, errorPass: boolean }> {
	
	try{
		
	const picture = await prisma.picture.findUnique({
		where: {
			id: pictureID
		}
	});

	if (picture == null) {
		return { succes: false, errorPass: !required, relation : null, errorMsg: "L'image n'existe pas" };
	}

	const absoluteResolution: Resolution = Resolution.fromInput(resolution);
	const absoluteQuality: Quality = Quality.fromInput(quality);

	const arrayBuffer = readFileSync(`${picture.path.slice(1)}`);
	const filepath = `${PUBLIC_UPLOADS_FOLDER_NAME}/pictures/${absoluteResolution.toString()}/${absoluteQuality.toString()}/`;

	if (!existsSync(filepath)) {
		mkdirSync(filepath, { recursive: true });
	}

	let filename = `${picture.id}`;

	if (picture.extension !== 'svg') {
		filename += '.webp';

		await sharp(arrayBuffer)
			.resize(absoluteResolution.value(), absoluteResolution.value(), resizeOptions)
			.webp({ quality: absoluteQuality.value() })
			.toFile(`${filepath}${filename}`);
	} else {
		filename += '.svg';
		writeFileSync(`${filepath}${filename}`, Buffer.from(arrayBuffer));
	}

    let pictureRelation = await prisma.pictureRelation.findFirst({
        where: {
            quality: absoluteQuality.value(),
            resolution: absoluteResolution.value(),
            picture: {
                id: picture.id
            }
        }
    });

    if (pictureRelation == null) {
        pictureRelation = await prisma.pictureRelation.create({
            data: {
                quality: absoluteQuality.value(),
                resolution: absoluteResolution.value(),
				path:`/${filepath}${filename}`,
                picture: {
                    connect: {
                        id:  picture.id
                    }
                }
            }
        });
    }

    return { succes: true, errorPass:false, relation : pictureRelation, errorMsg: "" };

	}catch(exeption){
		return { succes: false, errorPass:!required, relation : null, errorMsg: "" };
	}
	
}
