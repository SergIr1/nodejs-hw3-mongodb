import cloudinery from 'cloudinary';
import fs from 'node:fs/promises';
import { CLOUDINERY } from '../constans/index.js';
import { getEnvVar } from './getEnvVar.js';

cloudinery.v2.config({
  secure: true,
  cloud_name: getEnvVar(CLOUDINERY.CLOUD_NAME),
  api_key: getEnvVar(CLOUDINERY.API_KEY),
  api_secret: getEnvVar(CLOUDINERY.API_SECRET),
});

export const saveFileToCloudinary = async (file) => {
  const response = await cloudinery.v2.uploader.upload(file.path);
  await fs.unlink(file.path);
  return response.secure_url;
};
