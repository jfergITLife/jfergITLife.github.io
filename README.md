# jfergitlife-portfolio

Personal portfolio + blog landing page. Terminal-themed, minimal, single page.

Built with [Astro](https://astro.build) and deployed to GitHub Pages.

## Stack

- Astro 4 (static site generator, no client-side framework)
- Plain CSS with CSS variables for theming
- JetBrains Mono via Google Fonts
- Vanilla JS for the video swap and email form

No build dependencies on Tailwind, React, or anything else. Stays fast and easy to maintain.

## Local development

```bash
npm install
npm run dev
```

Site runs at `http://localhost:4321`.

## Deploy

This repo deploys automatically to GitHub Pages on every push to `main` via the workflow in `.github/workflows/deploy.yml`.

### One-time GitHub setup

1. Push this repo to `github.com/jfergITLife/jfergITLife.github.io` (the user-site repo name is required for the root URL).
2. In the repo settings → Pages → set "Source" to **GitHub Actions**.
3. Push to `main`. Workflow runs, deploys, site goes live at `https://jfergitlife.github.io`.

### Migrating to a custom domain later

When you buy `jfergitlife.com` (or any domain):

1. In `astro.config.mjs`, change `site` to `'https://jfergitlife.com'`.
2. Create `public/CNAME` containing the single line `jfergitlife.com`.
3. At your registrar, add these DNS records pointing the apex domain to GitHub Pages:
   - `A` record → `185.199.108.153`
   - `A` record → `185.199.109.153`
   - `A` record → `185.199.110.153`
   - `A` record → `185.199.111.153`
   - `CNAME` `www` → `jfergITLife.github.io`
4. Push. In GitHub repo settings → Pages, enter `jfergitlife.com` as the custom domain. GitHub provisions an SSL cert automatically (takes ~10 minutes).

That's it. No code changes beyond step 1 and 2.

## File map

```
src/
├── layouts/
│   └── Base.astro          shared head, fonts, global styles, CSS vars
├── pages/
│   ├── index.astro         landing page (hero, about, projects, certs, footer)
│   └── blog/
│       └── index.astro     blog coming-soon page with email capture
public/
├── favicon.svg             terminal-prompt favicon
└── images/                 drop your headshot here as headshot.jpg
.github/workflows/
└── deploy.yml              auto-deploy on push to main
```

## Customization

### Adding the headshot

Drop a square image (recommended: 400x400px) into `public/images/headshot.jpg`. Then in `src/pages/index.astro`, replace the `.avatar` block with:

```astro
<div class="avatar">
  <img src="/images/headshot.jpg" alt="Jacob Ferguson" style="width:100%;height:100%;object-fit:cover;" />
</div>
```

### Adding the resume

Drop the file as `public/resume.pdf`. The link in the footer already points there.

### Wiring the email form to a real provider

In `src/pages/blog/index.astro`, find the `// TODO: POST to your newsletter provider here.` line and replace the form handler with a real fetch to Buttondown, ConvertKit, or whatever you choose.

Buttondown example (free tier, 100 subscribers):
```js
fetch('https://api.buttondown.email/v1/subscribers', {
  method: 'POST',
  headers: {
    'Authorization': `Token YOUR_API_KEY`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email }),
});
```

For client-side safety, prefer Buttondown's embeddable form action URL over exposing your API key.

### Adding blog posts

When you're ready to publish posts, create `src/pages/blog/posts/` with markdown files. Astro renders `.md` and `.mdx` files automatically. Replace the coming-soon `blog/index.astro` with a post listing page that maps over `Astro.glob('./posts/*.md')`.

## Repo links in project cards

The three project cards in `src/pages/index.astro` link to:
- Terraform GCP Lab → `github.com/jfergITLife/grc-engineering-lab`
- S3 Public Access Auditor → `github.com/jfergITLife/grc-engineering-lab`
- AWS Automated Access Review → `github.com/jfergITLife/grc-aws-access-review`

If you want each card to link to a specific subdirectory in the umbrella repo, edit the `repoUrl` field in the `projects` array at the top of `index.astro`. Example: `https://github.com/jfergITLife/grc-engineering-lab/tree/main/terraform_gcp_lab`.
