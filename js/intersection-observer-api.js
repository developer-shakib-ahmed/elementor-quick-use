/**
 * @IntersectionObserver
 * 
 * This code will help you make a widget hidden until a specific widget is visible in the viewport.
 * 
 * If you want the header button to fade in exactly like Elementor’s native Motion / Entrance Animation,
 * the best approach is to reuse Elementor’s animation classes instead of inventing your own animation.
 * 
 * "elementor-invisible" Elementor keeps it hidden until triggered
 */

const triggerElement = document.querySelector(".trigger-element");
const button = document.querySelector(".btn-inquire");

button.style.display = "none";

if (!triggerElement || !button) return;

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        button.style.display = "block";
        observer.disconnect(); // Trigger Only Once
      }
    });
  },
  {
    threshold: 0.4, // 40% of element visible
  }
);

observer.observe(triggerElement);
