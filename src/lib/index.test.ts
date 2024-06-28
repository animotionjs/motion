import { get } from 'svelte/store'
import { it, expect } from 'vitest'
import { all, tween } from './index.js'

const options = { duration: 0 }

it('can interpolate numbers', async () => {
	const count = tween(0, options)
	await count.to(10)
	expect(get(count)).toBe(10)
})

it('can interpolate strings', async () => {
	const color = tween('#fff', options)
	await color.to('#00ffff')
	expect(get(color)).toBe('#00ffff')
})

it('can interpolate objects', async () => {
	const coords = tween({ x: 0, y: 0 }, options)
	await coords.to({ x: 10, y: 10 })
	expect(get(coords)).toEqual({ x: 10, y: 10 })
})

it('can run animations at the same time', async () => {
	const a = tween(0, options)
	const b = tween(0, options)

	await all(a.to(10), b.to(10))

	expect(get(a)).toEqual(get(b))
})
