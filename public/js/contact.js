document
  .getElementById("contactForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent page refresh

    const form = e.target;
    const formStatus = document.getElementById("formStatus");
    const submitBtn = form.querySelector(".submit-btn");

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.querySelector(".btn-text").textContent = "Sending...";
    formStatus.textContent = "";

    // Prepare form data
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mykzrkzw", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        formStatus.textContent =
          "✓ Message sent successfully! I'll get back to you soon.";
        formStatus.style.color = "#10b981";
        form.reset(); // Clear the form
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      formStatus.textContent =
        "✗ Oops! Something went wrong. Please try again.";
      formStatus.style.color = "#ef4444";
    } finally {
      // Reset button
      submitBtn.disabled = false;
      submitBtn.querySelector(".btn-text").textContent = "Send Message";
    }
  });
