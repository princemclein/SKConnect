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
