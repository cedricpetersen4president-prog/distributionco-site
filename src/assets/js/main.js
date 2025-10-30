document.addEventListener("DOMContentLoaded", () => {
  console.debug("Main JS loaded");

  lucide.createIcons();

  const mobileMenuButton = document.getElementById("mobile-menu-button"),
    closeMenuButton = document.getElementById("close-menu-button"),
    mobileMenu = document.getElementById("mobile-menu");
  const openMenu = () => {
    mobileMenu.classList.remove("translate-x-full");
    document.body.style.overflow = "hidden";
  };
  const closeMenu = () => {
    mobileMenu.classList.add("translate-x-full");
    document.body.style.overflow = "";
  };
  mobileMenuButton.addEventListener("click", openMenu);
  closeMenuButton.addEventListener("click", closeMenu);
  const navLinks = document.querySelectorAll(".nav-link");

  const pageTitle = (document.title || "").split("|").pop().trim();
  const formattedTitle = pageTitle.toLowerCase().replace(/\s+/g, "-");

  const currentPage =
    window.location.pathname.split("/").pop().split(".")[0] || "index";

  navLinks.forEach((link) => {
    if (
      link.dataset.page === formattedTitle ||
      link.dataset.page === currentPage
    ) {
      link.classList.add("active");
    }
  });

  const kpiSection = document.getElementById("kpi-section");
  const kpiData = {
    revenue: 1.5,
    growth: 135,
    map: 100,
    skus: 180,
    marketplaces: 5,
    orders: 130,
  };
  let animationHasRun = false;
  function animateNumber(id, finalValue, duration, formatFn) {
    const element = document.getElementById(id);
    if (!element) return;
    let start = 0,
      stepTime = 16,
      steps = duration / stepTime,
      increment = finalValue / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= finalValue) {
        start = finalValue;
        clearInterval(timer);
      }
      element.textContent = formatFn(start);
    }, stepTime);
  }
  function startKpiAnimation() {
    if (animationHasRun) return;
    animationHasRun = true;
    animateNumber(
      "kpi-revenue",
      kpiData.revenue,
      1500,
      (val) => "$" + val.toFixed(1) + "M"
    );
    animateNumber(
      "kpi-growth",
      kpiData.growth,
      1500,
      (val) => Math.floor(val) + "%"
    );
    animateNumber("kpi-map", kpiData.map, 1500, (val) => Math.floor(val) + "%");
    animateNumber(
      "kpi-skus",
      kpiData.skus,
      1500,
      (val) => Math.floor(val) + "+"
    );
    animateNumber("kpi-marketplaces", kpiData.marketplaces, 1500, (val) =>
      Math.floor(val)
    );
    animateNumber(
      "kpi-orders",
      kpiData.orders,
      1500,
      (val) => Math.floor(val) + "K+"
    );
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startKpiAnimation();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  if (kpiSection) {
    observer.observe(kpiSection);
  }

  // Loading Screen Logic
  const loadingScreen = document.getElementById("loading-screen");
  const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
    const [name, value] = cookie.split("=");
    acc[name] = value;
    return acc;
  }, {});

  const hasSeenLoadingScreen = cookies["loadingScreenShown"] === "true";
  if (hasSeenLoadingScreen) {
    if (loadingScreen) {
      loadingScreen.style.display = "none";
    }
  }

  if (loadingScreen && !hasSeenLoadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add("opacity-0");
      setTimeout(() => {
        loadingScreen.style.display = "none";
      }, 500);
    }, 2000);
    /* set cookie to say loading screen has been shown */
    document.cookie = "loadingScreenShown=true; max-age=31536000; path=/";
  }
  /* End Loading Screen Logic */

  /* Growth Calculator Logic */
  const calculateBtn = document.getElementById("calculate-btn");
  const calculatorDiv = document.getElementById("growth-calculator");
  const resultsDiv = document.getElementById("growth-results");
  const potentialRevenueEl = document.getElementById("potential-revenue");
  const emailModal = document.getElementById("email-modal");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const emailForm = document.getElementById("email-form");

  let calculatedPotential = 0;

  if (calculateBtn) {
    calculateBtn.addEventListener("click", () => {
      const channelSelect = document.getElementById("current-channel");
      const revenueSelect = document.getElementById("monthly-revenue");

      const monthlyRevenue = parseInt(revenueSelect.value, 10);
      const annualRevenue = monthlyRevenue * 12;
      const growthPotential = annualRevenue * 0.4;

      calculatedPotential = growthPotential;

      // Set hidden form values
      document.getElementById("hidden-channel").value =
        channelSelect.options[channelSelect.selectedIndex].text;
      document.getElementById("hidden-revenue").value =
        revenueSelect.options[revenueSelect.selectedIndex].text;

      emailModal.classList.remove("hidden");
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      emailModal.classList.add("hidden");
    });
  }

  if (emailForm) {
    emailForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitButton = emailForm.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      submitButton.textContent = "Submitting...";

      const scriptURL =
        "https://script.google.com/macros/s/AKfycbxWPZDjaAOAEzB1oUvFSzqVaOSKqYdH0byzkhjkbq_mz71N4G7ZK-RAGWJjTVdPiAWN/exec";
      const formData = new FormData(emailForm);

      fetch(scriptURL, { method: "POST", body: formData })
        .then((response) => {
          console.log("Success!", response);
          potentialRevenueEl.textContent = calculatedPotential.toLocaleString(
            "en-US",
            {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }
          );
          emailModal.classList.add("hidden");
          calculatorDiv.classList.add("hidden");
          resultsDiv.classList.remove("hidden");
        })
        .catch((error) => {
          console.error("Error!", error.message);
          alert(
            "There was an error submitting your request. Please try again."
          );
          submitButton.disabled = false;
          submitButton.textContent = "See My Results";
        });
    });
  }
  /* End Growth Calculator Logic */

  /* contact us form */
  const form = document.getElementById("contact-form");
  if (form) {
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      submitButton.disabled = true;
      submitButton.textContent = "Submitting...";
      const formData = new FormData(form);
      const scriptURL =
        "https://script.google.com/macros/s/AKfycbyxnh56YKou6WfB9A89-HLjT0-Mt-OYPy7OmZgkSYglwa0JGOiylYcXwq3M6zhx9z2q/exec";
      fetch(scriptURL, { method: "POST", body: formData })
        .then((response) => {
          console.log("Success!", response);
          submitButton.textContent = "Submitted Successfully!";
          submitButton.classList.remove(
            "bg-brand-gold",
            "hover:bg-brand-gold-dark"
          );
          submitButton.classList.add("bg-green-500");
          form.reset();
          setTimeout(() => {
            submitButton.disabled = false;
            submitButton.textContent = "Submit Inquiry";
            submitButton.classList.remove("bg-green-500");
            submitButton.classList.add(
              "bg-brand-gold",
              "hover:bg-brand-gold-dark"
            );
          }, 5000);
        })
        .catch((error) => {
          console.error("Error!", error.message);
          submitButton.textContent = "Error! Please try again.";
          submitButton.classList.remove(
            "bg-brand-gold",
            "hover:bg-brand-gold-dark"
          );
          submitButton.classList.add("bg-red-500");
          setTimeout(() => {
            submitButton.disabled = false;
            submitButton.textContent = "Submit Inquiry";
            submitButton.classList.remove("bg-red-500");
            submitButton.classList.add(
              "bg-brand-gold",
              "hover:bg-brand-gold-dark"
            );
          }, 5000);
        });
    });
  }
  /* end contact us form */
  /* about us page logic */
  // Intersection Observer for scroll animations
  const about_observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add a delay based on the item's index to stagger the animation
          entry.target.style.transitionDelay = `${index * 100}ms`;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  const beliefCards = document.querySelectorAll(".belief-card");
  beliefCards.forEach((card) => about_observer.observe(card));
  /* End about us page logic */
  console.debug("Main JS initialized");
});
