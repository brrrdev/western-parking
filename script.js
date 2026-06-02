const siteConfig = {
  businessName: "Western Parking",
  initials: "WP",
  tagline: "Saving Your Time One Car at a Time",
  phoneDisplay: "(323) 617-0288",
  phoneHref: "tel:+13236170288",
  email: "westernparkingservices@gmail.com",
  serviceArea: "Serving Los Angeles",
};

const setText = (selector, value) => {
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = value;
  });
};

const setHref = (selector, value) => {
  document.querySelectorAll(selector).forEach((element) => {
    element.setAttribute("href", value);
  });
};

setText("[data-business-name]", siteConfig.businessName);
setText("[data-brand-initials]", siteConfig.initials);
setText("[data-tagline]", siteConfig.tagline);
setText("[data-phone-display]", siteConfig.phoneDisplay);
setText("[data-email-display]", siteConfig.email);
setText("[data-service-area]", siteConfig.serviceArea);
setText("[data-year]", new Date().getFullYear());
setHref("[data-phone-href]", siteConfig.phoneHref);
setHref("[data-email-href]", `mailto:${siteConfig.email}`);

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");

const setMenuState = (isOpen) => {
  header.classList.toggle("menu-visible", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
};

menuToggle.addEventListener("click", () => {
  setMenuState(menuToggle.getAttribute("aria-expanded") !== "true");
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuState(false));
});

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 16);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll("[data-reveal]").forEach((element) => revealObserver.observe(element));

const reviewTrack = document.querySelector("[data-review-track]");
const reviewCards = [...reviewTrack.children];
const previousReview = document.querySelector("[data-review-prev]");
const nextReview = document.querySelector("[data-review-next]");
let reviewIndex = 0;

const visibleReviewCount = () => {
  if (window.innerWidth <= 620) return 1;
  if (window.innerWidth <= 900) return 2;
  return 3;
};

const updateReviewTrack = () => {
  const card = reviewCards[0];
  const gap = Number.parseFloat(getComputedStyle(reviewTrack).gap) || 0;
  const maximumIndex = Math.max(0, reviewCards.length - visibleReviewCount());
  reviewIndex = Math.min(reviewIndex, maximumIndex);
  reviewTrack.style.transform = `translateX(-${reviewIndex * (card.offsetWidth + gap)}px)`;
  previousReview.disabled = reviewIndex === 0;
  nextReview.disabled = reviewIndex === maximumIndex;
};

previousReview.addEventListener("click", () => {
  reviewIndex = Math.max(0, reviewIndex - 1);
  updateReviewTrack();
});

nextReview.addEventListener("click", () => {
  reviewIndex = Math.min(reviewCards.length - visibleReviewCount(), reviewIndex + 1);
  updateReviewTrack();
});

window.addEventListener("resize", updateReviewTrack);
updateReviewTrack();

const quoteForm = document.querySelector("[data-quote-form]");
const formStatus = document.querySelector("[data-form-status]");

quoteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent =
    "Template demo: the form is ready to connect to your preferred inbox, CRM, or form service.";
});
