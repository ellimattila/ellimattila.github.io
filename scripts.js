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
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".close-lightbox");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const projects = document.querySelectorAll(".project");

  let currentImages = [];
  let currentIndex = 0;

  projects.forEach((project) => {
    const images = Array.from(project.querySelectorAll(".scrollable-image"));

    images.forEach((img, index) => {
      img.addEventListener("click", () => {
        currentImages = images;
        currentIndex = index;
        lightbox.style.display = "block";
        lightboxImg.src = img.src;
      });
    });
  });

  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  const showNextImage = () => {
    currentIndex = (currentIndex + 1) % currentImages.length;
    lightboxImg.src = currentImages[currentIndex].src;
  };

  const showPrevImage = () => {
    currentIndex =
      (currentIndex - 1 + currentImages.length) % currentImages.length;
    lightboxImg.src = currentImages[currentIndex].src;
  };

  nextBtn.addEventListener("click", showNextImage);
  prevBtn.addEventListener("click", showPrevImage);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "block") {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        showNextImage();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        showPrevImage();
      } else if (e.key === "Escape") {
        e.preventDefault();
        lightbox.style.display = "none";
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

  setTimeout(() => {
    scrollIndicator.style.opacity = "1";
  }, 4000);

  setTimeout(() => {
    scrollIndicator.style.opacity = "0";
  }, 7000);
});
