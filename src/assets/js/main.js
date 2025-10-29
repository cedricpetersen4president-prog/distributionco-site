document.addEventListener("DOMContentLoaded", () => {
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
  const currentPage =
    window.location.pathname.split("/").pop().split(".")[0] || "index";
  navLinks.forEach((link) => {
    if (link.dataset.page === currentPage) {
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
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add("opacity-0");
      setTimeout(() => {
        loadingScreen.style.display = "none";
      }, 500);
    }, 4000);
  }
});
