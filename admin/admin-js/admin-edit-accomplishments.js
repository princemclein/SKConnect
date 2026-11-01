const accomplishments = {
  1: {
    title: "Interpurok-Basketball-League",
    category: "Sports",
    completionDate: "2025-12-07",
    location: "Barangay Sta. Rita",
    description:
      "A youth sports initiative organized by the Sangguniang Kabataan of Barangay Sta. Rita to promote sportsmanship, teamwork, and community participation through an inter-purok basketball competition.",
    report:
      "The Inter-Purok Basketball League 2025 brought teams from different puroks together through friendly competition and active youth participation. The league concluded on December 7, 2025, with Purok 6E crowned champion.",
    image: "../assets/images/accomplishment/inter-purok.png",
  },
  2: {
    title: "Clean-Up-Drive",
    category: "Environment",
    completionDate: "2026-10-10",
    location: "Barangay Sta. Rita",
    description:
      "A community clean-up drive led by the Sangguniang Kabataan of Barangay Sta. Rita, held in waves to keep the barangay clean and safe.",
    report:
      "The project was conducted in two waves. The first wave supported Olongapo City's Citywide Coastal Clean-Up Drive on September 19, 2026, and the second wave joined the Barangay at Kalinisan Day activity on October 10, 2026.",
    image: "../assets/images/accomplishment/clean-up-drive.png",
  },
  3: {
    title: "Ikatlong Yugto ng Balagtasan",
    category: "Culture and arts",
    completionDate: "2026-08-21",
    location: "Barangay Sta. Rita",
    description:
      "A youth debate contest on Sipag o Talino for secondary and college students, organized by the Sangguniang Kabataan of Barangay Sta. Rita.",
    report:
      "Ikatlong Yugto ng Balagtasan was held on August 21, 2026, under the theme Boses ng Kabataan: Boses ng Bayan. Twelve groups participated in the contest, which highlighted the value of both hard work and intelligence.",
    image: "../assets/images/accomplishment/balagtasan.png",
  },
};

const adminSidebar = document.getElementById("admin-sidebar");
const adminMenuToggle = document.querySelector(".admin-menu-toggle");
const accomplishmentForm = document.getElementById("accomplishment-form");
const imageInput = document.getElementById("images");
const imagePreview = document.getElementById("image-preview");
const formStatus = document.getElementById("form-status");
const accomplishmentId = new URLSearchParams(window.location.search).get("id");
const accomplishment = accomplishments[accomplishmentId];

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

function showImagePreview(src, alt) {
  const previewImage = document.createElement("img");
  previewImage.src = src;
  previewImage.alt = alt;
  imagePreview.appendChild(previewImage);
}

if (accomplishment) {
  document.getElementById("title").value = accomplishment.title;
  document.getElementById("category").value = accomplishment.category;
  document.getElementById("completion-date").value = accomplishment.completionDate;
  document.getElementById("location").value = accomplishment.location;
  document.getElementById("description").value = accomplishment.description;
  document.getElementById("report").value = accomplishment.report;
  showImagePreview(accomplishment.image, `${accomplishment.title} current image`);
} else {
  formStatus.hidden = false;
  formStatus.textContent =
    "Select an accomplishment from the management page to load its details for editing.";
  accomplishmentForm.querySelector("button[type='submit']").disabled = true;
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
    "This form is ready for backend integration. No changes were saved because persistence is not connected yet.";
});