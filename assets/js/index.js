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

  // Handle subscription form
  const subscribeForm = document.querySelector('form[data-members-form="subscribe"]');
  if (subscribeForm) {
    subscribeForm.addEventListener('submit', function(event) {
      const button = subscribeForm.querySelector('button[type="submit"]');
      const buttonText = button.querySelector('.btn-text');
      const buttonArrow = button.querySelector('.btn-arrow');
      const originalText = buttonText.textContent;

      // Create spinner element
      const spinner = document.createElement('span');
      spinner.classList.add('btn-spinner');
      spinner.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin w-5 h-5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>';

      // Show loading state
      buttonText.textContent = 'Subscribing';
      button.disabled = true;
      buttonArrow.style.display = 'none';
      button.classList.add('loading');
      button.appendChild(spinner);

      // Monitor for success/error messages from Ghost's form handler
      const checkForSuccess = setInterval(function() {
        const success = subscribeForm.querySelector('[data-members-success]');
        const error = subscribeForm.querySelector('[data-members-error]');

        if (success && !success.classList.contains('hidden')) {
          clearInterval(checkForSuccess);
          redirectToCheckEmail();
        }

        if (error && !error.classList.contains('hidden')) {
          clearInterval(checkForSuccess);
          handleError();
        }
      }, 100);

      function redirectToCheckEmail() {
        window.location.href = '/check-email/';
      }

      function handleError() {
        button.disabled = false;
        buttonText.textContent = originalText;
        buttonArrow.style.display = '';
        button.classList.remove('loading');
        const spinnerElement = button.querySelector('.btn-spinner');
        if (spinnerElement) spinnerElement.remove();
      }
    });
  }
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
