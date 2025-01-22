import { beforeEach, expect, test, vi } from 'vitest'
import { render } from 'vitest-browser-svelte'

import Single from './components/01-single.svelte'
import Multiple from './components/02-multiple.svelte'
import Color from './components/03-color.svelte'
import MultipleAnimations from './components/04-multiple-animations.svelte'
import MultipleCombinedAnimations from './components/05-multiple-combined-animations.svelte'
import AnimationReset from './components/06-animation-reset.svelte'

beforeEach(() => {
	vi.useFakeTimers()
	return () => vi.useRealTimers()
})

function advanceTimer() {
	vi.advanceTimersToNextFrame()
	vi.advanceTimersByTime(1000)
}

test('interpolates value', async () => {
	const { getByRole } = render(Single)
	const btnEl = getByRole('button')
	await btnEl.click()
	advanceTimer()
	await expect.element(btnEl).toHaveTextContent('100')
})

test('interpolates multiple values', async () => {
	const { getByTestId } = render(Multiple)

	const accessorBtnEl = getByTestId('accessor')
	const readonlyAccessorBtnEl = getByTestId('readonly-accessor')

	await accessorBtnEl.click()
	await readonlyAccessorBtnEl.click()
	advanceTimer()
	await expect.element(accessorBtnEl).toHaveTextContent('100 100')
	await expect.element(readonlyAccessorBtnEl).toHaveTextContent('100 100')
})

test('interpolates colors', async () => {
	const { getByRole } = render(Color)
	const btnEl = getByRole('button')
	await btnEl.click()
	advanceTimer()
	await expect.element(btnEl).toHaveAttribute('style', 'background: blue;')
})

test('awaits multiple animations', async () => {
	const { getByRole, getByTestId } = render(MultipleAnimations)
	const btnEl = getByRole('button')
	const circleEl = getByTestId('circle')
	const textEl = getByTestId('text')

	await btnEl.click()
	advanceTimer()
	await expect.element(circleEl).toHaveAttribute('cx', '600')
	await expect.element(circleEl).toHaveAttribute('fill', '#ffff00')

	advanceTimer()
	await expect.element(textEl).toHaveTextContent('600')
})

test('awaits combined animations', async () => {
	const { getByRole, getByTestId } = render(MultipleCombinedAnimations)
	const btnEl = getByRole('button')
	const circleEl = getByTestId('circle')
	const textEl = getByTestId('text')

	await btnEl.click()
	advanceTimer()
	await expect.element(circleEl).toHaveAttribute('cx', '600')
	await expect.element(circleEl).toHaveAttribute('fill', '#ffff00')
	await expect.element(textEl).toHaveTextContent('600')
})

test('resets animation to default values', async () => {
	const { getByTestId } = render(AnimationReset)
	const animateBtnEl = getByTestId('animate')
	const resetBtnEl = getByTestId('reset')
	const outputEl = getByTestId('output')

	await animateBtnEl.click()
	advanceTimer()
	await expect
		.element(outputEl)
		.toHaveTextContent('{"x":600,"y":100,"r":100,"fill":"#ffff00"}')

	await resetBtnEl.click()
	advanceTimer()
	await expect
		.element(outputEl)
		.toHaveTextContent('{"x":0,"y":100,"r":100,"fill":"#00ffff"}')
})
