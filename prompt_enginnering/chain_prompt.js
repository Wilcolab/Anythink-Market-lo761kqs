/**
 * Convert a value to kebab-case (lowercase words separated by hyphens).
 *
 * - Accepts strings or numbers; returns an empty string for null/empty/whitespace-only input.
 * - Normalizes Unicode and strips diacritics.
 * - Splits on camelCase/PascalCase boundaries and on any non-alphanumeric separators.
 * - Collapses multiple separators to a single hyphen and trims leading/trailing hyphens.
 *
 * @param {string|number|null|undefined} input - Value to convert.
 * @returns {string} The kebab-case representation, or an empty string for null/empty input.
 * @throws {TypeError} If a non-primitive (object/function) is provided.
 *
 * @example
 * toKebabCase('first name') // -> 'first-name'
 * toKebabCase('user_id') // -> 'user-id'
 * toKebabCase('SCREEN_NAME') // -> 'screen-name'
 */
function toKebabCase(input) {
	if (input == null) return '';
	const t = typeof input;
	if (t === 'object' || t === 'function') {
		throw new TypeError('toKebabCase expects a string or number, got ' + (input === null ? 'null' : t));
	}

	const str = String(input).trim();
	if (!str) return '';

	// Normalize and remove diacritics (e.g., "é" -> "e")
	let s = str.normalize('NFKD').replace(/\p{Diacritic}/gu, '');

	// Insert space between lowercase/number and uppercase to split camelCase (e.g., "camelCase" -> "camel Case")
	s = s.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
	// Split sequences like "XMLHttp" -> "XML Http"
	s = s.replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, '$1 $2');

	// Replace any sequence of non-alphanumeric characters with a hyphen
	s = s.replace(/[^A-Za-z0-9]+/g, '-');

	// Collapse multiple hyphens, trim leading/trailing hyphens, and lowercase
	s = s.replace(/-+/g, '-').replace(/^-|-$/g, '').toLowerCase();

	return s;
}

// Export for CommonJS
if (typeof module !== 'undefined' && module.exports) module.exports = toKebabCase;

// CLI examples when run directly
if (typeof require !== 'undefined' && require.main === module) {
	const examples = [
		['first name', 'first-name'],
		['user_id', 'user-id'],
		['SCREEN_NAME', 'screen-name'],
		['mobile-number', 'mobile-number'],
		['  multiple--spaces_and.delimiters  ', 'multiple-spaces-and-delimiters'],
		['camelCaseExample', 'camel-case-example'],
		['Accented élève', 'accented-eleve'],
		['', ''],
	];

	for (const [inp, exp] of examples) {
		try {
			console.log(`${inp} -> ${toKebabCase(inp)}${exp ? `  (expected: ${exp})` : ''}`);
		} catch (err) {
			console.error(`Error for input ${String(inp)}:`, err.message);
		}
	}
}

