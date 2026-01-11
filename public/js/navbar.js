// Mobile Menu Toggle
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const menuOverlay = document.getElementById("menuOverlay");

if (menuToggle && navMenu && menuOverlay) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
    menuOverlay.classList.toggle("active");
  });

  // Close menu when overlay is clicked
  menuOverlay.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    navMenu.classList.remove("active");
    menuOverlay.classList.remove("active");
  });

  // Close menu when a link is clicked
  const navLinks = navMenu.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      navMenu.classList.remove("active");
      menuOverlay.classList.remove("active");
    });
  });
}
