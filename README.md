# 🖥️ PC Builder - Custom Computer Configurator

A dynamic, customizable product configurator built with Next.js where users can build custom PCs, see real-time pricing, and checkout via Stripe.

## ✨ Features

- **🔧 Interactive PC Building**: Select from various components (CPU, RAM, GPU, Storage, etc.)
- **💰 Real-time Pricing**: Live price updates as you select components
- **🛒 Shopping Cart**: Add configurations to cart with quantity management
- **💳 Stripe Checkout**: Secure payment processing (test mode included)
- **📱 Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **💾 Persistent State**: Cart persists across browser sessions

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Stripe account (for checkout functionality)

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd product-customizer
npm install
```

### 2. Environment Setup

Create a `.env.local` file:

```env
# Stripe Test Keys (Get from https://dashboard.stripe.com/test/apikeys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework + API routes |
| **TypeScript** | Type safety |
| **Tailwind CSS** | UI styling |
| **Zustand** | State management |
| **Stripe** | Payment processing |
| **Docker** | Containerization |

## 📦 Project Structure

```
product-customizer/
├── components/           # React components
│   ├── Header.tsx       # Navigation header
│   ├── ProductCustomizer.tsx  # Main configurator
│   └── Cart.tsx         # Shopping cart
├── data/
│   └── products.json    # Product catalog
├── pages/
│   ├── index.tsx        # Home page
│   ├── checkout-success.tsx  # Success page
│   └── api/
│       └── create-checkout-session.ts  # Stripe API
├── store/
│   └── useCart.ts       # Zustand store
├── styles/
│   └── globals.css      # Global styles
└── Dockerfile           # Container config
```

## 🔧 Customization

### Adding New Product Categories

Edit `data/products.json`:

```json
{
  "category": "New Category",
  "options": [
    { "id": "item1", "name": "Item Name", "price": 5000 }
  ]
}
```

### Styling

- Modify `tailwind.config.js` for design system changes
- Update `styles/globals.css` for custom components
- Components use Tailwind utility classes

### Payment Currency

Change currency in:
- `components/Cart.tsx` - `formatPrice` function
- `pages/api/create-checkout-session.ts` - `currency` field

## 🐳 Docker Deployment

### Build and Run

```bash
# Build image
docker build -t product-customizer .

# Run container
docker run -p 3000:3000 product-customizer
```

### Using Docker Compose

```bash
docker-compose up -d
```

### Environment Variables for Production

```env
NODE_ENV=production
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key
STRIPE_SECRET_KEY=sk_live_your_live_key
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

## 🚀 Deployment Options

### Vercel (Recommended)
1. Connect your GitHub repository
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Proxmox VM
1. Build Docker image
2. Transfer to Proxmox VM
3. Run with docker-compose
4. Setup reverse proxy (nginx/caddy)

### Other Platforms
- **Netlify**: Static export mode
- **DigitalOcean**: App Platform
- **AWS**: ECS or Amplify
- **Railway**: Direct deployment

## 🔒 Security Notes

- Use HTTPS in production
- Store Stripe keys securely
- Enable CORS properly
- Validate all API inputs
- Use environment variables for secrets

## 🧪 Testing Stripe Integration

Use Stripe test cards:
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **3D Secure**: 4000 0000 0000 3220

Any future expiry date and CVC work for test mode.

## 📈 Performance Tips

- Enable Next.js Image Optimization
- Use Static Generation where possible
- Implement proper caching headers
- Optimize bundle size with tree-shaking
- Consider CDN for static assets

## 🐛 Troubleshooting

### Build Issues
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Stripe Webhook Issues
- Check endpoint URLs in Stripe dashboard
- Verify webhook signatures
- Test with Stripe CLI

### Docker Issues
```bash
# Check logs
docker logs <container-id>

# Debug container
docker exec -it <container-id> /bin/sh
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built following modern React/Next.js patterns
- Stripe integration best practices
- Tailwind CSS design system
- Docker containerization standards 