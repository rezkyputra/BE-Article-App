import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { config } from 'dotenv';
import * as streamifier from 'streamifier'

config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

@Injectable()
export class CloudinaryService {
    async uploadImageStream(file: Express.Multer.File): Promise<string> {
        return new Promise((resolve, reject) => {
            const uploadSteam = cloudinary.uploader.upload_stream({
                folder: 'articles',
                allowed_formats: ['jpg', 'png']
            }, (error, result: UploadApiResponse) => {
                if (error) return reject(error)
                resolve(result.secure_url)
            })
            const steam = streamifier.createReadStream(file.buffer)
            steam.pipe(uploadSteam)
        })

    }
}
