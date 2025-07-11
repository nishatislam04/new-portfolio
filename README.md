# 🚀 Nishat Mazumder - Portfolio Website

A stunning, responsive portfolio website showcasing my work as a Full Stack Web Developer. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. Features enterprise-grade projects, modern design with smooth animations, and production-ready optimizations.

## ✨ Features

- **Modern Design**: Clean, professional design with dark theme and gradient accents
- **Responsive**: Mobile-first design that works perfectly on all devices
- **Smooth Animations**: Powered by Framer Motion for engaging user experience
- **Performance Optimized**: Built with Next.js 14 App Router for optimal performance
- **Accessibility**: WCAG compliant with proper semantic HTML and keyboard navigation
- **SEO Optimized**: Meta tags, structured data, and optimized for search engines
- **TypeScript**: Fully typed for better development experience and code quality

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Custom SVG components
- **Font**: Inter (Google Fonts)
- **Deployment**: Vercel

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── assets/                # Static assets
│   ├── icons/             # SVG icons
│   └── images/            # Images and photos
├── components/            # Reusable components
│   ├── animations/        # Animation components
│   ├── icons/             # Icon components
│   ├── performance/       # Performance components
│   └── ui/                # UI components
├── constants/             # App constants and data
├── sections/              # Page sections
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions
```

## 🛠️ Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Customization

### Personal Information

Update the following files with your information:

- `src/constants/index.ts` - Projects, testimonials, skills, and contact info
- `src/app/layout.tsx` - Meta tags and SEO information
- `src/assets/images/` - Replace with your project images and photos

### Styling

- `src/app/globals.css` - Global styles and CSS variables
- `tailwind.config.ts` - Tailwind configuration and custom colors
- Individual component files for specific styling

### Content Sections

Each section is a separate component in `src/sections/`:

- `Header.tsx` - Navigation header
- `Hero.tsx` - Hero/landing section
- `About.tsx` - About me section
- `Projects.tsx` - Projects showcase
- `Testimonials.tsx` - Client testimonials
- `Tape.tsx` - Scrolling skills tape
- `Contact.tsx` - Contact form and info
- `Footer.tsx` - Footer section

## 🎨 Design Features

- **Dark Theme**: Modern dark color scheme with emerald and sky accents
- **Gradient Text**: Eye-catching gradient text effects
- **Glass Morphism**: Subtle glass effects on cards and components
- **Smooth Scrolling**: Smooth scroll behavior and scroll-triggered animations
- **Hover Effects**: Interactive hover states and micro-animations
- **Mobile Menu**: Responsive hamburger menu for mobile devices

## 🚀 Deployment

### Vercel (Recommended)

1. **Prepare for Production**

   ```bash
   npm run lint:fix
   npm run type-check
   npm run build
   ```

2. **Deploy to Vercel**
   - Push your code to GitHub
   - Connect your repository to Vercel
   - Set environment variables in Vercel dashboard
   - Deploy automatically with each push

3. **Environment Variables**
   - Copy `.env.example` to `.env.local`
   - Fill in your actual values
   - Add the same variables to Vercel dashboard

### Manual Build

```bash
npm run build
npm start
```

### Performance Optimization

- ✅ Image optimization with WebP/AVIF formats
- ✅ Code splitting and lazy loading
- ✅ CSS optimization and minification
- ✅ Gzip compression enabled
- ✅ SEO optimizations (sitemap, robots.txt)
- ✅ Error boundaries and loading states

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Design inspiration from modern portfolio trends
- Icons and illustrations from various open-source projects
- Built with love using modern web technologies
