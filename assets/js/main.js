/* ==========================================================================
   STACKLY - MAIN APPLICATION SCRIPT
   Common Header/Footer Injector, Logo WebP Image, Form Validation & Router
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  injectCommonHeaderNav();
  injectCommonFooter();
  initFormValidation();
  initUnrelatedLinkRouter();
  initScrollAnimations();
});

/* --------------------------------------------------------------------------
   Preloader Control
   -------------------------------------------------------------------------- */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const progressBar = document.querySelector('.loader-progress');
  
  if (!preloader) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 25) + 15;
    if (progressBar) progressBar.style.width = Math.min(progress, 100) + '%';
    
    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        preloader.classList.add('loaded');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500);
      }, 200);
    }
  }, 80);
}

/* --------------------------------------------------------------------------
   Common Header Navigation Injector (Uses WebP Logo Image from assets/images/logo.webp)
   -------------------------------------------------------------------------- */
function injectCommonHeaderNav() {
  const navPlaceholder = document.getElementById('common-header');
  if (!navPlaceholder) return;

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  const navHTML = `
    <header class="header-nav" id="mainHeader">
      <div class="nav-container">
        <a href="index.html" class="brand-logo">
          <img src="assets/images/logo.webp" alt="Stackly Logo" class="brand-logo-img">
          <span>STACK<span class="gradient-text">LY</span></span>
        </a>

        <nav class="nav-menu">
          <a href="index.html" class="nav-link ${currentPage === 'index.html' || currentPage === '' ? 'active' : ''}">Home</a>
          <a href="diagnostics.html" class="nav-link ${currentPage === 'diagnostics.html' ? 'active' : ''}">Diagnostics</a>
          <a href="about.html" class="nav-link ${currentPage === 'about.html' ? 'active' : ''}">About Us</a>
          <a href="resources.html" class="nav-link ${currentPage === 'resources.html' ? 'active' : ''}">Resources</a>
          <a href="careers.html" class="nav-link ${currentPage === 'careers.html' ? 'active' : ''}">Careers</a>
        </nav>

        <div class="nav-actions">
          <a href="contact.html" class="btn btn-secondary">Contact Us</a>
          <a href="login.html" class="btn btn-primary">
            <span>Login / Access</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a href="signup.html" class="btn btn-outline-teal">Sign Up</a>
        </div>

        <button class="mobile-toggle" id="mobileToggle" aria-label="Toggle Menu">
          <i class="fa-solid fa-bars-staggered"></i>
        </button>
      </div>
    </header>

    <!-- Mobile Drawer -->
    <div class="mobile-menu" id="mobileMenu">
      <button class="mobile-close" id="mobileClose">&times;</button>
      <a href="index.html" class="brand-logo" style="margin-bottom: 20px;">
        <img src="assets/images/logo.webp" alt="Stackly Logo" class="brand-logo-img">
        <span>STACK<span class="gradient-text">LY</span></span>
      </a>
      <a href="index.html" class="nav-link">Home</a>
      <a href="diagnostics.html" class="nav-link">Diagnostics</a>
      <a href="about.html" class="nav-link">About Us</a>
      <a href="resources.html" class="nav-link">Resources</a>
      <a href="careers.html" class="nav-link">Careers</a>
      <hr style="border-color: var(--glass-border); margin: 10px 0;">
      <a href="contact.html" class="btn btn-secondary" style="width: 100%;">Contact Us</a>
      <a href="login.html" class="btn btn-primary" style="width: 100%;">Login</a>
      <a href="signup.html" class="btn btn-outline-teal" style="width: 100%;">Sign Up</a>
    </div>
  `;

  navPlaceholder.innerHTML = navHTML;

  // Header Scroll Effect
  window.addEventListener('scroll', () => {
    const header = document.getElementById('mainHeader');
    if (header) {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });

  // Mobile Menu Handlers
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileClose = document.getElementById('mobileClose');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => mobileMenu.classList.add('active'));
  }
  if (mobileClose && mobileMenu) {
    mobileClose.addEventListener('click', () => mobileMenu.classList.remove('active'));
  }
}

/* --------------------------------------------------------------------------
   Common Footer Injector (Uses Logo WebP Image)
   -------------------------------------------------------------------------- */
