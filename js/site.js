(() => {
  const header = document.querySelector('[data-header]');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');

  const updateHeader = () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 18);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const open = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
      document.body.classList.toggle('nav-open', !open);
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      document.body.classList.remove('nav-open');
    }));
  }

  document.querySelectorAll('[data-current-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  const ranks = [
    { threshold: 20, name: 'Amethyst' },
    { threshold: 50, name: 'Jade' },
    { threshold: 100, name: 'Amber' },
    { threshold: 150, name: 'Ruby' },
    { threshold: 250, name: 'Iolite' },
    { threshold: 500, name: 'Turquoise' },
    { threshold: 1000, name: 'Aquamarine' },
    { threshold: 2000, name: 'Diamond' }
  ];
  const money = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' });
  const integer = new Intl.NumberFormat('en-GB', { maximumFractionDigits: 0 });

  const calculator = document.querySelector('[data-support-calculator]');
  if (calculator) {
    const currentInput = calculator.querySelector('#current-total');
    const amountInput = calculator.querySelector('#purchase-amount');
    const rankOutput = document.querySelector('[data-new-rank]');
    const tokenOutput = document.querySelector('[data-token-result]');
    const totalOutput = document.querySelector('[data-total-result]');
    const pqOutput = document.querySelector('[data-pq-result]');
    const unlocksOutput = document.querySelector('[data-unlocks-result]');

    const update = () => {
      const current = Math.max(0, Number.parseFloat(currentInput.value) || 0);
      const amount = Math.max(0, Number.parseFloat(amountInput.value) || 0);
      const total = current + amount;
      const currentRank = [...ranks].reverse().find((rank) => current >= rank.threshold);
      const newRank = [...ranks].reverse().find((rank) => total >= rank.threshold);
      const crossed = ranks.filter((rank) => current < rank.threshold && total >= rank.threshold).map((rank) => rank.name);
      rankOutput.textContent = newRank ? newRank.name : 'No rank yet';
      tokenOutput.textContent = integer.format(Math.floor(amount * 100));
      totalOutput.textContent = money.format(total);
      pqOutput.textContent = amount >= 20 ? '30 days' : 'None';
      unlocksOutput.textContent = crossed.length ? crossed.join(', ') : (currentRank ? 'No new threshold' : 'None');
    };
    currentInput.addEventListener('input', update);
    amountInput.addEventListener('input', update);
    update();
  }

  const builder = document.querySelector('[data-agreement-builder]');
  if (builder) {
    const discord = builder.querySelector('[data-agreement-discord]');
    const steam = builder.querySelector('[data-agreement-steam]');
    const current = builder.querySelector('[data-agreement-current]');
    const amount = builder.querySelector('[data-agreement-amount]');
    const method = builder.querySelector('[data-agreement-method]');
    const checks = [...builder.querySelectorAll('[data-agreement-check]')];
    const button = builder.querySelector('[data-build-agreement]');
    const outputWrap = document.querySelector('[data-agreement-output-wrap]');
    const output = document.querySelector('[data-agreement-output]');
    const copy = document.querySelector('[data-copy-agreement]');
    const copyStatus = document.querySelector('[data-copy-status]');

    const valid = () => {
      const discordValid = /^\d{15,22}$/.test(discord.value.trim());
      const steamValid = /^7656119\d{10}$/.test(steam.value.trim());
      const currentValid = Number.parseFloat(current.value) >= 0;
      const amountValid = Number.parseFloat(amount.value) > 0;
      const methodValid = method.value.trim().length > 0;
      button.disabled = !(discordValid && steamValid && currentValid && amountValid && methodValid && checks.every((check) => check.checked));
    };
    [discord, steam, current, amount, method, ...checks].forEach((control) => control.addEventListener('input', valid));
    checks.forEach((control) => control.addEventListener('change', valid));

    button.addEventListener('click', () => {
      const currentTotal = Math.max(0, Number.parseFloat(current.value) || 0);
      const purchaseAmount = Number.parseFloat(amount.value);
      const newTotal = currentTotal + purchaseAmount;
      const newRank = [...ranks].reverse().find((rank) => newTotal >= rank.threshold);
      const crossed = ranks.filter((rank) => currentTotal < rank.threshold && newTotal >= rank.threshold).map((rank) => rank.name);
      const timestamp = new Date().toISOString();
      const acknowledgementId = `HS-ACK-${timestamp.slice(0,10).replaceAll('-', '')}-${Math.random().toString(36).slice(2,8).toUpperCase()}`;
      output.value = [
        'HACKSAW SUPPORT PURCHASE CONFIRMATION',
        `Acknowledgement ID: ${acknowledgementId}`,
        `Terms version: 2026-07-24`,
        `Confirmation generated: ${timestamp}`,
        `Discord user ID: ${discord.value.trim()}`,
        `Steam ID64: ${steam.value.trim()}`,
        `Payment method: ${method.value}`,
        `Current net Lifetime Support Total: ${money.format(currentTotal)}`,
        `Intended support purchase: ${money.format(purchaseAmount)}`,
        `Expected new Lifetime Support Total: ${money.format(newTotal)}`,
        `Expected supporter rank: ${newRank ? newRank.name : 'No rank yet'}`,
        `Newly crossed thresholds: ${crossed.length ? crossed.join(', ') : 'none'}`,
        `Expected HS Tokens: ${integer.format(Math.floor(purchaseAmount * 100))}`,
        `Priority Queue from this purchase: ${purchaseAmount >= 20 ? '30 days' : 'none'}`,
        '',
        'I confirm that:',
        '1. Hacksaw is independently operated and is not owned, operated or managed by Bohemia Interactive and is not an official Bohemia Interactive server or service.',
        '2. This is a purchase of digital cosmetic/non-gameplay benefits, not a charitable donation.',
        '3. I reviewed the support benefits, cumulative rank thresholds and Support Terms before paying.',
        '4. The Discord and Steam IDs above identify the account that should receive the digital benefits.',
        '5. I request immediate delivery of the digital benefits after confirmed payment.',
        '6. I understand that refunds and payment reversals reduce my net Lifetime Support Total and may result in related benefits being removed or adjusted.'
      ].join('\n');
      outputWrap.hidden = false;
      output.focus();
      outputWrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(output.value);
        copyStatus.textContent = 'Copied. Paste this into the Discord ticket before paying.';
      } catch (error) {
        output.select();
        document.execCommand('copy');
        copyStatus.textContent = 'Copied. Paste this into the Discord ticket before paying.';
      }
    });
  }
})();
