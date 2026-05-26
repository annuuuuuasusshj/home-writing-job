# Hostinger Deployment Guide

## Option 1: Hostinger VPS (Recommended - Admin Panel Works)

### Step 1: Build & Upload
```bash
npm run build
```
Upload the entire project folder to your VPS via SSH/SFTP.

### Step 2: Install Node.js on VPS
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Step 3: Install PM2 (Process Manager)
```bash
sudo npm install -g pm2
```

### Step 4: Start the App
```bash
cd /home/your-username/home-writing-job
npm install --production
npm run build
pm2 start npm --name "vishv-website" -- start
pm2 save
pm2 startup
```

### Step 5: Setup Nginx Reverse Proxy
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Step 6: SSL Certificate
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### Step 7: Point Domain
In Hostinger DNS settings, add:
- **A Record**: `@` → Your VPS IP
- **A Record**: `www` → Your VPS IP

---

## Option 2: Hostinger Shared Hosting (Static Export)

> Note: Admin panel will NOT work with static export. You'll need to edit `data/config.json` manually.

### Step 1: Enable Static Export
In `next.config.ts`, add:
```ts
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};
```

### Step 2: Build
```bash
npm run build
```

### Step 3: Upload
Upload the contents of the `out/` folder to `public_html/` on Hostinger via File Manager or FTP.

### Step 4: Point Domain
Domain is already pointed to your Hostinger shared hosting by default.

---

## Admin Panel Access
- URL: `https://yourdomain.com/admin`
- Default Password: `admin123`
- **Change the password immediately after first login!**

## What You Can Edit from Admin Panel
- Company name, logo, tagline
- Telegram link
- WhatsApp number
- Support phone number
- UPI ID & QR code image
- All 3 project plans (name, pricing, fees)
- All 6 testimonials
- All 8 notification messages
- Admin password
