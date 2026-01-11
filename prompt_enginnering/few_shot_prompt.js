/**
 * Convert a string to camelCase.
 * Handles spaces, hyphens, underscores, dots, and ALL-CAPS inputs.
 * Examples:
 *   "first name"   -> "firstName"
 *   "user_id"      -> "userId"
 *   "SCREEN_NAME"  -> "screenName"
 *   "mobile-number"-> "mobileNumber"
 */
function toCamelCase(input) {
	if (input == null) return '';
	let s = String(input).trim();
	// Break camel boundaries like "fooBar" -> "foo Bar"
	s = s.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
	// Replace any non-alphanumeric characters (including _ - . and spaces) with a single space
	s = s.replace(/[^A-Za-z0-9]+/g, ' ');
	const parts = s.split(/\s+/).filter(Boolean).map(p => p.toLowerCase());
	if (parts.length === 0) return '';
	return parts[0] + parts.slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
}

