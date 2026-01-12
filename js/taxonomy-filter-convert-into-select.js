/**
 * Converts Elementor taxonomy filter buttons into a <select> dropdown.
 *
 * Functionality:
 * - Hides the original Elementor taxonomy filter buttons.
 * - Dynamically creates a <select> element based on `.e-filter-item` buttons.
 * - Preserves the active filter state using `aria-pressed`.
 * - Ensures the "__all" option (e.g., "Select Topic") appears first and is selected.
 * - Syncs dropdown changes back to the original filter by triggering button clicks.
 *
 * Requirements:
 * - Elementor taxonomy filter widget must exist in the DOM.
 * - Filter buttons must have the class `.e-filter-item`
 *   and use `data-filter` attributes.
 *
 * Runs:
 * - On DOMContentLoaded
 *
 * Notes:
 * - The original filter container is hidden but not removed to retain functionality.
 * - The dropdown is inserted before the filter container in the DOM.
 */
document.addEventListener('DOMContentLoaded', function () {
  const filterContainer = document.querySelector('.elementor-widget-taxonomy-filter search');
  const buttons = filterContainer.querySelectorAll('.e-filter-item');

  if (!buttons.length) return;

  filterContainer.style.display = 'none';

  // Create select element
  const select = document.createElement('select');
  select.id = 'taxonomyFilterSelect';

  // Create options from buttons
  buttons.forEach(button => {
    const option = document.createElement('option');
    option.value = button.dataset.filter;
    option.textContent = button.textContent.trim();

    if (button.getAttribute('aria-pressed') === 'true') {
      option.selected = true;
    }

    select.appendChild(option);
  });

  // Move "__all" (Select Topic) to first position
  const allOption = select.querySelector('option[value="__all"]');
  if (allOption) {
    select.insertBefore(allOption, select.firstChild);
    allOption.selected = true;
  }

  // Handle select change → trigger button click
  select.addEventListener('change', function () {
    const selectedValue = this.value;
    const button = filterContainer.querySelector(
      `.e-filter-item[data-filter="${selectedValue}"]`
    );
    if (button) {
      button.click();
    }
  });

  // Insert select before filter buttons
  filterContainer.parentNode.insertBefore(select, filterContainer);

  console.log('Filter converted.');
});