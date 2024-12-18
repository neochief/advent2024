import { assert, test } from 'vitest'
import {parseInput, realInput, simple0, testInput, testInput2, testInput3, testInput4, testInput5, testInput6, testInput7, testInput8, testInput9} from "./input.js";
import {run} from "./part2.js";

function assertResultIs(result, expected) {
    assert.strictEqual(result[0], expected, result[1])
}

test('part2: simple0', () => {
    const result = run(simple0);
    assertResultIs(result, 12);
});

test('part2: ex1', () => {
    const result = run(testInput);
    assertResultIs(result, 45);
});

test('part2: ex2', () => {
    const result = run(testInput2);
    assertResultIs(result, 64);
});

test('part2: ex3', () => {
    const result = run(testInput3);
    assertResultIs(result, 264);
});

test('part2: ex4', () => {
    const result = run(testInput4);
    assertResultIs(result, 14);
});

test('part2: ex5', () => {
    const result = run(testInput5);
    assertResultIs(result, 18);
});

test('part2: ex6', () => {
    const result = run(testInput6);
    assertResultIs(result, 23);
});

test('part2: ex7', () => {
    const result = run(testInput7);
    assertResultIs(result, 120);
});

test('part2: ex8', () => {
    const result = run(testInput8);
    assertResultIs(result, 149);
});

test('part2: ex9', () => {
    const result = run(testInput9);
    assertResultIs(result, 21);
});

test('part2: real', () => {
    const result = run(realInput);
    assertResultIs(result, 524);
});