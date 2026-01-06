(function ($) {
	'use strict';

	$(window).on('elementor/frontend/init', function () {
		console.log('Elementor Quick JS Loaded');

		// Example hook
		elementorFrontend.hooks.addAction(
			'frontend/element_ready/global',
			function () {
				// Your code here
			}
		);
	});
})(jQuery);