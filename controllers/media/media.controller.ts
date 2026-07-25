import { uploadImage } from '../../providers/cloudinary';

/**
 * Media Controller
 * Orchestrates file and image uploads.
 */
export class MediaController {
  
  /**
   * Uploads an image file to Cloudinary.
   */
  static async uploadImage(filePath: string) {
    // Future: Validate file type, compress image, check user quota
    return await uploadImage(filePath);
  }
}
