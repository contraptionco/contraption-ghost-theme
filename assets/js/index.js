// JavaScript files are compiled and minified during the build process to the assets/built folder. See available scripts in the package.json file.

// Import JS
import infiniteScroll from "./infiniteScroll";
import mediumZoom from "medium-zoom";

// Dark mode functionality
function setupDarkMode() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
  const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

  // Change the icons inside the button based on previous settings
  if (localStorage.getItem('color-theme') === 'dark' || 
      (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    themeToggleLightIcon.classList.remove('hidden');
  } else {
    document.documentElement.classList.remove('dark');
    themeToggleDarkIcon.classList.remove('hidden');
  }

  themeToggleBtn.addEventListener('click', function() {
    // Toggle icons
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');
    
    // Toggle dark mode class
    if (localStorage.getItem('color-theme')) {
      if (localStorage.getItem('color-theme') === 'light') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
      }
    } else {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
      }
    }
  });
}

// Hide pagination when JS is enabled (since we're using infinite scroll)
document.addEventListener('DOMContentLoaded', function() {
  // Set up dark mode based on browser preference
  setupDarkMode();
  const pagination = document.querySelector('.gh-pagination:not(noscript .gh-pagination)');
  if (pagination) {
    pagination.style.display = 'none';
  }

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

      // Monitor for both success message and XHR response
      const checkForSuccess = setInterval(function() {
        const success = subscribeForm.querySelector('[data-members-success]');
        const error = subscribeForm.querySelector('[data-members-error]');

        // Check for success message
        if (success && !success.classList.contains('hidden')) {
          clearInterval(checkForSuccess);
          redirectToCheckEmail();
        }

        // Check for error
        if (error && !error.classList.contains('hidden')) {
          clearInterval(checkForSuccess);
          handleError();
        }
      }, 100);

      // Listen for the fetch/XHR request that Ghost makes
      const originalFetch = window.fetch;
      window.fetch = async function(...args) {
        const response = await originalFetch(...args);

        // Clone the response so we can check its status
        const clone = response.clone();

        // Check if this is the members API request
        if (args[0].includes('/api/members/send-magic-link') ||
            args[0].includes('/members/api/send-magic-link')) {

          // Check for 201 status (Created - success for magic link)
          if (clone.status === 201) {
            clearInterval(checkForSuccess);
            setTimeout(redirectToCheckEmail, 500);
          }
        }

        return response;
      };

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
infiniteScroll();

mediumZoom('.prose img, .cover', {
  background: '#111111',
  margin: 0
})
