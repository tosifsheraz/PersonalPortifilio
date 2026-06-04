# Portfolio CMS

A modern, interactive portfolio website with a powerful admin CMS built with React, Vite, and Supabase. Features smooth animations, real-time data updates, and a clean admin interface for managing portfolio content.

## Features

- 🎨 **Modern UI** - Smooth animations, curved separators, and scroll reveals
- 🛠️ **Admin CMS** - Easy-to-use dashboard to manage portfolio content
- 🔐 **Authentication** - Secure login system for admin access
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

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio-cms.git
   cd portfolio-cms
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` with your Supabase credentials:
   - `VITE_SUPABASE_URL` - Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

4. **Set up Supabase database**
   - Go to your Supabase project
   - Navigate to SQL Editor
   - Run the migrations in `supabase/schema.sql`
   - (Optional) Run `supabase/seed.sql` for sample data

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to your hosting service** (Vercel, Netlify, GitHub Pages, etc.)
   - Ensure environment variables are set in your hosting platform
   - The `dist/` folder contains the production build

### Popular Hosting Options

- **Vercel**: Zero-config deployment for Vite projects
- **Netlify**: Drag-and-drop or Git integration
- **GitHub Pages**: Free hosting with GitHub Actions
- **Self-hosted**: Use any Node.js hosting provider

## Admin Access

1. Navigate to the admin panel in your application
2. Log in with your credentials (set up in Supabase Auth)
3. Manage your portfolio content through the admin dashboard

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

## Database Schema

The project uses Supabase with PostgreSQL. Key tables include:

- **users** - Admin user authentication
- **experiences** - Work experience entries
- **projects** - Portfolio projects
- **skills** - Technical skills
- **site_config** - Global site settings

See `supabase/schema.sql` for complete schema definition.

## Customization

### Styling

- Global styles: `src/styles/globals.css`
- Tailwind config: `tailwind.config.js`
- PostCSS config: `postcss.config.js`

### Animations

Animation utilities and configurations are in `src/lib/animations.js`

### Adding New Sections

1. Create a new component in `src/components/sections/`
2. Add it to the main portfolio page in `src/pages/Portfolio.jsx`
3. Add corresponding admin panel if needed in `src/components/admin/`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.
