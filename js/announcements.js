const announcementGrid = document.getElementById("announcement-grid");

if (announcementGrid) {
  const cards = Array.from(
    announcementGrid.querySelectorAll(".announcement-card"),
  );
  const filterButtons = document.querySelectorAll(".filter-btn");
  const pagination = document.getElementById("pagination");
  const resultsCount = document.getElementById("results-count");
  const emptyState = document.getElementById("empty-state");
  const resetFilter = document.getElementById("reset-filter");

  const cardsPerPage = 6;
  let currentPage = 1;
  let activeCategory = "All";

  function renderAnnouncements() {
    const filteredCards = cards.filter((card) => {
      return (
        activeCategory === "All" || card.dataset.category === activeCategory
      );
    });

    const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
    currentPage = Math.min(currentPage, Math.max(totalPages, 1));

    const start = (currentPage - 1) * cardsPerPage;
    const end = start + cardsPerPage;

    cards.forEach((card) => {
      card.hidden = !filteredCards.slice(start, end).includes(card);
    });

    if (resultsCount) {
      resultsCount.textContent = `${filteredCards.length} announcement${filteredCards.length === 1 ? "" : "s"} found`;
    }

    if (emptyState) {
      emptyState.hidden = filteredCards.length > 0;
    }

    pagination.hidden = totalPages <= 1;
    pagination.replaceChildren();

    if (totalPages <= 1) return;

    function createButton(label, page, disabled = false, current = false) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "page-btn";
      button.textContent = label;
      button.disabled = disabled;

      if (current) {
        button.setAttribute("aria-current", "page");
      }

      button.addEventListener("click", () => {
        currentPage = page;
        renderAnnouncements();
        document.getElementById("filter-bar")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });

      pagination.appendChild(button);
    }

    createButton("Previous", currentPage - 1, currentPage === 1);

    for (let page = 1; page <= totalPages; page++) {
      createButton(String(page), page, false, page === currentPage);
    }

    createButton("Next", currentPage + 1, currentPage === totalPages);
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;
      currentPage = 1;

      filterButtons.forEach((item) => {
        item.setAttribute("aria-pressed", String(item === button));
      });

      renderAnnouncements();
    });
  });

  resetFilter?.addEventListener("click", () => {
    activeCategory = "All";
    currentPage = 1;

    filterButtons.forEach((button) => {
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.category === "All"),
      );
    });

    renderAnnouncements();
  });

  renderAnnouncements();
}
