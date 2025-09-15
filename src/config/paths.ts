// Base path configuration for deployment
// This allows the app to work in both root and subdirectory deployments

// Import package.json to get homepage field
const packageJson = require('../../package.json');
const BASE_PATH = packageJson.homepage || '/';

export const getImagePath = (imagePath: string): string => {
  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // Combine base path with image path
  return `${BASE_PATH}${cleanPath}`;
};

export const getPublicPath = (path: string): string => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Combine base path with public path
  return `${BASE_PATH}${cleanPath}`;
};

export default BASE_PATH;
