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

	get current() {
		return this.#tween.current;
	}

	to(value: T extends object ? Partial<T> : T, options: TweenedOptions<T> = {}) {
		if (isObject(value)) {
			return this.#tween.set({ ...this.#tween.current, ...value }, options);
		}
		return this.#tween.set(value as T, options);
	}

	reset() {
		this.#tween.set(this.#default, { duration: 0 });
	}

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

export function tween<T>(value: T, options?: TweenedOptions<T>) {
	return new Tween<T>(value, options) as T extends object ? Tween<T> & T : Tween<T>;
}

export function all(...tweens: Promise<void>[]) {
	return Promise.all(tweens);
}
