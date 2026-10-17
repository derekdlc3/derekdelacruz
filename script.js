
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Reveal content as it enters the viewport
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) =>
    element.classList.add("is-visible")
  );
}

// Keep the footer year current
document.querySelector("#year").textContent =
  new Date().getFullYear();

// Copy email address
const copyEmail = document.querySelector("#copy-email");
const copyFeedback = document.querySelector("#copy-feedback");

copyEmail.addEventListener("click", async (event) => {
  event.preventDefault();

  const email = copyEmail.dataset.email;

  try {
    await navigator.clipboard.writeText(email);
    copyFeedback.textContent = "Email copied to clipboard ✓";
  } catch {
    copyFeedback.textContent = `Email: ${email}`;
  }
});
