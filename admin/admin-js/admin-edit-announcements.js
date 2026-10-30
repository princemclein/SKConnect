const announcements = {
  1: {
    title: "Check-Consult-Cure",
    category: "Assistance",
    posted: "2026-10-23",
    summary:
      "Distribution of free eyeglasses to qualified youth beneficiaries of Barangay Sta. Rita.",
    description:
      "The Check-Consult-Cure announcement concerns the distribution of free eyeglasses to qualified youth beneficiaries of Barangay Sta. Rita. Contact the SK Council for confirmed schedules, eligibility details, and instructions before visiting.",
    location: "Barangay Sta. Rita Manpower Hall",
    requirements: [
      "Must be a youth resident of Barangay Sta. Rita.",
      "Bring a valid ID or proof of residency.",
      "Complete the beneficiary registration form.",
      "Attend the scheduled eye consultation and screening.",
    ],
    image: "../assets/images/announcement/eye_consult.jpg",
  },
  2: {
    title: "Free Haircut Services",
    category: "Assistance",
    posted: "2026-10-22",
    summary: "Free haircut service for the youth of Barangay Sta. Rita.",
    description:
      "Free haircut service for the youth of Barangay Sta. Rita. The announcement states that walk-ins are welcome on October 28, 2026 at 9:00 AM. Confirm any updated instructions with the SK Council before attending.",
    location: "Barangay Sta. Rita Manpower Hall",
    requirements: [
      "Must be a youth resident of Barangay Sta. Rita.",
      "Bring a valid ID or proof of residency.",
      "Register on-site and follow the queue system.",
      "Services are available while slots and supplies last.",
    ],
    image: "../assets/images/announcement/free_haircut.jpeg",
  },
  3: {
    title: "SK Barangay Employment Program",
    category: "Employment",
    posted: "2026-10-21",
    summary:
      "The Sangguniang Kabataan is opening submissions for the Barangay Employment Program (BEP) 2026.",
    description:
      "The Sangguniang Kabataan is now officially opening the submission for the Barangay Employment Program (BEP) 2026. Contact the SK Office for the official qualifications, requirements, submission procedure, and deadlines.",
    location: "SK Office, Barangay Sta. Rita",
    requirements: [
      "Must be a resident of Barangay Sta. Rita.",
      "Must meet the program's eligible age and employment conditions.",
      "Submit a completed application form.",
      "Submit a valid ID and proof of residency.",
      "Submit a resume or personal information sheet.",
      "Complete any interview or screening required by the SK Office.",
    ],
    image: "../assets/images/announcement/sk_bep.jpg",
  },
  4: {
    title: "Libreng Sakay Year 3",
    category: "Assistance",
    posted: "2026-10-20",
    summary: "Five days of free transportation to support the youth and community.",
    description:
      "The SK Council of Barangay Sta. Rita brings back Libreng Sakay Year 3, offering five days of free transportation to support the youth and community. Confirm the schedule, routes, pick-up points, and program guidelines through official SK announcements.",
    location: "Olongapo City Yellow Jeeps",
    requirements: [
      "Must be an intended youth or community beneficiary of the program.",
      "Present a valid ID or follow the beneficiary verification process.",
      "Use only the designated routes and pick-up points.",
      "Follow the posted schedule and vehicle safety guidelines.",
    ],
    image: "../assets/images/announcement/libreng_sakay.jpg",
  },
  5: {
    title: "Seminar on Creating an Effective Resume",
    category: "Training",
    posted: "2026-10-19",
    summary:
      "Learn how to prepare a professional resume that highlights your skills, qualifications, and experiences.",
    description:
      "Join the Seminar on Creating an Effective Resume to learn how to prepare a professional resume that highlights your skills, qualifications, and experiences. Gain valuable tips to help you stand out and prepare for future job opportunities. Contact the SK Council for confirmed schedule, registration details, and requirements.",
    location: "Barangay Sta. Rita Manpower Hall",
    requirements: [
      "Must be a youth participant or resident of Barangay Sta. Rita.",
      "Complete the registration process, if registration is required.",
      "Bring your education, training, and work experience details.",
      "Bring an existing resume or draft, if available.",
      "Bring a notebook or device for workshop activities.",
    ],
    image: "../assets/images/announcement/seminar_effective_resume.jpeg",
  },
  6: {
    title: "Educational Assistance",
    category: "Education",
    posted: "2026-10-18",
    summary: "Financial support for eligible students to help ease the cost of their education.",
    description:
      "The Educational Assistance Program provides financial support to eligible students to help ease the cost of their education. Contact the SK Council for the official application process, eligibility criteria, required documents, and important dates.",
    location: "Barangay Sta. Rita SK Office",
    requirements: [
      "Must be a student resident of Barangay Sta. Rita.",
      "Submit a completed educational assistance application form.",
      "Submit a valid student ID or certificate of enrollment.",
      "Submit a valid ID and proof of residency.",
      "Provide proof of financial need when requested.",
      "Submit any additional documents required by the SK Council.",
    ],
    image: "../assets/images/announcement/educational_assistance.jpeg",
  },
  7: {
    title: "Amazing Race",
    category: "Event",
    posted: "2026-10-17",
    summary:
      "A team activity featuring challenges, puzzles, teamwork, and friendly competition.",
    description:
      "Join the excitement of Amazing Race, a fun-filled activity where participants take on exciting challenges, solve puzzles, and work together to complete each task. Contact the SK Council for confirmed event details, registration instructions, and participation guidelines.",
    location: "Barangay Sta. Rita Covered Court",
    requirements: [
      "Must be within the event's eligible age range.",
      "Complete the participant or team registration form.",
      "Present a valid ID or proof of residency when requested.",
      "Follow the assigned team, event rules, and safety instructions.",
      "Wear comfortable clothing and closed-toe footwear.",
      "Provide parental consent if required for a minor participant.",
    ],
    image: "../assets/images/announcement/amazing_race.jpeg",
  },
};

const adminSidebar = document.getElementById("admin-sidebar");
const adminMenuToggle = document.querySelector(".admin-menu-toggle");
const announcementForm = document.getElementById("announcement-form");
const formStatus = document.getElementById("form-status");
const imageInput = document.getElementById("images");
const imagePreview = document.getElementById("image-preview");
const announcementId = new URLSearchParams(window.location.search).get("id");
const announcement = announcements[announcementId];

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

if (announcement) {
  document.getElementById("title").value = announcement.title;
  document.getElementById("category").value = announcement.category;
  document.getElementById("posted-date").value = announcement.posted;
  document.getElementById("summary").value = announcement.summary;
  document.getElementById("location").value = announcement.location;
  document.getElementById("description").value = announcement.description;
  document.getElementById("requirements").value = announcement.requirements.join("\n");
  showImagePreview(announcement.image, `${announcement.title} current image`);
} else {
  formStatus.hidden = false;
  formStatus.textContent =
    "Select an announcement from the management page to load its details for editing.";
  announcementForm.querySelector("button[type='submit']").disabled = true;
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

announcementForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!announcementForm.checkValidity()) {
    announcementForm.reportValidity();
    return;
  }

  formStatus.hidden = false;
  formStatus.textContent =
    "Your changes are ready for backend integration. No changes were saved because persistence is not connected yet.";
});
