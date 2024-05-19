import { tweened, type TweenedOptions } from 'svelte/motion'
import { cubicInOut } from 'svelte/easing'
import { interpolate } from 'd3-interpolate'
import type { AnimationFn, Resolve } from './types.js'

function time(seconds: number) {
	return seconds * 1000
}

export function signal<TweenValues>(
	values: TweenValues,
	options: TweenedOptions<TweenValues> = {}
) {
	const { subscribe, update, set } = tweened<TweenValues>(values, {
		easing: cubicInOut,
		interpolate,
		...options,
		duration: time(options.duration as number) || time(1),
		delay: time(options.delay || 0),
	})

	let tasks: AnimationFn[] = []

	function to(
		this: any,
		values: Partial<TweenValues>,
		options: TweenedOptions<TweenValues> = {}
	) {
		const opts = {
			...options,
			duration: time(options.duration as number) || time(1),
			delay: time(options.delay || 0),
		}

		if (typeof values === 'object') {
			tasks.push(() => update((prev) => ({ ...prev, ...values }), opts))
		} else {
			tasks.push(() => set(values, opts))
		}
		return this
	}

	function reset() {
		set(values, { duration: 0 })
		tasks = []
	}

	function sfx(this: any, sound: string, { volume = 0.5 } = {}) {
		const audio = new Audio(`${sound}.mp3`)
		audio.volume = volume

		tasks.push(async () => {
			audio
				.play()
				.catch(() =>
					console.error('To play sounds interact with the page first.')
				)
		})

		return this
	}

	async function then(resolve: Resolve) {
		for (const task of tasks) {
			await task()
		}
		resolve()
		tasks = []
	}

	return { subscribe, to, reset, sfx, then }
}
