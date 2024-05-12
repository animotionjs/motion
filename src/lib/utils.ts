import { onMount } from 'svelte'
import type { AnimationFn } from './types.js'

export function animate(fn: AnimationFn) {
	onMount(fn)
}

export function all(...animations: AnimationFn[]) {
	return Promise.all(animations)
}

export function wait(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}
