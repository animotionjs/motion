import { tweened } from 'svelte/motion'
import { cubicInOut } from 'svelte/easing'
import { interpolate } from './interpolate.js'

type Options<T> = Parameters<typeof tweened<T>>[1]
type Tweened<T> = T extends object ? Tween<T> & T : Tween<T>

class Tween<T> {
	value = $state() as T
	#store

	constructor(value: T, options?: Options<T>) {
		this.value = value
		this.#store = tweened(value, {
			duration: 1000,
			easing: cubicInOut,
			interpolate,
			...options,
		})

		$effect.pre(() => {
			return this.#store.subscribe((v) => (this.value = v))
		})

		if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
			this.setProperties(this.value)
		}
	}

	setProperties(value: T) {
		for (const key in value) {
			Object.defineProperty(this, key, {
				get() {
					return this.value[key]
				},
			})
		}
	}

	to(value: Partial<T>, options: Options<T> = {}) {
		if (typeof value === 'object' && value !== null) {
			return this.#store.update((prev) => ({ ...prev, ...value }), options)
		}
		return this.#store.set(value, options)
	}

	reset() {
		this.#store.set(this.value, { duration: 0 })
	}

	sfx(sound: string, { volume = 0.5 } = {}) {
		const audio = new Audio(sound)
		audio.volume = volume
		audio.play()
		return this
	}
}

export function tween<T>(value: T, options?: Options<T>) {
	return new Tween<T>(value, options) as Tweened<T>
}
