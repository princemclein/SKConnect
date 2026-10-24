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
