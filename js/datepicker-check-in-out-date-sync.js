/**
 * @fileoverview
 * Initializes and synchronizes two Flatpickr date inputs (check-in and check-out).
 *
 * Features:
 * - Ensures both date pickers are initialized before applying logic.
 * - Sets the minimum selectable date to today for both fields.
 * - Dynamically updates the check-out minimum date based on the selected check-in date.
 * - Prevents duplicate event listener attachment.
 *
 * Dependencies:
 * - Flatpickr (https://flatpickr.js.org/)
 *
 * Usage:
 * Include this script after your form fields are rendered in the DOM.
 */

/**
 * Continuously checks for Flatpickr initialization and applies date constraints.
 *
 * @function check
 * @returns {void}
 */
function check() {
  const checkIn = document.querySelector('#form-field-check_in');
  const checkOut = document.querySelector('#form-field-check_out');

  if (checkIn && checkIn._flatpickr && checkOut && checkOut._flatpickr) {

    const fpIn = checkIn._flatpickr;
    const fpOut = checkOut._flatpickr;

    // Prevent multiple event bindings
    if (!checkIn.dataset.onchangeAdded) {

      /**
       * Updates check-out minimum date when check-in date changes.
       *
       * @param {Date[]} selectedDates - Array of selected dates from Flatpickr.
       */
      fpIn.config.onChange.push(function (selectedDates) {
        if (selectedDates.length) {
          fpOut.set({
            minDate: selectedDates[0]
          });
        }
      });

      checkIn.dataset.onchangeAdded = "true";
    }

    // Set default minimum dates
    fpIn.set({ minDate: "today" });
    fpOut.set({ minDate: "today" });

  } else {
    // Retry on next animation frame if Flatpickr is not ready yet
    requestAnimationFrame(check);
  }
}

// Initialize the check loop
requestAnimationFrame(check);