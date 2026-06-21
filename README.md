# Portfolio CMS

A modern, interactive portfolio website with a powerful admin CMS built with React, Vite, and Supabase. Features smooth animations, real-time data updates.

## Features

- 🎨 **Modern UI** - Smooth animations, curved separators, and scroll reveals
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- ⚡ **Fast Performance** - Built with Vite for optimal build times
- 🎯 **Real-time Updates** - Supabase backend for instant data synchronization
- ✨ **Interactive Elements** - Typewriter effects, animated pets, scroll animations

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS
- **Animations**: Framer Motion, Lenis (smooth scrolling)
- **Backend**: Supabase (PostgreSQL database + Auth)
- **Build Tool**: Vite with HMR
- **Linting**: ESLint

## Project Structure

```
src/
├── components/
│   ├── admin/          # Admin panel components (CRUD, auth, panels)
│   ├── sections/       # Portfolio sections (Hero, About, Projects, etc.)
│   └── ui/             # Reusable UI components (Navbar, Footer, buttons, etc.)
├── context/            # React Context for state management (Auth)
├── hooks/              # Custom React hooks (useAuth, useCRUD, usePortfolioData, etc.)
├── lib/                # Utility libraries (Supabase config, animations, etc.)
├── pages/              # Page components
├── styles/             # Global CSS
└── assets/             # Static assets (images, icons)
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- Supabase account

## Customization

### Styling

- Global styles: `src/styles/globals.css`
- Tailwind config: `tailwind.config.js`
- PostCSS config: `postcss.config.js`

### Animations

Animation utilities and configurations are in `src/lib/animations.js`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.
