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

  document.querySelectorAll('[data-current-year]').forEach((element) => {
    element.textContent = new Date().getFullYear();
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

  const money = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP'
  });
  const integer = new Intl.NumberFormat('en-GB', { maximumFractionDigits: 0 });

  const calculator = document.querySelector('[data-support-calculator]');
  if (calculator) {
    const currentInput = calculator.querySelector('#current-total');
    const amountInput = calculator.querySelector('#purchase-amount');
    const rankOutput = calculator.querySelector('[data-new-rank]');
    const tokenOutput = calculator.querySelector('[data-token-result]');
    const totalOutput = calculator.querySelector('[data-total-result]');
    const pqOutput = calculator.querySelector('[data-pq-result]');
    const unlocksOutput = calculator.querySelector('[data-unlocks-result]');

    const updateCalculator = () => {
      const current = Math.max(0, Number.parseFloat(currentInput.value) || 0);
      const amount = Math.max(0, Number.parseFloat(amountInput.value) || 0);
      const total = current + amount;
      const currentRank = [...ranks].reverse().find((rank) => current >= rank.threshold);
      const newRank = [...ranks].reverse().find((rank) => total >= rank.threshold);
      const crossed = ranks
        .filter((rank) => current < rank.threshold && total >= rank.threshold)
        .map((rank) => rank.name);

      rankOutput.textContent = newRank ? newRank.name : 'No rank yet';
      tokenOutput.textContent = integer.format(Math.floor(amount * 100));
      totalOutput.textContent = money.format(total);
      pqOutput.textContent = amount >= 20 ? '30 days added' : 'No PQ from this contribution';
      unlocksOutput.textContent = crossed.length
        ? crossed.join(', ')
        : (currentRank ? 'No new threshold' : 'None');
    };

    currentInput.addEventListener('input', updateCalculator);
    amountInput.addEventListener('input', updateCalculator);
    updateCalculator();
  }

  document.querySelectorAll('[data-world-switcher]').forEach((switcher) => {
    const tabs = [...switcher.querySelectorAll('[data-world-tab]')];
    const panels = [...switcher.querySelectorAll('[data-world-panel]')];

    const activateWorld = (target, focusTab = false) => {
      tabs.forEach((tab) => {
        const active = tab.dataset.worldTab === target;
        tab.classList.toggle('is-active', active);
        tab.setAttribute('aria-selected', String(active));
        tab.setAttribute('tabindex', active ? '0' : '-1');
        if (active && focusTab) tab.focus();
      });

      panels.forEach((panel) => {
        const active = panel.dataset.worldPanel === target;
        panel.hidden = !active;
        panel.classList.toggle('is-active', active);
        panel.setAttribute('aria-hidden', String(!active));
      });
    };

    const initialTab = tabs.find((tab) => tab.getAttribute('aria-selected') === 'true') || tabs[0];
    if (initialTab) activateWorld(initialTab.dataset.worldTab);

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activateWorld(tab.dataset.worldTab));
      tab.addEventListener('keydown', (event) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();

        let nextIndex = index;
        if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = tabs.length - 1;

        activateWorld(tabs[nextIndex].dataset.worldTab, true);
      });
    });
  });

  const hashTarget = window.location.hash ? document.querySelector(window.location.hash) : null;
  if (hashTarget && hashTarget.tagName === 'DETAILS') {
    hashTarget.open = true;
  }
})();
