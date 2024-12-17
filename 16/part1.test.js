import { assert, test } from 'vitest'
import {parseInput, realInput, testInput, testInput2, testInput3, testInput4, testInput5} from "./input.js";
import {run} from "./part1.js";

function assertResultIs(result, expected) {
    assert(result[0] === expected, `Result is expected to be ${expected}, but ${result[0]} returned.\n` + result[1])
}

test('part1: ex1', () => {
    const result = run(parseInput(testInput));
    assertResultIs(result, 7036);
});

test('part1: ex2', () => {
    const result = run(parseInput(testInput2));
    assertResultIs(result, 11048);
});

test('part1: ex3', () => {
    const result = run(parseInput(testInput3));
    assertResultIs(result, 5078);
});

test('part1: ex4', () => {
    const result = run(parseInput(testInput4));
    assertResultIs(result, 3015);
});

test('part1: ex5', () => {
    const result = run(parseInput(testInput5));
    assertResultIs(result, 5013);
});

test.skip('part1: real', () => {
    const result = run(parseInput(realInput));
    assertResultIs(result, 105496);
});