<?php

/**
 * Convert a comma-separated list of IDs into an array of integers.
 *
 * This helper safely parses a string such as "1,2,3" and returns
 * an array of integer values. Non-numeric values will be converted
 * to 0 by intval().
 *
 * @param string $ids Comma-separated list of numeric IDs.
 *
 * @return int[] Sanitized array of integer IDs.
 * 
 * * @example
 * $gallery_ids = "1,2,3";
 * $gallery_ids_array = parse_id_list($gallery_ids);
 * Result: [1, 2, 3]
 */
function parse_id_list(string $ids): array
{
  return array_values(
    array_filter(
      array_map('intval', explode(',', $ids)),
      static fn($id) => $id > 0
    )
  );
}


/**
 * Attempts to locate and load the WordPress environment.
 *
 * This function walks up the directory tree starting from the current
 * file's directory until it finds `wp-load.php`. Once found, it includes
 * the file to bootstrap WordPress. If WordPress is already loaded
 * (ABSPATH is defined), the function exits early.
 *
 * Useful for custom scripts, cron jobs, or integrations that need access
 * to WordPress functions outside the normal theme/plugin context.
 *
 * @return bool True if WordPress was successfully loaded or already loaded,
 *              false if `wp-load.php` could not be found.
 */
function load_wp()
{
  if (defined('ABSPATH')) {
    return;
  }

  $dir = __DIR__;
  while (! file_exists($dir . '/wp-load.php')) {
    $parent = dirname($dir);
    if ($parent === $dir) {
      return false;
    }
    $dir = $parent;
  }

  require_once $dir . '/wp-load.php';
  return true;
}

// load_wp();
