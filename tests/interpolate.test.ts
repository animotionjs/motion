import { expect, test } from 'vitest';
import { interpolate } from '$lib/interpolate.js';

test('returns same value for identical inputs', () => {
	const fn = interpolate(5, 5);
	expect(fn(0)).toBe(5);
	expect(fn(0.5)).toBe(5);
	expect(fn(1)).toBe(5);
});

test('handles NaN as first argument', () => {
	const fn = interpolate(NaN, 10);
	expect(fn(0)).toBe(NaN);
	expect(fn(0.5)).toBe(NaN);
	expect(fn(1)).toBe(NaN);
});

test('linearly interpolates numbers', () => {
	const fn = interpolate(0, 100);
	expect(fn(0)).toBe(0);
	expect(fn(0.5)).toBe(50);
	expect(fn(1)).toBe(100);
});

test('interpolates objects', () => {
	const fn = interpolate({ x: 0, y: 0 }, { x: 100, y: 200 });
	expect(fn(0)).toEqual({ x: 0, y: 0 });
	expect(fn(0.5)).toEqual({ x: 50, y: 100 });
	expect(fn(1)).toEqual({ x: 100, y: 200 });
});

test('interpolates arrays', () => {
	const fn = interpolate([0, 10], [100, 200]);
	expect(fn(0)).toEqual([0, 10]);
	expect(fn(0.5)).toEqual([50, 105]);
	expect(fn(1)).toEqual([100, 200]);
});

test('interpolates color strings', () => {
	const fn = interpolate('red', 'blue');
	expect(fn(0)).toBe('rgb(255, 0, 0)');
	expect(fn(1)).toBe('rgb(0, 0, 255)');
});

test('throws on type mismatch', () => {
	expect(() => interpolate(0, 'hello')).toThrow('Cannot interpolate values of different type');
	expect(() => interpolate({ x: 1 }, [1, 2])).toThrow(
		'Cannot interpolate values of different type'
	);
});

test('throws on unsupported types', () => {
	expect(() => interpolate(true, false)).toThrow('Cannot interpolate boolean values');
});

test('throws on different types', () => {
	expect(() => interpolate(undefined, null)).toThrow('Cannot interpolate values of different type');
});
