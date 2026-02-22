/**
 * ------------------------------------------------------------
 * User Activity Detector
 * ------------------------------------------------------------
 * Description:
 * Detects the first user interaction on the page
 * (pointer, keyboard, scroll, or touch) and triggers
 * a one-time callback. Automatically removes listeners
 * after the first interaction.
 *
 * Events Monitored:
 * - pointerdown
 * - pointermove
 * - keydown
 * - scroll
 * - touchstart
 *
 * Author: Your Name
 * Version: 1.0.0
 * Created: 2026-02-22
 * License: MIT (or your preferred license)
 * ------------------------------------------------------------
 */
jQuery(function ($) {
  "use strict";

  const UserActivity = (function () {
    const NS = ".shakibUserActivity";

    const EVENTS = [
      "pointerdown",
      "pointermove",
      "keydown",
      "scroll",
      "touchstart",
    ]
      .map((e) => e + NS)
      .join(" ");

    function init() {
      $(document).one(EVENTS, onFirstInteraction);
    }

    function onFirstInteraction() {
      console.log("First interaction detected");
      destroy();
    }

    function destroy() {
      $(document).off(NS);
    }

    return { init };
  })();

  UserActivity.init();
});
