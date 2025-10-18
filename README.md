# نیلسان استودیو (Nilsun Studio)

A modern, responsive creative design studio website built with HTML5, CSS3, JavaScript, and Tailwind CSS. The website showcases creative services, portfolio projects, and team information with smooth animations and interactive features.

## 🌟 Features

### 🎨 Design & UI
- **Modern Dark Theme** - Sleek dark design with custom color palette
- **RTL Support** - Full right-to-left language support for Persian/Farsi
- **Responsive Design** - Mobile-first approach with responsive breakpoints
- **Smooth Animations** - CSS transitions and JavaScript-powered animations
- **Interactive Elements** - Hover effects, smooth scrolling, and dynamic content

### 📱 User Experience
- **Mobile Menu** - Hamburger menu with smooth slide-in animation
- **Smooth Scrolling** - Custom smooth scroll implementation for navigation
- **Video Lazy Loading** - Optimized video loading for better performance
- **Back to Top Button** - Smooth scroll-to-top functionality
- **Video Modal** - Full-screen video player for portfolio projects

### 🎬 Portfolio Showcase
- **Project Carousel** - Flickity-powered carousel for project showcase
- **Video Projects** - Interactive video thumbnails with play buttons
- **Project Details** - Detailed descriptions and project information
- **Lazy Loading** - Videos load only when needed for better performance

### 👥 Team Section
- **Team Grid** - Responsive grid layout for team members
- **Social Links** - Hover effects for social media links
- **Professional Photos** - High-quality team member images

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Custom styles with CSS Grid and Flexbox
- **JavaScript (ES6+)** - Modern JavaScript with modular functions
- **Tailwind CSS** - Utility-first CSS framework
- **jQuery** - DOM manipulation and smooth scrolling

### Libraries & Plugins
- **Flickity** - Touch-friendly carousel for project showcase
- **Material Icons** - Google Material Design icons
- **Font Awesome** - Social media and UI icons
- **Google Fonts** - Vazirmatn and Inter font families

### Performance
- **Lazy Loading** - Videos and images load on demand
- **CDN Resources** - External libraries loaded from CDN
- **Optimized Assets** - Compressed images and videos

## 📁 Project Structure

```
Nilsun/
├── index.html              # Main homepage
├── contact.html            # Contact page
├── script.js              # Main JavaScript file
├── main.css               # Custom CSS styles
├── tailwind.config.js     # Tailwind CSS configuration
├── img/                   # Image assets
│   ├── logo.png          # Studio logo
│   ├── favicon.ico       # Website favicon
│   └── projects/         # Project thumbnails
│       ├── BANK SADERAT.jpg
│       ├── EKESF.jpg
│       ├── FAKE.jpg
│       ├── NORDFORM.jpg
│       └── REZVANI.jpg
├── video/                 # Video assets
│   ├── main.mp4          # Hero video
│   ├── BANK_SADERAT.mp4
│   ├── EKESF.mp4
│   ├── FAKE.mp4
│   ├── NORDFORM.mp4
│   └── REZVANI.mp4
└── UI/                    # UI mockups
    └── screen.png
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/arsph/Nilsun.git
   cd Nilsun
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx serve .
     
     # Using PHP
     php -S localhost:8000
     ```

3. **Access the website**
   - Open `http://localhost:8000` in your browser

## 🎯 Key Sections

### 🏠 Homepage (`index.html`)
- **Hero Section** - Main video showcase with call-to-action
- **Services Section** - Four main service offerings with icons
- **Projects Section** - Interactive carousel of portfolio projects
- **About Section** - Studio founder's story and mission
- **Team Section** - Professional team member showcase
- **Stats Section** - Key performance metrics

### 📞 Contact Page (`contact.html`)
- **Contact Form** - Professional contact form
- **Contact Information** - Studio details and social links
- **Location Details** - Studio address and contact methods

## 🎨 Customization

### Colors
The color scheme is defined in `tailwind.config.js`:
```javascript
colors: {
  primary: "#00C49A",        // Teal green
  secondary: "#D4AF75",      // Gold
  "background-dark": "#0A0F14", // Dark blue
  "text-dark": "#e5e7eb",    // Light gray
  // ... more colors
}
```

### Fonts
- **Primary**: Vazirmatn (Persian/Farsi support)
- **Secondary**: Inter (English text)

### Animations
Custom animations are defined in `main.css` and controlled by JavaScript in `script.js`.

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 JavaScript Features

### Core Functions
- `smoothScrollToTop()` - Custom smooth scroll to top
- `openVideoModalLazy()` - Lazy-loaded video modal
- `animateServicesSection()` - Staggered service animations
- `animateProjectsSection()` - Project carousel animations
- `setupVideoLazyLoading()` - Video lazy loading system

### Event Listeners
- Mobile menu toggle
- Smooth scroll navigation
- Video modal interactions
- Intersection Observer for animations
- Keyboard navigation (Escape key)

## 🌐 Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 📈 Performance Features

- **Lazy Loading** - Videos and images load on demand
- **Smooth Animations** - Hardware-accelerated CSS transitions
- **Optimized Assets** - Compressed media files
- **CDN Resources** - Fast loading external libraries

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Arsalan Parham**
- Website: [arsalanparham.com](https://arsalanparham.com)
- GitHub: [@arsph](https://github.com/arsph)

## 🙏 Acknowledgments

- **Nilsun Studio** - Creative design studio
- **Tailwind CSS** - Utility-first CSS framework
- **Flickity** - Touch-friendly carousel
- **Material Icons** - Google Material Design icons
- **Font Awesome** - Icon library

---

**نیلسان استودیو** - چشم انداز شما، ماموریت هنری ما
*Your Vision, Our Artistic Mission*
