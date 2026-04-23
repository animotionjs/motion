import { interpolateLab } from 'd3-interpolate';

export function interpolate(a: unknown, b: unknown): (t: number) => unknown {
	if (a === b || (typeof a === 'number' && Number.isNaN(a))) {
		return () => a;
	}

	const type = typeof a;
	if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
		throw new Error('Cannot interpolate values of different type');
	}

	if (Array.isArray(a) && Array.isArray(b)) {
		const arr = b.map((bi, i) => interpolate(a[i], bi));
		return (t: number) => arr.map((fn) => fn(t));
	}

	if (type === 'object' && a !== null && b !== null) {
		const aObj = a as Record<string, unknown>;
		const bObj = b as Record<string, unknown>;
		const keys = Object.keys(bObj);

		const interpolators: Record<string, (t: number) => unknown> = {};
		keys.forEach((key) => {
			interpolators[key] = interpolate(aObj[key], bObj[key]);
		});

		return (t: number) => {
			const result: Record<string, unknown> = {};
			keys.forEach((key) => {
				result[key] = interpolators[key](t);
			});
			return result;
		};
	}

	if (type === 'number') {
		const start = a as number;
		const end = b as number;
		const delta = end - start;
		return (t: number) => start + t * delta;
	}

	if (type === 'string') {
		return interpolateLab(a as string, b as string);
	}

	throw new Error(`Cannot interpolate ${type} values`);
}
