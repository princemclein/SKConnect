const adminSidebar = document.getElementById("admin-sidebar");
const adminMenuToggle = document.querySelector(".admin-menu-toggle");
const settingsForm = document.getElementById("settings-form");
const formStatus = document.getElementById("form-status");
const newPassword = document.getElementById("new-password");
const confirmPassword = document.getElementById("confirm-password");

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

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setSidebarOpen(false);
  });

  window.matchMedia("(min-width: 769px)").addEventListener("change", (event) => {
    if (event.matches) setSidebarOpen(false);
  });
}

settingsForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!settingsForm.checkValidity()) {
    settingsForm.reportValidity();
    return;
  }

  if (newPassword.value !== confirmPassword.value) {
    confirmPassword.setCustomValidity("Passwords do not match.");
    confirmPassword.reportValidity();
    confirmPassword.setCustomValidity("");
    return;
  }

  formStatus.hidden = false;
  formStatus.textContent =
    "This form is ready for backend integration. No settings were saved because persistence is not connected yet.";
});