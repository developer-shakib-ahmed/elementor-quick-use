<?php

/**
 * Disable Core Update
 */
function remove_core_updates()
{
	global $wp_version;

	return (object) array(
		'last_checked' => time(),
		'version_checked' => $wp_version,
	);
}
add_filter('pre_site_transient_update_core', 'remove_core_updates'); //hide updates for WordPress itself
add_filter('pre_site_transient_update_plugins', 'remove_core_updates'); //hide updates for all plugins
add_filter('pre_site_transient_update_themes', 'remove_core_updates'); //hide updates for all themes

add_filter('auto_update_plugin', '__return_false');

// prevent Elementor from auto-updating
add_filter('auto_update_plugin', function ($update, $item) {
	if (isset($item->slug) && $item->slug === 'elementor') {
		return false;
	}
	return $update;
}, 10, 2);


/**
 * Prevent Error on Edit with ELementor
 */
$getAction = '';

if (isset($_GET['action'])) {
	$getAction = $_GET['action'];
}

if ($getAction == "elementor") return;


// ---------------------------
if (\Elementor\Plugin::$instance->editor->is_edit_mode() == false) {
	// $Gallery = $product->get_gallery_image_ids();
}
// ---------------------------


// ---------------------------
if (defined('ELEMENTOR_VERSION') && \Elementor\Plugin::$instance->editor->is_edit_mode()) {
	return;
}

if (isset($_GET['elementor-preview'])) {
	return;
}
// ---------------------------


$Gallery = $product->get_gallery_image_ids(); // This show error on elementor edit mode
$Gallery = explode(",", get_post_meta(get_the_ID(), '_product_image_gallery', true)); // It works fine.

// Elementor Check if we are in a WooCommerce product context.
global $product;
if (is_object($product) && method_exists($product, 'get_type') && $product->get_type() == 'lottery') {
}


/**
 * Elementor Hooks
 */

add_action('elementor/frontend/after_enqueue_styles', function () {
	// Custom logic
});


add_action('elementor/widgets/register', function ($widgets_manager) {
	// Register custom widgets later
});
