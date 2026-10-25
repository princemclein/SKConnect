// Mobile menu
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.getElementById("nav-menu");
let lockedScrollY = 0;

function setMenu(open) {
  const wasOpen = navMenu.classList.contains("is-open");

  navMenu.classList.toggle("is-open", open);
  navToggle.setAttribute("aria-expanded", open);
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  document.body.classList.toggle("menu-open", open);

  if (open && !wasOpen) {
    lockedScrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${lockedScrollY}px`;
    document.body.style.width = "100%";
  } else if (!open && wasOpen) {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo({
      top: lockedScrollY,
      left: 0,
      behavior: "instant",
    });
  }
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
