// JavaScript files are compiled and minified during the build process to the assets/built folder. See available scripts in the package.json file.

// Import JS
import infiniteScroll from "./infiniteScroll";
import mediumZoom from "medium-zoom";

// Scroll reveal animation
function setupScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry, index) {
      if (entry.isIntersecting) {
        // Stagger timing based on element position
        const delay = Array.from(reveals).indexOf(entry.target) % 3 * 100;
        setTimeout(function() {
          entry.target.classList.add('revealed');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(function(el) {
    observer.observe(el);
  });
}

// Hide pagination when JS is enabled (since we're using infinite scroll)
document.addEventListener('DOMContentLoaded', function() {
  const pagination = document.querySelector('.gh-pagination:not(noscript .gh-pagination)');
  if (pagination) {
    pagination.style.display = 'none';
  }

  // Set up scroll reveal
  setupScrollReveal();

  // Handle subscription forms (Ghost Portal adds 'success'/'error' classes to the form)
  document.querySelectorAll('form[data-members-form="subscribe"]').forEach(function(form) {
    var button = form.querySelector('button[type="submit"]');
    var buttonText = button.querySelector('.btn-text');
    var buttonArrow = button.querySelector('.btn-arrow');
    var originalText = button.textContent.trim();

    form.addEventListener('submit', function() {
      button.disabled = true;
      if (buttonText) {
        originalText = buttonText.textContent;
        buttonText.textContent = 'Subscribing';
      } else {
        originalText = button.textContent.trim();
        button.textContent = 'Subscribing…';
      }
      if (buttonArrow) buttonArrow.style.display = 'none';
    });

    // Watch for Portal's success/error classes on the form
    var observer = new MutationObserver(function() {
      if (form.classList.contains('success')) {
        observer.disconnect();
        window.location.href = '/check-email/';
      }
      if (form.classList.contains('error')) {
        observer.disconnect();
        button.disabled = false;
        if (buttonText) {
          buttonText.textContent = originalText;
        } else {
          button.textContent = originalText;
        }
        if (buttonArrow) buttonArrow.style.display = '';
        // Portal already writes the error message into [data-members-error]
        var errorEl = form.querySelector('[data-members-error]');
        if (errorEl) errorEl.classList.remove('hidden');
      }
    });
    observer.observe(form, { attributes: true, attributeFilter: ['class'] });
  });
});

// Call the menu and infinite scroll functions
infiniteScroll(function() {
  // Re-run scroll reveal after infinite scroll appends new cards
  setupScrollReveal();
});

mediumZoom('.prose img, .cover', {
  background: '#0A0A0A',
  margin: 0
})
