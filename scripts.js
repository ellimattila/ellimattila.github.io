// Email Copy Functionality
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("copy-email")
    .addEventListener("click", function (event) {
      event.preventDefault();
      copyEmail("elli.mattila@gmail.com");
    });

  document
    .getElementById("copy-email-contact")
    .addEventListener("click", function (event) {
      event.preventDefault();
      copyEmail("elli.mattila@gmail.com");
    });

  function copyEmail(email) {
    navigator.clipboard.writeText(email).then(
      function () {
        showNotification("Email address copied to clipboard");
      },
      function (err) {
        console.error("Could not copy text: ", err);
      }
    );
  }

  function showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.innerText = message;
    document.body.appendChild(notification);
    setTimeout(function () {
      notification.remove();
    }, 3000);
  }

  // Navigation Highlighting
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("current-page");
    });

    if (current) {
      const activeLink = document.querySelector(
        `.nav-links a[href="#${current}"]`
      );
      if (activeLink) {
        activeLink.classList.add("current-page");
      }
    }
  });

  // Lightbox Functionality
  const lightbox = document.getElementById("lightbox");
  const closeBtn = document.querySelector(".close-lightbox");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const projects = document.querySelectorAll(".project");

  let currentMedia = [];
  let currentIndex = 0;

  projects.forEach((project) => {
    const mediaItems = Array.from(
      project.querySelectorAll("img.project-image, video.project-video")
    );

    mediaItems.forEach((item, index) => {
      item.addEventListener("click", () => {
        currentMedia = mediaItems;
        currentIndex = index;
        showLightbox(item);
      });
    });
  });

  function showLightbox(item) {
    lightbox.style.display = "block";
    const isVideo = item.tagName.toLowerCase() === "video";

    const oldContent = lightbox.querySelector(".lightbox-content");
    if (oldContent) oldContent.remove();

    const newContent = isVideo
      ? createLightboxVideo(item.src)
      : createLightboxImage(item.src);

    lightbox.appendChild(newContent);
  }

  function createLightboxImage(src) {
    const img = document.createElement("img");
    img.className = "lightbox-content";
    img.src = src;
    return img;
  }

  function createLightboxVideo(src) {
    const video = document.createElement("video");
    video.src = src;
    video.controls = true;
    video.autoplay = true;
    video.className = "lightbox-content";
    return video;
  }

  function showNextMedia() {
    currentIndex = (currentIndex + 1) % currentMedia.length;
    showLightbox(currentMedia[currentIndex]);
  }

  function showPrevMedia() {
    currentIndex =
      (currentIndex - 1 + currentMedia.length) % currentMedia.length;
    showLightbox(currentMedia[currentIndex]);
  }

  function stopLightboxVideo() {
    const video = lightbox.querySelector("video.lightbox-content");
    if (video) video.pause();
  }

  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
    stopLightboxVideo();
  });

  nextBtn.addEventListener("click", showNextMedia);
  prevBtn.addEventListener("click", showPrevMedia);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
      stopLightboxVideo();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "block") {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        showNextMedia();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        showPrevMedia();
      } else if (e.key === "Escape") {
        e.preventDefault();
        lightbox.style.display = "none";
        stopLightboxVideo();
      }
    }
  });

  // Image Row Scrolling
  projects.forEach((project) => {
    const imageRow = project.querySelector(".image-row");
    const leftArrow = project.querySelector(".left-arrow");
    const rightArrow = project.querySelector(".right-arrow");

    if (imageRow && leftArrow && rightArrow) {
      const updateArrowVisibility = () => {
        const isScrollable = imageRow.scrollWidth > imageRow.clientWidth;
        const isAtStart = imageRow.scrollLeft === 0;
        const isAtEnd =
          imageRow.scrollLeft + imageRow.clientWidth >= imageRow.scrollWidth;

        if (isScrollable && !isAtStart) {
          leftArrow.style.display = "flex";
        } else {
          leftArrow.style.display = "none";
        }

        if (isScrollable && !isAtEnd) {
          rightArrow.style.display = "flex";
        } else {
          rightArrow.style.display = "none";
        }
      };

      updateArrowVisibility();
      imageRow.addEventListener("scroll", updateArrowVisibility);
      window.addEventListener("resize", updateArrowVisibility);

      leftArrow.addEventListener("click", () => {
        imageRow.scrollBy({
          left: -300,
          behavior: "smooth",
        });
      });

      rightArrow.addEventListener("click", () => {
        imageRow.scrollBy({
          left: 300,
          behavior: "smooth",
        });
      });
    }
  });

  // Scroll Indicator
  const scrollIndicator = document.getElementById("scroll-indicator");
  let scrollIndicatorTimeout;

  scrollIndicatorTimeout = setTimeout(() => {
    scrollIndicator.style.opacity = "1";
  }, 6000);

  window.addEventListener("scroll", () => {
    clearTimeout(scrollIndicatorTimeout);
    scrollIndicator.style.opacity = "0";
  });
});
