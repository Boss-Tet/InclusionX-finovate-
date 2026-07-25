import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads an image or file to Cloudinary.
 * @param file A local file path, remote URL, or Base64 data URI string.
 * @param folder The folder inside Cloudinary where the file should be stored.
 */
export async function uploadImage(file: string, folder = 'vsla_connect_uploads') {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder,
      resource_type: 'auto', // Auto-detects image vs video vs raw file
    });
    
    return { success: true, url: result.secure_url, publicId: result.public_id };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return { success: false, error };
  }
}

/**
 * Deletes an image from Cloudinary using its public ID.
 * @param publicId The Cloudinary public ID returned during upload.
 */
export async function deleteImage(publicId: string) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return { success: true, result };
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    return { success: false, error };
  }
}
