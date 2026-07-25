# Hacksaw DayZ website - experience refresh

This is the complete static site, ready for the existing Vercel/GitHub deployment.

## What changed

The site now presents Hacksaw as a fully custom AI-focused progressive PvE server first. Compliance and support information remain available, but they no longer dominate the home page.

The refresh uses the supplied in-game screenshots and server information to introduce:

- Long-form progression from fresh spawn to Takistan
- Five Chernarus AI tiers and the T6 Serpents
- Radio Zenit
- Capital Customs
- Custom crafting, licences and production systems
- Community services including Camp Lesnoy, Training Centre, KC-10 and CAR
- Updated rule summaries
- The automated Discord support workflow

## Deployment

1. Back up the current GitHub branch or create a backup branch.
2. Copy the contents of `hacksawdayz-main` into the local repository root.
3. Review the changes:

   ```powershell
   git status
   git diff --stat
   ```

4. Commit and push:

   ```powershell
   git add .
   git commit -m "Refresh Hacksaw experience, rules and support flow"
   git push origin main
   ```

5. Watch the Vercel deployment and test:
   - Home page at desktop and mobile widths
   - Experience page and Chernarus/Takistan switcher
   - Rules accordions and Discord links
   - Support calculator and payment-channel links
   - Social sharing preview after the deployment cache refreshes

## Social share image

The social image is:

`img/hacksaw-share.jpg`

All pages reference the absolute URL:

`https://hacksawdayz.vercel.app/img/hacksaw-share.jpg`

Discord, Facebook and other services may cache the previous preview. A new URL query string or the platform's sharing debugger can force a refresh.

## Content authority

The website is a public summary. Discord remains authoritative for live rules, announcements, ticket procedures, map restrictions and staff clarifications.

## Legal/support pages

The substantive content in these pages was preserved:

- `monetization.html`
- `support-terms.html`
- `privacy.html`

Their navigation, metadata and footer were updated to match the refreshed site.
