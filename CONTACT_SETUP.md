# Contact Information Setup

## Required Updates

Before launching the website, update the following contact information:

### 1. Phone Numbers
Replace `972XXXXXXXXX` in the following files:
- `src/components/HeroSection.js` (line with WhatsApp link)
- `src/components/GuestExperience.js` (WhatsApp links)
- `src/components/ContactCTA.js` (phone number and WhatsApp links)

### 2. Email Address
Update `info@terebinth-estate.com` in:
- `src/components/ContactCTA.js`
- `public/index.html` (if needed)

### 3. Google Maps Coordinates
Update the iframe src in `src/components/LocationMap.js` with actual coordinates:
```javascript
// Replace with actual coordinates for Terebinth Estate
const coordinates = '32.7940,35.6900'; // Example coordinates for Golan Heights
```

### 4. Form Submission
Update the form submission logic in `src/components/ContactCTA.js`:
- Replace the simulated submission with actual API endpoint
- Configure email service (Formspree, EmailJS, or custom backend)

### 5. Domain and URLs
Update in `public/index.html`:
- Replace `https://terebinth-estate.com` with actual domain
- Update Open Graph and Twitter Card URLs

## Example Updates

### Phone Number Update
```javascript
// Before
window.open('https://wa.me/972XXXXXXXXX?text=...', '_blank');

// After (example)
window.open('https://wa.me/972501234567?text=...', '_blank');
```

### Email Update
```javascript
// Before
<span className="detail-value">info@terebinth-estate.com</span>

// After
<span className="detail-value">contact@terebinth-estate.com</span>
```

### Google Maps Update
```javascript
// Before
src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3380.123456789!2d35.6900!3d32.7940!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDQ3JzM4LjQiTiAzNcKwNDEnMjQuMCJF!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"

// After (get actual embed code from Google Maps)
src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d[ACTUAL_COORDINATES]..."
```

## Testing Checklist

- [ ] All phone numbers work (test calls and WhatsApp)
- [ ] Email addresses are valid
- [ ] Google Maps shows correct location
- [ ] Contact form submits successfully
- [ ] All links open correctly
- [ ] Social media meta tags have correct URLs

## Deployment Notes

1. Update all placeholder information before deployment
2. Test all contact methods thoroughly
3. Ensure SSL certificate is installed for HTTPS
4. Set up proper email handling for contact form
5. Configure Google Analytics (if needed)
6. Set up Google Search Console
