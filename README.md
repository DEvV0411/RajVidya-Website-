# Raj Vidya Higher Studies — Next.js Website

## Setup

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # run production build
```

## Before Going Live

1. **Razorpay Key** — open `pages/index.js` and replace `YOUR_RAZORPAY_KEY_ID` with your actual key from the [Razorpay Dashboard](https://dashboard.razorpay.com/app/keys).

2. **Logo** — `public/logo.png` is already set. Replace with a higher-res version if needed.

## Deploy to Vercel (recommended — free)

```bash
npm install -g vercel
vercel
```

Or push to GitHub and connect via [vercel.com](https://vercel.com).

## Project Structure

```
rajvidya-higher-studies/
├── pages/
│   ├── _app.js        # Global fonts + CSS
│   └── index.js       # Full single-page site
├── styles/
│   └── globals.css    # All styles
├── public/
│   └── logo.png       # Your logo
├── next.config.js
└── package.json
```

## Contact
+91 98672 34400
