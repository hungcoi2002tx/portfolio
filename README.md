# Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, and JavaScript.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Smooth Scrolling**: Navigation with smooth scroll behavior
- **CV Download**: Easy download functionality for your resume
- **Contact Form**: Functional contact form that opens email client
- **Interactive Elements**: Hover effects, animations, and transitions
- **Accessibility**: Built with accessibility best practices

## Sections

1. **Hero Section**: Eye-catching introduction with your name, title, and call-to-action buttons
2. **About**: Personal information and statistics
3. **Experience**: Timeline of your professional experience
4. **Skills**: Visual representation of your technical skills
5. **Projects**: Showcase of your portfolio projects
6. **Contact**: Contact form and information

## Customization Guide

### 1. Personal Information

Update the following in `index.html`:

- **Name**: Replace "Your Name" in the hero section and footer
- **Title**: Change "Full Stack Developer" to your actual title
- **Description**: Update the hero description with your own text
- **Email**: Replace "your.email@example.com" with your actual email
- **Phone**: Update the phone number in the contact section
- **Location**: Update your city and country

### 2. Social Media Links

Update the social media links in:
- Hero section (`.hero-social`)
- Footer (`.footer-social`)

Replace the `href` attributes with your actual profiles:
- GitHub: `https://github.com/yourusername`
- LinkedIn: `https://linkedin.com/in/yourusername`
- Email: `mailto:your.email@example.com`

### 3. Experience

Update the timeline items in the Experience section:
- Dates
- Job titles
- Company names
- Job descriptions

### 4. Skills

Modify the skills in the Skills section:
- Skill names
- Progress percentages (update the `width` style attribute)

### 5. Projects

Update the project cards:
- Project titles
- Descriptions
- Technology tags
- Links to live demos and GitHub repositories

### 6. CV/Resume

1. Create your CV as a PDF file
2. Name it `cv.pdf`
3. Place it in the root directory of the project
4. The download button will automatically work

### 7. Colors

To change the color scheme, update the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #6366f1;
    --primary-dark: #4f46e5;
    --secondary-color: #8b5cf6;
    /* ... other colors ... */
}
```

## File Structure

```
PortFolio/
│
├── index.html      # Main HTML file
├── styles.css      # All styling
├── script.js       # JavaScript functionality
├── cv.pdf          # Your CV/resume (add this file)
└── README.md       # This file
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized CSS with minimal animations
- Efficient JavaScript with event delegation
- Smooth scrolling with native browser support
- Respects `prefers-reduced-motion` for accessibility

## License

Feel free to use this portfolio template for your personal use.

## Notes

- Make sure to add your actual `cv.pdf` file to the root directory
- Update all placeholder content with your real information
- Test the contact form with your email address
- Customize colors and styling to match your brand