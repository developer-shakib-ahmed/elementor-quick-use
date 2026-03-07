/**
 * Elementor Lazy Video Autoplay
 *
 * Automatically plays Elementor video widgets when they become visible
 * in the viewport using the IntersectionObserver API.
 *
 * Features:
 * - Targets `.elementor-video` elements that do NOT have autoplay enabled.
 * - Plays the video when at least 50% of the element is visible.
 * - Forces `muted` and `playsinline` to ensure browser autoplay compliance.
 * - Prevents duplicate initialization using a global window flag.
 * - Stops observing the video after it starts playing (performance optimization).
 *
 * Browser Compatibility:
 * - Requires IntersectionObserver support.
 * - Gracefully exits if the API is not supported.
 *
 * Performance Considerations:
 * - Uses a single observer instance.
 * - Unobserves videos after first playback to reduce runtime overhead.
 *
 * @author Shakib Ahmed
 * @since 1.0.0
 * @license MIT
 */
(function () {

  if (window.elementorVideoObserverInitialized) return;
  window.elementorVideoObserverInitialized = true;

  document.addEventListener("DOMContentLoaded", function () {

    const videos = document.querySelectorAll(".elementor-video:not([autoplay])");

    if (!("IntersectionObserver" in window) || !videos.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const video = entry.target;

        // Ensure autoplay compliance
        video.muted = true;
        video.setAttribute("playsinline", "");

        video.play().catch(() => { });

        // Stop observing after first play
        obs.unobserve(video);
      });
    },
    {
      threshold: 0.5 // 50% visible before playing
    });

    videos.forEach(video => {
      observer.observe(video);
    });

  });

})();