# abhinavjha.net

Personal site for Abhinav Jha. Hand-written static HTML / CSS / JS — no build step, no framework, no JS runtime dependencies. Hosted on **GitHub Pages** with a custom domain.

---

## Stack & rationale

- **HTML + CSS + a tiny bit of vanilla JS.** No build tooling — every commit on `main` is what ships.
- **No CSS framework.** Custom CSS for one page is ~6 KB; Tailwind via Play CDN would have shipped ~100 KB of runtime JS just to style markup, and would have printed a "not for production" warning to the console. If the site grows to many pages, swap to a Tailwind CLI build and commit the output.
- **System & Google fonts (Inter + JetBrains Mono).** Loaded with `display=swap` and preconnect for fast first paint.
- **No tracking, no analytics, no cookies.** Add later if needed.
- **Fully responsive, dark-only, respects `prefers-reduced-motion`.**

```
.
├── index.html        # the page
├── styles.css        # all styling
├── script.js         # reveal animations, year, ambient cursor glow
├── 404.html          # custom not-found page
├── favicon.svg       # AJ monogram
├── CNAME             # tells GitHub Pages this site serves abhinavjha.net
├── .nojekyll         # disables Jekyll on Pages (faster, no surprises)
├── robots.txt
├── sitemap.xml
└── README.md
```

---

## Local development

Open `index.html` in a browser, or run any static server in this directory. For example:

```powershell
# Python (if installed)
python -m http.server 8000

# Node (if installed)
npx serve .
```

Then visit http://localhost:8000.

---

## Deploying to GitHub Pages

The repo is already wired up for Pages — the only thing you need to do is push and flip the toggle.

### 1. Install Git (one-time, if not already installed)

Download from https://git-scm.com/download/win and accept the defaults. Reopen your terminal afterwards.

### 2. Push this folder to your GitHub repo

From the project root (`d:\abhinavjha.net`):

```powershell
git init -b main
git add .
git commit -m "Initial site"
git remote add origin https://github.com/abhi2504/abhinavjha.net.git
git push -u origin main
```

If the repo doesn't exist yet on GitHub, create it first at <https://github.com/new> with the name `abhinavjha.net` (public, no README/license — leave it empty so the push above works cleanly).

### 3. Enable GitHub Pages

1. Go to <https://github.com/abhi2504/abhinavjha.net/settings/pages>
2. Under **Build and deployment** → **Source**, choose **Deploy from a branch**.
3. Set **Branch** to `main` and folder to `/ (root)`. Click **Save**.
4. Wait ~30–60 seconds. The default Pages URL will be:
   - https://abhi2504.github.io/abhinavjha.net/

That URL works immediately. The custom domain (next section) replaces it.

---

## Connecting the GoDaddy domain `abhinavjha.net`

The repo already includes a `CNAME` file pointing at `abhinavjha.net`, so once DNS resolves, GitHub Pages will pick it up automatically. You need to do two things: add DNS records in GoDaddy, then confirm the domain inside GitHub.

### Step A — Add these DNS records in GoDaddy

Sign in to GoDaddy → **My Products** → **Domains** → `abhinavjha.net` → **DNS**. Delete any existing **A** or **CNAME** records on `@` and `www` that GoDaddy added by default (they'll point to GoDaddy parking pages), then add the records below exactly.

#### A records (apex / root domain)

Point `abhinavjha.net` (the bare domain, no `www`) at GitHub's four Pages IPs:

| Type | Name | Value             | TTL    |
|------|------|-------------------|--------|
| A    | @    | 185.199.108.153   | 600    |
| A    | @    | 185.199.109.153   | 600    |
| A    | @    | 185.199.110.153   | 600    |
| A    | @    | 185.199.111.153   | 600    |

#### AAAA records (IPv6 — recommended, optional)

| Type | Name | Value                     | TTL  |
|------|------|---------------------------|------|
| AAAA | @    | 2606:50c0:8000::153       | 600  |
| AAAA | @    | 2606:50c0:8001::153       | 600  |
| AAAA | @    | 2606:50c0:8002::153       | 600  |
| AAAA | @    | 2606:50c0:8003::153       | 600  |

#### CNAME record (www subdomain)

Point `www.abhinavjha.net` at your Pages site:

| Type  | Name | Value                  | TTL  |
|-------|------|------------------------|------|
| CNAME | www  | abhi2504.github.io     | 600  |

> Note: enter `abhi2504.github.io` **without a trailing dot** in GoDaddy. Some registrars need a trailing dot — GoDaddy adds it automatically.

Save changes. Propagation typically takes 15 minutes to a few hours. You can check with:

```powershell
nslookup abhinavjha.net
nslookup www.abhinavjha.net
```

### Step B — Confirm the custom domain in GitHub

1. Go to <https://github.com/abhi2504/abhinavjha.net/settings/pages>
2. Under **Custom domain**, enter `abhinavjha.net` and click **Save**.
   - GitHub will show a "DNS check" — once your A records propagate, it turns green.
   - The repo's `CNAME` file already contains `abhinavjha.net`, so this step is mostly confirmation; if GitHub asks to overwrite it, that's fine.
3. Once the DNS check passes, tick **Enforce HTTPS**. (This option only enables after GitHub provisions a Let's Encrypt cert, which can take up to ~24 hours after DNS resolves correctly. Usually it's much faster.)

After this, both `https://abhinavjha.net` and `https://www.abhinavjha.net` will serve the site, with `www` redirecting to the apex.

---

## Editing content

Almost everything you'll want to change lives in [`index.html`](index.html):

- **Bio text** → the three `<p>` tags inside `.about-prose`.
- **Focus / Stack / Currently lists** → the `.about-side` block.
- **Contact email** → search for `hello@abhinavjha.net` and replace.
- **Status badge** ("Available for new work") → the `.status-text` span.

Colors and spacing live as CSS variables at the top of [`styles.css`](styles.css) (`:root { --bg, --fg, --accent, ... }`).

When you push to `main`, GitHub Pages redeploys in ~30 seconds.

---

## License

Personal site content. Source layout free to reference; please don't republish the bio/copy verbatim.
