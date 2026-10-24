// Mobile menu
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.getElementById("nav-menu");

function setMenu(open) {
  navMenu.classList.toggle("is-open", open);
  navToggle.setAttribute("aria-expanded", open);
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  document.body.classList.toggle("menu-open", open);
}

navToggle.addEventListener("click", () => {
  setMenu(!navMenu.classList.contains("is-open"));
});

// close after tapping a link
navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

// close with the Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenu(false);
});

// close if the screen grows back to desktop size
window.matchMedia("(min-width: 993px)").addEventListener("change", (e) => {
  if (e.matches) setMenu(false);
});

// close when tapping the dimmed backdrop
document.addEventListener("click", (e) => {
  if (e.target === document.body) setMenu(false);
});

// Hide the header when scrolling down, show it when scrolling up
const siteHeader = document.querySelector(".site-header");
const SCROLL_DELTA = 6; // how many pixels count as a real scroll
let lastScrollY = window.scrollY;
let ticking = false;

function updateHeader() {
  const currentY = Math.max(window.scrollY, 0);
  const menuOpen = document.body.classList.contains("menu-open");

  if (currentY <= siteHeader.offsetHeight || menuOpen) {
    // near the top, or the menu is open: always show
    siteHeader.classList.remove("is-hidden");
    lastScrollY = currentY;
  } else if (Math.abs(currentY - lastScrollY) > SCROLL_DELTA) {
    // scrolling down hides it, scrolling up shows it
    siteHeader.classList.toggle("is-hidden", currentY > lastScrollY);
    lastScrollY = currentY;
  }

  ticking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  },
  { passive: true },
);

// Show a scroll-to-top button after moving away from the top
const scrollTopButton = document.createElement("button");
scrollTopButton.type = "button";
scrollTopButton.className = "scroll-top-button";
scrollTopButton.setAttribute("aria-label", "Scroll to top");
scrollTopButton.title = "Scroll to top";
scrollTopButton.textContent = "\u2191";
document.body.appendChild(scrollTopButton);

function updateScrollTopButton() {
  scrollTopButton.classList.toggle("is-visible", window.scrollY > 300);
}

scrollTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
  });
});

window.addEventListener("scroll", updateScrollTopButton, { passive: true });
updateScrollTopButton();
