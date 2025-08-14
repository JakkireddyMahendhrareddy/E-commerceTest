# NXT Trendz - Deployment Guide

## 🚀 Production Deployment

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Access to your hosting platform (Vercel, Netlify, etc.)

### Environment Setup

1. **Create Environment File**
   ```bash
   # Copy the example environment file
   cp env.example .env
   
   # Edit .env with your production values
   VITE_API_URL=https://e-commercebackend-1-k8yl.onrender.com
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

### Build Commands

```bash
# Development build
npm run dev

# Production build
npm run build:prod

# Preview production build locally
npm run preview:prod

# Clean and deploy
npm run deploy
```

### Deployment Platforms

#### Vercel
1. Connect your GitHub repository
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

#### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build:prod`
3. Set publish directory: `dist`
4. Set environment variables in Netlify dashboard

#### Manual Deployment
1. Run `npm run build:prod`
2. Upload `dist` folder to your web server
3. Configure server to serve `index.html` for all routes

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `https://e-commercebackend-1-k8yl.onrender.com` |
| `VITE_APP_NAME` | Application name | `NXT Trendz` |
| `VITE_APP_VERSION` | Application version | `1.0.0` |

### Common Issues & Solutions

#### 1. API Connection Errors
- Verify `VITE_API_URL` is correct
- Check if backend server is running
- Ensure CORS is properly configured on backend

#### 2. Build Failures
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version compatibility
- Verify all dependencies are installed

#### 3. Routing Issues
- Ensure server is configured for SPA routing
- All routes should serve `index.html`
- Check base path configuration

#### 4. Performance Issues
- Enable gzip compression on server
- Configure proper caching headers
- Use CDN for static assets

### Production Checklist

- [ ] Environment variables configured
- [ ] API endpoints working
- [ ] Error boundaries implemented
- [ ] Loading states added
- [ ] Image fallbacks configured
- [ ] Build optimization enabled
- [ ] Source maps disabled
- [ ] Minification enabled
- [ ] Chunk splitting configured

### Monitoring & Debugging

1. **Console Logs**: Check browser console for errors
2. **Network Tab**: Monitor API requests and responses
3. **Error Boundaries**: Catch and display React errors
4. **Performance**: Use Lighthouse for optimization tips

### Support

If you encounter issues:
1. Check the browser console for errors
2. Verify environment variables
3. Test API endpoints independently
4. Check server configuration
5. Review deployment platform logs
