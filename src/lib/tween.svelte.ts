import { Tween as SvelteTween } from 'svelte/motion'
import { cubicInOut } from 'svelte/easing'
import { interpolate } from './interpolate.js'

type TweenedOptions<T> = ConstructorParameters<typeof SvelteTween<T>>[1]

function isObject<T>(value: T): value is T {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
}

class Tween<T> {
	#tween: SvelteTween<T>
	#default

	/**
	 * @deprecated use `.current` instead
	 */
	value = $state() as T

	constructor(value: T, options?: TweenedOptions<T>) {
		this.#tween = new SvelteTween(value, {
			duration: 1000,
			easing: cubicInOut,
			interpolate,
			...options,
		})
		this.#default = value

		// turns object properties into readonly accessors so instead of
		// doing `obj.current.x` you can do `obj.x` to get the value
		if (isObject(this.#tween.current)) {
			this.#createReadonlyAccessors(this.#tween.current)
		}
	}

	#createReadonlyAccessors(value: T) {
		for (const key in value) {
			Object.defineProperty(this, key, {
				get() {
					return this.#tween.current[key]
				},
			})
		}
	}

	get current() {
		return this.#tween.current
	}

	to(
		value: T extends object ? Partial<T> : T,
		options: TweenedOptions<T> = {}
	) {
		return isObject(value)
			? this.#tween.set({ ...this.#tween.current, ...value }, options)
			: this.#tween.set(value, options)
	}

	reset() {
		this.#tween.set(this.#default, { duration: 0 })
	}

	sfx(sound: string, { volume = 0.5 } = {}) {
		const audio = new Audio(sound)
		audio.volume = volume
		audio.play()
		return this
	}
}

export function tween<T>(value: T, options?: TweenedOptions<T>) {
	return new Tween<T>(value, options) as T extends object
		? Tween<T> & T
		: Tween<T>
}

export async function all(...tweens: Promise<void>[]) {
	return Promise.all([...tweens])
}
