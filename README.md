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

## 📦 Deploy to Cloudflare Workers

### Deploy via Wrangler CLI

```bash
# Install Wrangler globally (if not already installed)
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Build and deploy
npm run build
wrangler deploy
```

Your site will be available at: `https://valentines-meandmywife.<your-subdomain>.workers.dev`

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite 7** - Build tool
- **Cloudflare Workers** - Hosting platform (with Assets)

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
