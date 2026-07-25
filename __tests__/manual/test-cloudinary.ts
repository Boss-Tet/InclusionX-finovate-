import { uploadImage, deleteImage } from '../../providers/cloudinary';
import * as dotenv from 'dotenv';
import path from 'path';

// Manually load .env.local for this standalone script (this runs first in the test)
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function testCloudinary() {
  console.log('Testing Cloudinary connection & upload...');
  console.log(`Cloud Name: ${process.env.CLOUDINARY_CLOUD_NAME}`);
  
  if (!process.env.CLOUDINARY_API_KEY) {
    console.error('CLOUDINARY_API_KEY is not defined in .env.local');
    process.exit(1);
  }

  // A small 1x1 transparent base64 pixel image for rapid testing
  const tinyPixel = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

  console.log('Uploading test image...');
  const uploadResult = await uploadImage(tinyPixel, 'vsla_connect_tests');

  if (uploadResult.success) {
    console.log('✅ Image uploaded successfully!');
    console.log(`🔗 Live URL: ${uploadResult.url}`);
    console.log(`📂 Public ID: ${uploadResult.publicId}`);
    
    console.log('\nTesting Cloudinary deletion to clean up...');
    const deleteResult = await deleteImage(uploadResult.publicId as string);
    
    if (deleteResult.success) {
      console.log('✅ Image deleted successfully! (Cleanup complete)');
    } else {
      console.error('❌ Failed to delete image.', deleteResult.error);
    }
  } else {
    console.error('❌ Failed to upload image.', uploadResult.error);
  }
}

testCloudinary();
