export function formatNumber(number: number, { digits = 0, lang = 'en' } = {}) {
	return new Intl.NumberFormat(lang, { maximumFractionDigits: digits }).format(number);
}
