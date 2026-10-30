const adminSidebar = document.getElementById("admin-sidebar");
const adminMenuToggle = document.querySelector(".admin-menu-toggle");

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