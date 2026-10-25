const faqItems = document.querySelectorAll(".faq-item");

function setItem(item, open) {
  item.classList.toggle("is-open", open);
  item
    .querySelector(".faq-trigger")
    .setAttribute("aria-expanded", String(open));
}

faqItems.forEach((item) => {
  item.querySelector(".faq-trigger").addEventListener("click", () => {
    const willOpen = !item.classList.contains("is-open");

    // only one question open at a time
    faqItems.forEach((other) => setItem(other, false));

    setItem(item, willOpen);
  });
});
