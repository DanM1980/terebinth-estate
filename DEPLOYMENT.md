# Deployment Guide

This project supports deployment in both root directory and subdirectory configurations.

## Configuration

The project uses the `homepage` field in `package.json` to determine the base path for all assets.

### Current Configuration (Subdirectory Deployment)
- `homepage: "/ter/"` in `package.json`
- All assets are served from the `/ter/` subdirectory
- Example: `https://example.com/ter/images/hero/image.jpg`

### For Root Deployment
To deploy to the root directory, change the `homepage` field in `package.json`:
```json
{
  "homepage": "/"
}
```

## Build Commands

### For Subdirectory Deployment (Current)
```bash
npm run build
```

### For Root Deployment
1. Change `homepage` in `package.json` to `"/"`
2. Run: `npm run build`

## How It Works

1. **Path Configuration**: The `src/config/paths.ts` file contains utility functions that handle path resolution based on the `homepage` field in `package.json`.

2. **Image Paths**: All image references in components use the `getImagePath()` function to ensure correct path resolution.

3. **Public Assets**: Public assets like JSON files use the `getPublicPath()` function.

4. **Build-time Resolution**: The `homepage` field in `package.json` tells React's build process where to expect the app to be hosted, ensuring all asset paths are correctly prefixed.

## Components Updated

The following components have been updated to use relative paths:

- `HeroSection.tsx` - Hero images and videos
- `AboutEstate.tsx` - Estate gallery images and thumbnails
- `SpiritualConnection.tsx` - Spiritual images
- `Testimonials.tsx` - Testimonial images
- `LocationMap.tsx` - Logo and JSON data paths

## JSON Data

The `public/data/nearby-sites.json` file has been updated to use relative paths for images, which are then processed by the `getImagePath()` function at runtime.

## Deployment Steps

1. **Choose your deployment type**:
   - Root deployment: Use default build
   - Subdirectory deployment: Set `REACT_APP_BASE_PATH` to your subdirectory path

2. **Build the project**:
   ```bash
   npm run build
   ```

3. **Deploy the `build` folder**:
   - For root deployment: Copy contents of `build` folder to your web root
   - For subdirectory deployment: Copy contents of `build` folder to your subdirectory

4. **Verify deployment**:
   - Check that all images load correctly
   - Verify that the map loads properly
   - Test all interactive features

## Troubleshooting

### Images Not Loading
- Check that the `REACT_APP_BASE_PATH` environment variable is set correctly
- Verify that the build was created with the correct base path
- Ensure the deployment directory structure matches the expected paths

### Map Not Loading
- Verify that the Google Maps API key is configured
- Check that the `nearby-sites.json` file is accessible at the correct path
- Ensure all map assets are properly deployed

### 404 Errors
- Check the browser's Network tab to see which assets are failing to load
- Verify that the asset paths in the built JavaScript match your deployment structure
- Ensure all files from the `build` folder are properly deployed
