/**
 * Convert an input value to camelCase.
 *
 * This function normalizes the input (string or number), splits on common
 * separators (spaces, underscores, hyphens, dots, and transitions inside
 * camel/pascal case), lowercases words, and then joins them such that the
 * first word is lowercased and subsequent words are capitalized.
 *
 * Behavior:
 * - Collapses multiple adjacent separators.
 * - Trims leading/trailing whitespace.
 * - Preserves digits and sensible internal capitalization (e.g., `XMLHttp` -> `xmlHttp`).
 * - Returns an empty string for `null`, `undefined`, or empty inputs.
 *
 * @param {string|number} value - The value to convert to camelCase.
 * @returns {string} The camelCased string, or an empty string for empty input.
 * @throws {TypeError} If `value` is not a string or number.
 *
 * @example
 * toCamelCase('first name')    // 'firstName'
 * toCamelCase('user_id')       // 'userId'
 * toCamelCase('SCREEN_NAME')   // 'screenName'
 * toCamelCase('mobile-number') // 'mobileNumber'
 */
function toCamelCase(value) {
	if (value == null) return '';
	const t = typeof value;
	if (t !== 'string' && t !== 'number') {
		throw new TypeError('toCamelCase: expected a string or number');
	}

	// Normalize to string and trim
	let s = String(value).trim();
	if (s.length === 0) return '';

	// Step 1: Separate camel/pascal boundaries like "fooBar" -> "foo Bar"
	s = s.replace(/([a-z0-9])([A-Z])/g, '$1 $2');

	// Step 2: Break up sequences like "XMLHttp" -> "XML Http" so we can lowercase correctly
	s = s.replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, '$1 $2');

	// Step 3: Replace any non-alphanumeric characters (including underscores, hyphens, dots, etc.) with a space
	s = s.replace(/[^A-Za-z0-9]+/g, ' ');

	// Step 4: Split on whitespace, collapse empties, and lowercase words
	const parts = s.split(/\s+/).filter(Boolean).map(p => p.toLowerCase());
	if (parts.length === 0) return '';

	// Step 5: First word stays lowercase; subsequent words are capitalized
	const first = parts[0];
	const rest = parts.slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1));
	return first + rest.join('');
}

/**
 * Convert an input value to dot.case.
 *
 * This function normalizes the input (string or number), splits on common
 * separators (spaces, underscores, hyphens, dots, and transitions inside
 * camel/pascal case), lowercases words, and then joins them with a dot `.`
 * between tokens.
 *
 * Behavior:
 * - Collapses multiple adjacent separators.
 * - Trims leading/trailing whitespace.
 * - Returns an empty string for `null`, `undefined`, or empty inputs.
 *
 * @param {string|number} value - The value to convert to dot.case.
 * @returns {string} The dot.cased string, or an empty string for empty input.
 * @throws {TypeError} If `value` is not a string or number.
 *
 * @example
 * toDotCase('FirstName last-name') // 'first.name.last.name'
 * toDotCase('user_id')             // 'user.id'
 * toDotCase('XMLHttpRequest')      // 'xml.http.request'
 */
// Convert an input value to dot.case.
function toDotCase(value) {
	if (value == null) return '';
	const t = typeof value;
	if (t !== 'string' && t !== 'number') {
		throw new TypeError('toDotCase: expected a string or number');
	}

	// Normalize to string and trim
	let s = String(value).trim();
	if (s.length === 0) return '';

	// Step 1: Separate camel/pascal boundaries like "fooBar" -> "foo Bar"
	s = s.replace(/([a-z0-9])([A-Z])/g, '$1 $2');

	// Step 2: Break up sequences like "XMLHttp" -> "XML Http"
	s = s.replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, '$1 $2');

	// Step 3: Replace any non-alphanumeric characters (including underscores, hyphens, dots, etc.) with a space
	s = s.replace(/[^A-Za-z0-9]+/g, ' ');

	// Step 4: Split on whitespace, collapse empties, and lowercase words
	const parts = s.split(/\s+/).filter(Boolean).map(p => p.toLowerCase());
	if (parts.length === 0) return '';

	// Join with dots
	return parts.join('.');
}

// Export when used as a module (CommonJS environment)
if (typeof module !== 'undefined' && module.exports){
    module.exports = { toCamelCase, toDotCase };
}


