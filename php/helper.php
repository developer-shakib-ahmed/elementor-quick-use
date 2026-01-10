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
