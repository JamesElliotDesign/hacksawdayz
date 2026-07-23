# Hacksaw DayZ website refresh

This archive contains a modernised static website with consistent supporter-programme wording.

## Key changes

- Reclassifies perk-bearing payments as **digital support purchases**, not donations.
- Sets Amethyst consistently at **£20+**.
- Uses one cumulative rank table: £20, £50, £100, £150, £250, £500, £1,000 and £2,000.
- Defines the **Lifetime Support Total** as net completed purchases after refunds/reversals.
- Adds an independent-server disclosure throughout the site.
- Adds a support calculator and a pre-payment ticket-confirmation generator.
- Adds dedicated Support Terms and Privacy Notice pages.
- Modernises all existing pages and removes reliance on the old Bootstrap/jQuery template at runtime.

## Important evidence limitation

The pre-payment confirmation generator runs only in the player's browser. It does **not** save anything by itself. The player must paste the generated confirmation into a Discord ticket before payment. For stronger evidence, the Discord bot or a checkout backend should save:

- terms version and exact package/rules snapshot;
- Discord user ID and Steam ID64;
- amount, currency, payment provider and transaction ID;
- the confirmation timestamp;
- delivery and subsequent usage records.

## Deployment

The site remains plain static HTML/CSS/JavaScript and can be deployed to Vercel as before. Upload the contents of this directory with `index.html` at the project root.

## Files added

- `css/site.css`
- `js/site.js`
- `support-terms.html`
- `privacy.html`

The old template assets remain in the archive but are no longer loaded by the new pages.

## Review before publishing

- Confirm the five Discord channel links still map to PayPal, Revolut, bank transfer, crypto and Ko-fi.
- Confirm the Discord Server Boost treatment is exactly: one non-stackable £3.50 rank-progress credit, with no tokens or priority queue.
- Confirm higher-rank benefits and custom-skin wording reflect current server operations.
- Have the Support Terms and Privacy Notice reviewed by a UK-qualified professional if they will be relied upon as formal consumer terms.
