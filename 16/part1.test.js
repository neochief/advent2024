import { assert, test } from 'vitest'
import {parseInput, realInput, simple0, testInput, testInput2, testInput3, testInput4, testInput5, testInput6, testInput7, testInput8, testInput9} from "./input.js";
import {run} from "./part1.js";

function assertResultIs(result, expected) {
    assert.strictEqual(result[0], expected, result[1])
}

test('part1: simple0', () => {
    const result = run(simple0);
    assertResultIs(result, 3008);
});

test('part1: ex1', () => {
    const result = run(testInput);
    assertResultIs(result, 7036);
});

test('part1: ex2', () => {
    const result = run(testInput2);
    assertResultIs(result, 11048);
});

test('part1: ex3', () => {
    const result = run(testInput3);
    assertResultIs(result, 21110);
});

test('part1: ex4', () => {
    const result = run(testInput4);
    assertResultIs(result, 4013);
});

test('part1: ex5', () => {
    const result = run(testInput5);
    assertResultIs(result, 6013);
});

test('part1: ex6', () => {
    const result = run(testInput6);
    assertResultIs(result, 6018);
});

test('part1: ex7', () => {
    const result = run(testInput7);
    assertResultIs(result, 25105);
});

test('part1: ex8', () => {
    const result = run(testInput8);
    assertResultIs(result, 21148);
});

test('part1: ex9', () => {
    const result = run(testInput9);
    assertResultIs(result, 7020);
});

test('part1: real', () => {
    const result = run(realInput);
    assertResultIs(result, 105496); // 107424
});