document.querySelectorAll(".gallery-wrapper").forEach((gallery) => {
  const track = gallery.querySelector(".gallery-track");
  const previous = gallery.querySelector(".gallery-arrow.prev");
  const next = gallery.querySelector(".gallery-arrow.next");

  if (!track || !previous || !next) {
    return;
  }

  const updateButtons = () => {
    const atStart = track.scrollLeft <= 1;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;

    previous.disabled = atStart;
    next.disabled = atEnd;
    previous.setAttribute(
      "aria-label",
      atStart ? "Previous image, at start of gallery" : "Previous image",
    );
    next.setAttribute(
      "aria-label",
      atEnd ? "Next image, at end of gallery" : "Next image",
    );
  };

  const scrollGallery = (direction) => {
    const image = track.querySelector("figure");
    const distance = image ? image.getBoundingClientRect().width + 16 : track.clientWidth;

    track.scrollBy({
      left: direction * distance,
      behavior: "smooth",
    });
  };

  previous.addEventListener("click", () => scrollGallery(-1));
  next.addEventListener("click", () => scrollGallery(1));
  track.addEventListener("scroll", updateButtons, { passive: true });
  window.addEventListener("resize", updateButtons);
  window.addEventListener("load", updateButtons);
  updateButtons();
});
