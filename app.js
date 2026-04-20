/* =========================================
   FastForward Logistics Dashboard — app.js
   ========================================= */

(function () {
  'use strict';

  // ── Theme Toggle ──────────────────────────────────────────
  const html = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    themeIcon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    localStorage.setItem('ff-theme', theme);
  }

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  // Restore saved theme
  const savedTheme = localStorage.getItem('ff-theme');
  if (savedTheme) applyTheme(savedTheme);

  // ── Sidebar Toggle ────────────────────────────────────────
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');

  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  });

  // ── Nav Item Active State ─────────────────────────────────
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // ── Map Filter Buttons ────────────────────────────────────
  document.querySelectorAll('.map-controls .btn-outline').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.map-controls .btn-outline').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // ── Shipment Dot Tooltips ─────────────────────────────────
  const tooltip = document.getElementById('mapTooltip');

  document.querySelectorAll('.shipment-dot').forEach(dot => {
    dot.addEventListener('mouseenter', function (e) {
      tooltip.textContent = this.dataset.info;
      tooltip.style.opacity = '1';
      positionTooltip(e);
    });
    dot.addEventListener('mousemove', positionTooltip);
    dot.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
    });
  });

  function positionTooltip(e) {
    const canvas = document.getElementById('mapCanvas');
    const rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left + 12;
    let y = e.clientY - rect.top - 28;
    if (x + 160 > rect.width) x = e.clientX - rect.left - 170;
    if (y < 0) y = e.clientY - rect.top + 12;
    tooltip.style.left = x + 'px';
    tooltip.style.top  = y + 'px';
  }

  // ── Animated Counter ──────────────────────────────────────
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  // Trigger counters when visible
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.stat-value[data-target]').forEach(el => {
    counterObserver.observe(el);
  });

  // ── Bar Chart ─────────────────────────────────────────────
  const barData = [
    { day: 'Mon', value: 1620 },
    { day: 'Tue', value: 1843 },
    { day: 'Wed', value: 1507 },
    { day: 'Thu', value: 1972 },
    { day: 'Fri', value: 2134 },
    { day: 'Sat', value: 1389 },
    { day: 'Sun', value: 982 },
  ];

  const maxVal = Math.max(...barData.map(d => d.value));
  const barChart = document.getElementById('barChart');

  barData.forEach(d => {
    const col = document.createElement('div');
    col.className = 'bar-col';

    const fill = document.createElement('div');
    fill.className = 'bar-fill';
    fill.dataset.value = d.value.toLocaleString();
    fill.style.height = '0';

    const label = document.createElement('div');
    label.className = 'bar-label';
    label.textContent = d.day;

    col.appendChild(fill);
    col.appendChild(label);
    barChart.appendChild(col);

    // Animate in
    setTimeout(() => {
      fill.style.height = ((d.value / maxVal) * 100) + '%';
    }, 100);
  });

  // ── Staggered Card Entrance ───────────────────────────────
  const cards = document.querySelectorAll('.stat-card, .panel-section, .map-container');
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(16px)';
    card.style.transition = `opacity 0.4s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s`;
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 80 + i * 60);
  });

  // ── Exceptions resolve buttons ────────────────────────────
  document.querySelectorAll('.exceptions-table .btn-outline').forEach(btn => {
    btn.addEventListener('click', function () {
      const row = this.closest('tr');
      row.style.transition = 'opacity 0.4s, transform 0.4s';
      row.style.opacity = '0';
      row.style.transform = 'translateX(20px)';
      setTimeout(() => row.remove(), 420);
    });
  });

})();