function injectCommonFooter() {
  const footerPlaceholder = document.getElementById('common-footer');
  if (!footerPlaceholder) return;

  const footerHTML = `
    <footer class="footer-main">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-col">
            <a href="index.html" class="brand-logo" style="margin-bottom: 16px; display: inline-flex;">
              <img src="assets/images/logo.webp" alt="Stackly Logo" class="brand-logo-img">
              <span>STACK<span class="gradient-text">LY</span></span>
            </a>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 20px; max-width: 320px;">
              Pioneering non-invasive AI diagnostics, predictive oncology, genomic sequencing, and automated health analytics.
            </p>
            <div style="display: flex; gap: 14px; color: var(--text-muted); font-size: 1.2rem;">
              <a href="404.html"><i class="fa-brands fa-x-twitter"></i></a>
              <a href="404.html"><i class="fa-brands fa-linkedin"></i></a>
              <a href="404.html"><i class="fa-brands fa-github"></i></a>
              <a href="404.html"><i class="fa-brands fa-youtube"></i></a>
            </div>
          </div>

          <div class="footer-col">
            <h4>Quick Links</h4>
            <div class="footer-links">
              <a href="index.html">Home</a>
              <a href="diagnostics.html">Diagnostics</a>
              <a href="about.html">About Us</a>
              <a href="resources.html">Resources</a>
              <a href="careers.html">Careers</a>
            </div>
          </div>

          <div class="footer-col">
            <h4>Company</h4>
            <div class="footer-links">
              <a href="about.html">About Stackly</a>
              <a href="about.html">Scientific Board</a>
              <a href="careers.html">Careers <span class="badge badge-info" style="font-size: 0.65rem;">HIRING</span></a>
              <a href="resources.html">Whitepapers</a>
              <a href="contact.html">Press & Media</a>
            </div>
          </div>

          <div class="footer-col">
            <h4>Access & Legal</h4>
            <div class="footer-links">
              <a href="login.html">Client Portal</a>
              <a href="login.html">Admin Dashboard</a>
              <a href="signup.html">Register Account</a>
              <a href="404.html">Privacy & HIPAA</a>
              <a href="404.html">Terms of Service</a>
            </div>
          </div>

          <div class="footer-col">
            <h4>Health Dispatch</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 12px;">
              Subscribe to monthly medical research digests and AI clinical updates.
            </p>
            <form class="newsletter-form-common" id="newsletterFormCommon">
              <div class="form-group" style="margin-bottom: 10px;">
                <input type="email" class="form-control" placeholder="Enter clinical email" required>
                <div class="error-msg">Please enter a valid work email.</div>
              </div>
              <button type="submit" class="btn btn-primary" style="width: 100%; font-size: 0.85rem; padding: 12px 16px;">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div class="footer-bottom">
          <div>&copy; 2026 Stackly AI Healthcare Inc. All rights reserved.</div>
          <div style="display: flex; gap: 20px;">
            <a href="404.html">Security Policy</a>
            <a href="404.html">System Status</a>
            <a href="404.html">Cookie Preferences</a>
          </div>
        </div>
      </div>
    </footer>
  `;

  footerPlaceholder.innerHTML = footerHTML;
}

/* --------------------------------------------------------------------------
   Global Form Validation (Redirects to 404.html AFTER valid inputs)
   -------------------------------------------------------------------------- */
function initFormValidation() {
  document.addEventListener('submit', (e) => {
    const form = e.target;
    
    if (form.id === 'signupMainForm') return;

    if (form.tagName === 'FORM') {
      e.preventDefault();
      
      let isValid = true;
      const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('is-invalid');
        } else if (input.type === 'email' && !validateEmail(input.value)) {
          isValid = false;
          input.classList.add('is-invalid');
        } else {
          input.classList.remove('is-invalid');
        }
      });

      if (isValid) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = 'Processing...';
        }
        
        setTimeout(() => {
          window.location.href = '404.html?submitted=true';
        }, 800);
      }
    }
  });

  document.addEventListener('input', (e) => {
    if (e.target.classList.contains('is-invalid')) {
      e.target.classList.remove('is-invalid');
    }
  });
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* --------------------------------------------------------------------------
   Unrelated Link & Dummy Button Router -> 404.html
   -------------------------------------------------------------------------- */
function initUnrelatedLinkRouter() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');

    if (link.classList.contains('brand-logo') || link.closest('.brand-logo')) {
      e.preventDefault();
      window.location.href = 'index.html';
      return;
    }

    if (href === '#' || href === 'javascript:void(0)' || href === '') {
      e.preventDefault();
      window.location.href = '404.html';
    }
  });
}

function initScrollAnimations() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80
    });
  }
}
