# Terebinth Estate - Christian Pilgrimage Accommodation

A luxury countryside accommodation website for Christian pilgrims visiting the Holy Land, located in the Golan Heights near the Sea of Galilee.

## 🌟 Features

- **Hero Section** - Stunning aerial video of Galilee with compelling call-to-action
- **Spiritual Connection** - Biblical quotes and connection to Holy Land sites
- **About Estate** - Interactive image gallery showcasing luxury suites
- **Guest Experience** - Guided tours, biblical evenings, and group hosting
- **Testimonials** - Real guest experiences with rotating carousel
- **Location & Map** - Interactive Google Maps with nearby biblical sites
- **Contact Form** - WhatsApp integration and contact form

## 🎨 Design

- **Color Scheme**: Blue (Galilee/sky), Gold (spirituality), Green (nature)
- **Typography**: Lato font family for clean, modern readability
- **Mood**: Luxury meets spirituality with minimalist biblical touches
- **Responsive**: Fully responsive design for all devices

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd terebinth-estate
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📁 Project Structure

```
src/
├── components/
│   ├── HeroSection/
│   │   ├── HeroSection.js
│   │   ├── HeroSection.css
│   │   └── index.js
│   ├── SpiritualConnection/
│   │   ├── SpiritualConnection.js
│   │   ├── SpiritualConnection.css
│   │   └── index.js
│   ├── AboutEstate/
│   │   ├── AboutEstate.js
│   │   ├── AboutEstate.css
│   │   └── index.js
│   ├── GuestExperience/
│   │   ├── GuestExperience.js
│   │   ├── GuestExperience.css
│   │   └── index.js
│   ├── Testimonials/
│   │   ├── Testimonials.js
│   │   ├── Testimonials.css
│   │   └── index.js
│   ├── LocationMap/
│   │   ├── LocationMap.js
│   │   ├── LocationMap.css
│   │   └── index.js
│   └── ContactCTA/
│       ├── ContactCTA.js
│       ├── ContactCTA.css
│       └── index.js
├── App.js & .css
├── index.js
└── index.css (global styles)
```

## 🖼️ Required Images

Place the following images in the `public/images/` directory:

- `hero-poster.jpg` - Hero section fallback image
- `sea-of-galilee.jpg` - Spiritual connection section
- `suite-exterior.jpg` - Estate gallery
- `suite-interior.jpg` - Estate gallery
- `private-jacuzzi.jpg` - Estate gallery
- `heated-pool.jpg` - Estate gallery
- `sauna.jpg` - Estate gallery
- `garden-area.jpg` - Estate gallery
- `testimonial-1.jpg` through `testimonial-4.jpg` - Guest photos

## 🎥 Required Videos

Place the following video in the `public/videos/` directory:

- `galilee-aerial.mp4` - Hero section background video

## 📱 Contact Information

Update the following in the components:

1. **Phone Numbers**: Replace `972XXXXXXXXX` with actual phone numbers
2. **Email**: Update `info@terebinth-estate.com` with actual email
3. **Google Maps**: Update the iframe src with actual coordinates
4. **WhatsApp Links**: Update with actual WhatsApp numbers

## 🔧 Customization

### Colors
Update CSS variables in `src/index.css`:
```css
:root {
  --primary-blue: #1e3a8a;
  --secondary-blue: #3b82f6;
  --gold: #f59e0b;
  --nature-green: #059669;
}
```

### Content
- Update text content in each component file
- Modify testimonials in `Testimonials.js`
- Update nearby sites in `LocationMap.js`
- Customize amenities in `AboutEstate.js`

## 📈 SEO & Performance

- **Meta Tags**: Optimized for Christian pilgrimage accommodation
- **Schema.org**: LodgingBusiness structured data
- **Performance**: Lazy loading, optimized images, Lighthouse >90
- **Accessibility**: Semantic HTML, proper alt tags, keyboard navigation

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

### Deploy to Netlify/Vercel

1. Connect your repository to Netlify or Vercel
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy!

## 📞 Support

For questions or support, please contact:
- Email: info@terebinth-estate.com
- Phone: +972-XX-XXX-XXXX
- WhatsApp: [Contact Link]

## 📄 License

This project is proprietary and confidential. All rights reserved.

---

**Terebinth Estate** - Walk in the Footsteps of Jesus
