document.addEventListener("DOMContentLoaded", function () {
  // Add click event for the email link in the navigation bar
  document
    .getElementById("copy-email")
    .addEventListener("click", function (event) {
      event.preventDefault();
      copyEmail("elli.mattila@gmail.com");
    });

  // Add click event for the email link in the Contact section
  document
    .getElementById("copy-email-contact")
    .addEventListener("click", function (event) {
      event.preventDefault();
      copyEmail("elli.mattila@gmail.com");
    });

  // Function to copy email and show notification
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

  // Function to show notification
  function showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.innerText = message;
    document.body.appendChild(notification);
    setTimeout(function () {
      notification.remove();
    }, 3000); // Remove after 3 seconds
  }

  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";

    // Check the current scroll position and determine the active section
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    // Remove the 'current-page' class from all links
    navLinks.forEach((link) => {
      link.classList.remove("current-page");
    });

    // Add the 'current-page' class to the active link
    if (current) {
      const activeLink = document.querySelector(
        `.nav-links a[href="#${current}"]`
      );
      if (activeLink) {
        activeLink.classList.add("current-page");
      }
    }
  });
  // Lightbox functionality
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".close-lightbox");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const scrollableImages = document.querySelectorAll(".scrollable-image");

  let currentIndex = 0;
  let images = Array.from(scrollableImages);

  // Show lightbox
  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      lightbox.style.display = "block";
      lightboxImg.src = img.src;
      currentIndex = index;
    });
  });

  // Close lightbox
  closeBtn.onclick = () => {
    lightbox.style.display = "none";
  };

  // Navigate
  nextBtn.onclick = () => {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex].src;
  };

  prevBtn.onclick = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex].src;
  };

  // Close on background click
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });

  const imageRow = document.querySelector(".image-row");
  const rightArrow = document.querySelector(".right-arrow");

  // Scroll to the right when the right arrow is clicked
  rightArrow.addEventListener("click", () => {
    imageRow.scrollBy({ left: 300, behavior: "smooth" }); // Scroll 300px to the right
  });
});
