const adminSidebar = document.getElementById("admin-sidebar");
const adminMenuToggle = document.querySelector(".admin-menu-toggle");
const accomplishmentForm = document.getElementById("accomplishment-form");
const imageInput = document.getElementById("images");
const imagePreview = document.getElementById("image-preview");
const formStatus = document.getElementById("form-status");

if (adminSidebar && adminMenuToggle) {
  function setSidebarOpen(open) {
    adminSidebar.classList.toggle("is-open", open);
    adminMenuToggle.setAttribute("aria-expanded", String(open));
    adminMenuToggle.setAttribute(
      "aria-label",
      open ? "Close admin navigation" : "Open admin navigation",
    );
  }

  adminMenuToggle.addEventListener("click", () => {
    setSidebarOpen(!adminSidebar.classList.contains("is-open"));
  });

  adminSidebar.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setSidebarOpen(false));
  });

  document.addEventListener("click", (event) => {
    if (
      adminSidebar.classList.contains("is-open") &&
      !adminSidebar.contains(event.target) &&
      !adminMenuToggle.contains(event.target)
    ) {
      setSidebarOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setSidebarOpen(false);
  });

  window.matchMedia("(min-width: 769px)").addEventListener("change", (event) => {
    if (event.matches) setSidebarOpen(false);
  });
}

imageInput?.addEventListener("change", () => {
  imagePreview.replaceChildren();

  Array.from(imageInput.files).forEach((file) => {
    const previewImage = document.createElement("img");
    previewImage.alt = file.name;
    previewImage.src = URL.createObjectURL(file);
    previewImage.addEventListener(
      "load",
      () => URL.revokeObjectURL(previewImage.src),
      { once: true },
    );
    imagePreview.appendChild(previewImage);
  });
});

accomplishmentForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!accomplishmentForm.checkValidity()) {
    accomplishmentForm.reportValidity();
    return;
  }

  formStatus.hidden = false;
  formStatus.textContent =
    "This form is ready for backend integration. No accomplishment was saved because persistence is not connected yet.";
});