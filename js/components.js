/* ============================================================
   Magic Materials — Shared Components
   Injects nav + footer and handles interactive elements
   ============================================================ */

const NAV_HTML = `
<div class="nav-inner">
  <a href="/index.html" class="nav-logo">Magic <span>Materials</span></a>
  <button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu">
    <span></span><span></span><span></span>
  </button>
  <ul class="nav-links" id="nav-links">
    <li><a href="/material.html" class="nav-link" data-page="material">The Material</a></li>
    <li><a href="/products.html" class="nav-link" data-page="products">Samples</a></li>
    <li><a href="/partners.html" class="nav-link" data-page="partners">Work With Us</a></li>
    <li><a href="/certifications.html" class="nav-link" data-page="certifications">Certifications</a></li>
    <li><a href="/about.html" class="nav-link" data-page="about">About</a></li>
    <li><a href="/contact.html" class="nav-cta">Get in Touch</a></li>
  </ul>
</div>`;

const FOOTER_HTML = `
<div class="container">
  <div class="footer-inner">
    <div class="footer-brand">
      <div class="footer-logo">Magic <span>Materials</span></div>
      <p>The first marine-biodegradable oral care material — built for brand partnerships.<br><br>Powered by Magic Materials PHA/PHB · A brand of ILB Biosciences</p>
    </div>
    <div class="footer-col">
      <h4>The Science</h4>
      <a href="/material.html">The Material</a>
      <a href="/certifications.html">Certifications</a>
      <a href="/products.html">Products</a>
    </div>
    <div class="footer-col">
      <h4>Partnership</h4>
      <a href="/partners.html">Partner Program</a>
      <a href="/contact.html">Get in Touch</a>
    </div>
    <div class="footer-col">
      <h4>Company</h4>
      <a href="/about.html">About</a>
      <a href="mailto:jon@magicmaterials.com">Contact</a>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2026 ILB Biosciences. All rights reserved.</span>
    <span>Magic Materials PHA/PHB is a trademark of ILB Biosciences. Certifications in progress — <a href="/certifications.html" style="color:var(--seafoam)">see current status</a>.</span>
  </div>
</div>`;

document.addEventListener('DOMContentLoaded', function () {

  /* ── Inject nav ─────────────────────────────────────── */
  const navEl = document.getElementById('nav');
  if (navEl) navEl.innerHTML = NAV_HTML;

  /* ── Inject footer ──────────────────────────────────── */
  const footerEl = document.getElementById('footer');
  if (footerEl) footerEl.innerHTML = FOOTER_HTML;

  /* ── Active nav highlight ───────────────────────────── */
  const page = (window.location.pathname.split('/').pop() || 'index.html').replace('.html', '');
  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    if (link.dataset.page === page) link.classList.add('active');
  });

  /* ── Mobile menu toggle ─────────────────────────────── */
  document.addEventListener('click', function (e) {
    const toggle = document.getElementById('nav-toggle');
    const links  = document.getElementById('nav-links');
    if (!toggle || !links) return;
    if (toggle.contains(e.target)) {
      links.classList.toggle('open');
    } else if (!links.contains(e.target)) {
      links.classList.remove('open');
    }
  });

  /* ── FAQ accordion ──────────────────────────────────── */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', function () {
      const answer = this.nextElementSibling;
      const isOpen = answer.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-a.open').forEach(a => a.classList.remove('open'));
      document.querySelectorAll('.faq-q.open').forEach(b => b.classList.remove('open'));
      // Open this one if it wasn't open
      if (!isOpen) {
        answer.classList.add('open');
        this.classList.add('open');
      }
    });
  });

  /* ── Smooth scroll for anchor links ────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Simple scroll-in animations ───────────────────── */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, .step, .product-card, .cert-card, .founder-card').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity .4s ease, transform .4s ease';
      io.observe(el);
    });
  }
});
