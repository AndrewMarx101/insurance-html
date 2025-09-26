window.addEventListener("DOMContentLoaded", () => {
  // Start on the landing page
  const defaultShell = "index.html";
  const defaultContent = "landing.html";

  // Preload pages cache
  const pageCache = {};

  // Load the initial page
  loadPage(defaultContent).then(() => {
    // Preload other pages once landing is ready
    preloadPages(Object.keys(routes).filter(p => p !== defaultContent));
  });

  // Setup navigation clicks
  setupNav();

  // Handle refresh / direct URL
   const currentPath = window.location.pathname.split("/").pop();
  if (currentPath && currentPath !== "" && currentPath !== "index.html") {
    // If user reloads on another page, load it instead of landing.html
    loadPage(currentPath);
  }
});

// Route → file map
const routes = {
  "landing.html": "landing.html",
  "commercial.html": "commercial.html",
  "shortTerm.html": "shortTerm.html",
  "contact.html": "contact.html",
  "about.html": "about.html",
  "faq.html": "faq.html"
};

// In-memory cache for pages
const pageCache = {};

// Fetch and inject page into #app
async function loadPage(file) {
  // If already cached, use it
  if (pageCache[file]) {
    document.getElementById("app").innerHTML = pageCache[file];
    initPageScripts();
    return;
  }

  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error(`Failed to fetch ${file}`);
    const html = await res.text();
    document.getElementById("app").innerHTML = html;

    // Cache it
    pageCache[file] = html;

    // Bind page scripts
    initPageScripts();

    // Preload other pages
    // preloadPages(Object.keys(routes).filter(p => p !== file && !pageCache[p]));
  } catch (err) {
    document.getElementById("app").innerHTML = "<p>Error loading page.</p>";
    console.error("Page load error:", err);
  }
}

// Setup navigation clicks
function setupNav() {
  document.querySelectorAll("#navMenu a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const file = link.getAttribute("href"); // e.g., "about.html"
      history.pushState({ page: file }, "", file);
      loadPage(file);
    });
  });

  // Handle browser back/forward
  window.addEventListener("popstate", e => {
    loadPage(e.state?.page || "landing.html");
  });
}

// Preload pages (cached in memory)
async function preloadPages(pages) {
  for (const page of pages) {
    if (!pageCache[page]) {
      try {
        const res = await fetch(page);
        if (res.ok) {
          pageCache[page] = await res.text();
        }
      } catch (err) {
        console.warn("Preload failed:", page);
      }
    }
  }
}
















// Page-specific behaviors
function initPageScripts() {
  // FAQ toggle
  document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
      button.parentElement.classList.toggle("active");
    });
  });

}


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




let index = 0;
function showSlide(i) {

  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");  

  index = (i + slides.length) % slides.length; // loop around
  slider.style.transform = `translateX(-${index * 100}%)`;

}

function Prev()
{
  showSlide(index - 1)
}

function Next()
{
  showSlide(index + 1)
}



