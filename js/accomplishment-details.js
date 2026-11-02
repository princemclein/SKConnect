document.querySelectorAll(".gallery-wrapper").forEach((gallery) => {
  const track = gallery.querySelector(".gallery-track");
  const previous = gallery.querySelector(".gallery-arrow.prev");
  const next = gallery.querySelector(".gallery-arrow.next");

  if (!track || !previous || !next) {
    return;
  }

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
});
