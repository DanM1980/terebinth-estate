# Hero Section Features

## 🖼️ Dynamic Background System

### Image Rotation with Cookies
- **Automatic Rotation**: Each page refresh shows the next image in sequence
- **Cookie Persistence**: Remembers the last shown image using browser cookies
- **Fallback**: If no cookie exists, shows a random image
- **3 Images Available**: 
  - `DJI_0011_10.jpg`
  - `DJI_0011_13.jpg` 
  - `GX010233_stabilized.mp4_snapshot_00.44.705~2.jpg`

### How It Works
1. On first visit: Shows random image and saves index to cookie
2. On subsequent visits: Shows next image in sequence
3. After last image: Cycles back to first image
4. Cookie expires after 30 days

## 🎭 Parallax Effect

### CSS Parallax Scrolling
- **Smooth Movement**: Background moves slower than page scroll (0.5x speed)
- **Performance Optimized**: Uses `will-change` and `backface-visibility` for smooth animation
- **3D Transforms**: Enhanced with `transform-style: preserve-3d`

### Visual Effects
- **Scale Effect**: Images are slightly zoomed (1.1x) for better coverage
- **Hover Effect**: Subtle scale reduction on hover
- **Fade In Animation**: Smooth image loading with fade-in effect
- **Overlay Gradients**: Multiple gradient layers for text readability

## 🎨 Styling Features

### Navigation Arrows
- **Glassmorphism Design**: Semi-transparent with backdrop blur
- **Hover Effects**: Scale and glow animations
- **Responsive Sizing**: Smaller on mobile devices
- **Accessibility**: ARIA labels and keyboard support

### Image Counter
- **Position Indicator**: Shows current image number
- **Glassmorphism Style**: Matches arrow design
- **Bottom Right**: Non-intrusive positioning

### Responsive Design
- **Mobile Optimized**: Adjusts font sizes and button layouts
- **Tablet Support**: Medium screen optimizations
- **Desktop Enhanced**: Full parallax effects on larger screens

### Performance Optimizations
- **Hardware Acceleration**: Uses GPU for smooth animations
- **Eager Loading**: Hero images load immediately (no lazy loading)
- **Optimized Transforms**: Efficient CSS transforms for better performance

## 🔧 Technical Implementation

### React Hooks Used
- `useState`: Manages image index and loading state
- `useEffect`: Handles cookie management and scroll events
- **Event Listeners**: Scroll event for parallax effect

### Cookie Management
```javascript
// Get saved image index
const savedIndex = getCookie('heroImageIndex');

// Save new index
setCookie('heroImageIndex', nextIndex.toString());
```

### Parallax Implementation
```javascript
// Scroll event handler
const handleScroll = () => {
  const scrolled = window.pageYOffset;
  const speed = scrolled * 0.5;
  parallax.style.transform = `translateY(${speed}px)`;
};
```

## 📱 Browser Compatibility

- **Modern Browsers**: Full support for all features
- **Fallback**: Graceful degradation for older browsers
- **Mobile**: Touch-optimized scroll handling
- **Performance**: Optimized for 60fps animations

## 🎯 Usage Instructions

### Adding New Images
1. Add images to `public/images/hero/` directory
2. Update `heroImages` array in `HeroSection.js`
3. Images should be high resolution (1920x1080+ recommended)

### Navigation Controls
- **Arrow Buttons**: Click left/right arrows to navigate images
- **Keyboard**: Use left/right arrow keys for navigation
- **Auto-rotation**: Images change on page refresh
- **Counter**: Shows current image position (e.g., "2 / 3")

### Customizing Parallax Speed
```javascript
// Change speed in HeroSection.js
const speed = scrolled * 0.5; // 0.5 = 50% of scroll speed
```

### Modifying Cookie Duration
```javascript
// Change duration in setCookie function
setCookie('heroImageIndex', nextIndex.toString(), 30); // 30 days
```

## 🚀 Performance Tips

1. **Image Optimization**: Use WebP format with JPEG fallbacks
2. **Compression**: Compress images to 80-90% quality
3. **Dimensions**: Use images at least 1920px wide
4. **File Size**: Keep individual images under 500KB
5. **Loading**: Consider preloading next image in sequence

## 🐛 Troubleshooting

### Images Not Loading
- Check file paths in `heroImages` array
- Verify images exist in `public/images/hero/`
- Check browser console for 404 errors

### Parallax Not Working
- Ensure browser supports CSS transforms
- Check for JavaScript errors in console
- Verify scroll event listeners are attached

### Cookie Issues
- Check if cookies are enabled in browser
- Verify domain and path settings
- Clear browser cookies to reset sequence
