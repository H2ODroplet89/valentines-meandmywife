# Valentine's Me and My Wife - React App

A React application built with Vite, ready to deploy on Cloudflare Pages.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## 📦 Deploy to Cloudflare Pages

### Option 1: Deploy via Git (Recommended)

1. Push this repository to GitHub
2. Go to [Cloudflare Pages Dashboard](https://dash.cloudflare.com/pages)
3. Click **Create a project** → **Connect to Git**
4. Select your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node version**: `18` (or specify in `.node-version`)
6. Click **Save and Deploy**

### Option 2: Deploy via Wrangler CLI

```bash
# Install Wrangler globally
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy directly
npm run build
wrangler pages deploy dist --project-name=valentines-meandmywife
```

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite 7** - Build tool
- **Cloudflare Pages** - Hosting platform

## 📁 Project Structure

```
├── public/          # Static assets
├── src/             # React components and source code
├── dist/            # Production build output
├── wrangler.toml    # Cloudflare Pages configuration
├── _headers         # Custom HTTP headers
└── vite.config.js   # Vite configuration
```

## 🔒 Security Headers

Custom security headers are configured in `_headers` and automatically copied to the build output.
