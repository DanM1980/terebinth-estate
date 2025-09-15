// Base path configuration for deployment
// This allows the app to work in both root and subdirectory deployments

const BASE_PATH = process.env.REACT_APP_BASE_PATH || '/';

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
