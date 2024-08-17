import { interpolateLab } from 'd3-interpolate'

type Object = Record<string, any>

export function interpolate(a: any, b: any) {
	if (a === b || a !== a) return () => a

	const type = typeof a
	if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
		throw new Error('Cannot interpolate values of different type')
	}

	if (Array.isArray(a)) {
		// @ts-ignore
		const arr = b.map((bi, i) => {
			return interpolate(a[i], bi)
		})

		// @ts-ignore
		return (t: number) => arr.map((fn) => fn(t))
	}

	if (type === 'object') {
		if (!a || !b) {
			throw new Error('Object cannot be null')
		}

		const keys = Object.keys(b)

		const interpolators: Object = {}
		keys.forEach((key) => {
			interpolators[key] = interpolate(a[key], b[key])
		})

		return (t: number) => {
			const result: Object = {}
			keys.forEach((key) => {
				result[key] = interpolators[key](t)
			})
			return result
		}
	}

	if (type === 'number') {
		const delta = b - a
		return (t: number) => a + t * delta
	}

	if (type === 'string') {
		return interpolateLab(a, b)
	}

	throw new Error(`Cannot interpolate ${type} values`)
}
