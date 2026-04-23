import { Tween as SvelteTween } from 'svelte/motion';
import { cubicInOut } from 'svelte/easing';
import { interpolate } from './interpolate.js';

type TweenedOptions<T> = ConstructorParameters<typeof SvelteTween<T>>[1];

function isObject(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

const sfxCache = new Map<string, HTMLAudioElement>();

class Tween<T> {
	#tween: SvelteTween<T>;
	#default: T;

	/** Get the current animated value. */
	get current() {
		return this.#tween.current;
	}

	/**
	 * Create a new tween.
	 * @param value - The initial value to tween from.
	 * @param options - Optional default duration, easing, and delay.
	 * @example
	 * const x = tween(0, { duration: 500 });
	 */
	constructor(value: T, options?: TweenedOptions<T>) {
		this.#tween = new SvelteTween(value, {
			duration: 1000,
			easing: cubicInOut,
			interpolate: interpolate as (a: T, b: T) => (t: number) => T,
			...options,
		});
		this.#default = value;

		if (isObject(this.#tween.current)) {
			this.#createReadonlyAccessors(this.#tween.current);
		}
	}

	#createReadonlyAccessors(value: Record<string, unknown>) {
		for (const key in value) {
			Object.defineProperty(this, key, {
				get() {
					return (this.#tween.current as Record<string, unknown>)[key];
				},
			});
		}
	}

	/**
	 * Animate the value to a new target.
	 * @param value - The target value (or partial object for object tweens).
	 * @param options - Optional duration, easing, and delay for this transition.
	 * @returns A promise that resolves when the animation completes.
	 * @example
	 * await circle.to({ x: 100, y: 100 }, { duration: 500 });
	 * await count.to(100);
	 */
	to(value: T extends object ? Partial<T> : T, options: TweenedOptions<T> = {}) {
		if (isObject(value)) {
			return this.#tween.set({ ...this.#tween.current, ...value }, options);
		}
		return this.#tween.set(value as T, options);
	}

	/**
	 * Reset the value instantly to its initial state.
	 * @example
	 * circle.reset();
	 */
	reset() {
		this.#tween.set(this.#default, { duration: 0 });
	}

	/**
	 * Play a sound effect.
	 * @param sound - URL or path to the audio file.
	 * @param options - Optional volume (default 0.5).
	 * @returns The tween instance for chaining.
	 * @example
	 * circle.sfx('/sfx/pop.mp3').to({ r: 20 });
	 */
	sfx(sound: string, { volume = 0.5 } = {}) {
		let audio = sfxCache.get(sound);
		if (!audio) {
			audio = new Audio(sound);
			sfxCache.set(sound, audio);
		}
		audio.volume = volume;
		audio.currentTime = 0;
		// ignore audio play errors (e.g., file not found, autoplay policy)
		audio.play().catch(() => {});
		return this;
	}
}

/**
 * Create a reactive tween.
 * @param value - The initial value.
 * @param options - Optional default duration, easing, and delay.
 * @example
 * const circle = tween({ x: 0, y: 0 });
 * const count = tween(0, { duration: 300 });
 */
export function tween<T>(value: T, options?: TweenedOptions<T>) {
	return new Tween<T>(value, options) as T extends object ? Tween<T> & T : Tween<T>;
}

/**
 * Wait for multiple tweens to complete in parallel.
 * @param tweens - Array of tween promises.
 * @example
 * await all(
 *   circle.to({ x: 100 }),
 *   text.to({ opacity: 1 })
 * );
 */
export function all(...tweens: Promise<void>[]) {
	return Promise.all(tweens);
}
