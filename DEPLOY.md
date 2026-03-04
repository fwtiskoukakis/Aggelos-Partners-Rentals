# Deploy Aggelos Partners Rentals

## Option A: Deploy with Vercel (recommended)

1. **Log in to Vercel** (one-time):
   ```bash
   npx vercel login
   ```
   Follow the link to log in with email or GitHub.

2. **Deploy from this folder**:
   ```bash
   cd "c:\Users\Fotis\Desktop\Aggelos Rentals Piraeus Website\antiparosrentacar.com\aggelos-partners-rentals"
   npx vercel
   ```
   - First time: accept defaults (link to existing project or create new one).
   - You’ll get a URL like `https://aggelos-partners-rentals-xxx.vercel.app`. Test `/therooster` and `/therooster/print`.

3. **Production deploy**:
   ```bash
   npx vercel --prod
   ```

4. **Add your domain**:
   - In [Vercel Dashboard](https://vercel.com/dashboard) → your project → **Settings** → **Domains**
   - Add `aggelospartnersrentals.com`
   - Add `www.aggelospartnersrentals.com` if you use www
   - In your domain registrar, set the nameservers or DNS records as Vercel instructs (usually A/CNAME to Vercel).

---

## Option B: Deploy via Git (Vercel)

1. Push this project to a Git repo (GitHub, GitLab, or Bitbucket).
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. Root directory: leave as is (or set to the folder that contains `package.json`).
4. Deploy. Every push to `main` will auto-deploy.
5. Add domain in project **Settings** → **Domains** as above.

---

## After deploy

- **App URL:** `https://aggelospartnersrentals.com/therooster`
- **Print/QR page:** `https://aggelospartnersrentals.com/therooster/print`
- Root `https://aggelospartnersrentals.com/` redirects to `/therooster`.

Build has been verified locally (`npm run build` succeeds).
