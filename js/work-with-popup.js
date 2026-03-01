/**
 * Do something after show the popup
 */
jQuery( document ).on( 'elementor/popup/show', ( event, id, instance ) => {

  console.log('- popup show -');

});


/**
 * Fix contact form 7 load issue on elementor popup
 */
jQuery( document ).on( 'elementor/popup/show', ( event, id, instance ) => {

  console.log('- popup show -');

	
	let $form = jQuery('.elementor-popup-modal form.wpcf7-form').eq(0);

	wpcf7.init($form[0]);

});


/**
 * Do something after popup hide
 */
jQuery( document ).on( 'elementor/popup/hide', ( event, id, instance ) => {
	if ( id === 123 ) {
		// do your tracking here
	}
} );


/**
 * Show Popup with script
 */
elementorProFrontend.modules.popup.showPopup( { id: 1083 } );