# Cooked this Paperfolio template with V0 | Here’s the template you can use for free

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://v0.link/nikhil-shukla)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.link/paperfolio)

![Paperfolio Template Preview](https://global.discourse-cdn.com/vercel/original/2X/e/e8a5d554ecf92e4adb4a718138c60ad7e0c7510e.png)

I’ve been experimenting with **V0 - by Vercel**, and I rebuilt the popular **Paperfolio** layout originally created by **Brix Templates**.
This is a community-made clone — all ownership of the original design stays with @brixtemplatesbrixtemplates.
My goal was simply to recreate it in V0 so anyone can use or remix it.

---

## Live Demo & Template Access

**→  Template (Clone / Remix):** https://v0.link/paperfolio

**→  Live Preview:** https://v0-paperfolio.vercel.app

---

## Video Walkthrough

**→ Watch the walkthrough on X:**
[https://x.com/i/status/1994130537464910310](https://x.com/i/status/1994130537464910310)

---

## What’s Inside the Template

* Clean portfolio with hero section and highlight-style text blocks
* Minimal, bold layout focused on showcasing your work
* Reusable components built directly in V0
* Easy to customize for personal portfolios or client sites

---

## How to Use It

1. Open the template → https://v0.link/paperfolio
2. Click on “Open in V0”
3. Make your styling tweaks
4. Deploy on Vercel

That’s it — you have a clean, modern portfolio site ready to ship.

---

If you end up customizing this, I’d like to see what you build.

## Contact Form Email Setup

The contact form now posts to `/api/contact` and sends mail through Resend.

Set these environment variables before running:

- `RESEND_API_KEY` - your Resend API key
- `CONTACT_TO_EMAIL` - destination inbox that should receive form submissions
- `CONTACT_FROM_EMAIL` - sender address (optional). Defaults to `Portfolio Contact <onboarding@resend.dev>`

## Admin Panel (Projects + Tech Stack + Skills)

You can now manage portfolio content from `/admin`.

Set this environment variable:

- `ADMIN_PASSWORD` - password used for admin login

Then:

1. Start the app with `npm run dev`
2. Open `/admin/login`
3. Sign in and update profile/contact text, projects, technical skills cards, and marquee technologies
4. Click **Save changes**

Saved content is stored in `data/portfolio-content.json`.
