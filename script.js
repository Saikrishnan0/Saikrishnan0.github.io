document.addEventListener("DOMContentLoaded", function () {
    var contactForm = document.getElementById("contactForm");
  
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      var formData = new FormData(contactForm);
  
      fetch(contactForm.action, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            // Handle non-successful responses
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          // Check if the submission was successful
          if (data.success) {
            // Display a success message to the user
            displaySuccessMessage();
          } else {
            // Display an error message or handle the response data as needed
            console.error("Submission failed:", data.error);
            displayErrorMessage("Submission failed. Please try again.");
          }
  
          // Clear the form fields
          contactForm.reset();
        })
        .catch((error) => {
          // Handle fetch errors
          console.error("Fetch error:", error);
          displayErrorMessage("An error occurred. Please try again.");
        });
    });
  
    function displaySuccessMessage() {
      // Create a div element for the success message
      var successMessage = document.createElement("div");
      successMessage.className = "success-message";
      successMessage.textContent = "Your message has been sent successfully!";
  
      // Append the success message to the form or any other container
      contactForm.parentNode.insertBefore(
        successMessage,
        contactForm.nextSibling
      );
  
      // Optionally, you can remove the success message after a certain period
      setTimeout(function () {
        successMessage.remove();
      }, 5000); // Remove the message after 5 seconds (adjust as needed)
    }
  
    function displayErrorMessage(message) {
      // Create a div element for the error message
      var errorMessage = document.createElement("div");
      errorMessage.className = "error-message";
      errorMessage.textContent = message;
  
      // Append the error message to the form or any other container
      contactForm.parentNode.insertBefore(errorMessage, contactForm.nextSibling);
  
      // Optionally, you can remove the error message after a certain period
      setTimeout(function () {
        errorMessage.remove();
      }, 5000); // Remove the message after 5 seconds (adjust as needed)
    }
  });