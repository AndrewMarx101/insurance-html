// preload.js

window.addEventListener("DOMContentLoaded", () => {
  // Default page
  const defaultPage = "landing.html";

  // Load the default page into #app
  loadPage(defaultPage);

  // Set initial history state
  history.replaceState({ page: defaultPage }, "", defaultPage);

  // Setup navigation clicks
  setupNav();

  // Preload other pages
  preloadPages([
    "landing.html",
    "longTerm.html",
    "shortTerm.html",
    "contact.html",
    "about.html",
    "faq.html"
  ]);
});

// Fetch and inject page into #app
async function loadPage(url) {
  try {
    const res = await fetch(url);
    const html = await res.text();
    document.getElementById("app").innerHTML = html;

    // Bind all page-specific scripts to the newly loaded content
    initPageScripts();

  } catch (err) {
    document.getElementById("app").innerHTML = "<p>Error loading page.</p>";
    console.error("Page load error:", err);
  }
}


// Handle nav clicks
function setupNav() {
  document.querySelectorAll("#navMenu a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const page = link.getAttribute("href");
      loadPage(page);
      history.pushState({ page }, "", page); // updates URL without reload
    });
  });

  // Handle browser back/forward
  window.addEventListener("popstate", e => {
    if (e.state && e.state.page) {
      loadPage(e.state.page);
    }
  });
}



// Preload pages (cached by browser)
async function preloadPages(pages) {
  for (const page of pages) {
    fetch(page);
  }
}



function initPageScripts() {
  // FAQ toggle
  document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
      const item = button.parentElement;
      item.classList.toggle("active");
    });
  });

  // Hero button
  const quoteBtn = document.querySelector(".hero .btn-primary");
  if (quoteBtn) {
    quoteBtn.addEventListener("click", e => {
      e.preventDefault();
      alert("Get a Quote clicked!");
    });
  }

  // Popup
  const popup = document.getElementById("quotePopup");
  const openBtn = document.querySelector(".cta .btn-primary");
  const closeBtn = document.querySelector(".close-btn");
  if (popup && openBtn && closeBtn) {
    openBtn.addEventListener("click", e => {
      e.preventDefault();
      popup.style.display = "flex";
    });

    closeBtn.addEventListener("click", () => {
      popup.style.display = "none";
    });

    window.addEventListener("click", e => {
      if (e.target === popup) {
        popup.style.display = "none";
      }
    });
  }

  // Hamburger
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });
  }

  // Form submission
  const quoteForm = document.getElementById("quoteForm");
  if (quoteForm) {
    $(quoteForm).off("submit").on("submit", async function(e) {
      e.preventDefault();

      const $form = $(this);
      const formData = {
        name: $form.find('#name').val(),
        email: $form.find('#email').val(),
        message: $form.find('#details').val(),
        insuranceType: $form.find('#insurance').val()
      };

      if (!formData.name || !formData.email || !formData.insuranceType) {
        alert("Please fill out all required fields.");
        return;
      }

      try {
        const response = await fetch("https://localhost:7233/api/quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
          alert(result.responseMessage || "Quote submitted successfully!");
          $('#quotePopup').fadeOut();
          $form[0].reset();
        } else {
          alert(result.responseMessage || "Failed to submit quote.");
        }

      } catch (err) {
        console.error(err);
        alert("Error sending request: " + err);
      }
    });
  }
}





