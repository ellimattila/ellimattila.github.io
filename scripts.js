document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("copy-email")
    .addEventListener("click", function (event) {
      event.preventDefault();
      const email = "ellimattila@gmail.com";
      navigator.clipboard.writeText(email).then(
        function () {
          showNotification("Email address copied to clipboard");
        },
        function (err) {
          console.error("Could not copy text: ", err);
        }
      );
    });

  function showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.innerText = message;
    document.body.appendChild(notification);
    setTimeout(function () {
      notification.remove();
    }, 3000); // Remove after 3 seconds
  }
});
