import { assert, test } from 'vitest'
import {realInput, simple0, testInput, testInput2, testInput3, testInput4, testInput5, testInput6, testInput7, testInput8, testInput9} from "./input.js";
import {part1} from "./code.js";

function assertResultIs(result, expected) {
    assert.strictEqual(result[0], expected, result[1])
}

test('part1: simple0', () => {
    const result = part1(simple0);
    assertResultIs(result, 3008);
});

test('part1: ex1', () => {
    const result = part1(testInput);
    assertResultIs(result, 7036);
});

test('part1: ex2', () => {
    const result = part1(testInput2);
    assertResultIs(result, 11048);
});

test('part1: ex3', () => {
    const result = part1(testInput3);
    assertResultIs(result, 21110);
});

test('part1: ex4', () => {
    const result = part1(testInput4);
    assertResultIs(result, 4013);
});

test('part1: ex5', () => {
    const result = part1(testInput5);
    assertResultIs(result, 6013);
});

test('part1: ex6', () => {
    const result = part1(testInput6);
    assertResultIs(result, 6018);
});

test('part1: ex7', () => {
    const result = part1(testInput7);
    assertResultIs(result, 25105);
});

test('part1: ex8', () => {
    const result = part1(testInput8);
    assertResultIs(result, 21148);
});

test('part1: ex9', () => {
    const result = part1(testInput9);
    assertResultIs(result, 7020);
});

test('part1: real', () => {
    const result = part1(realInput);
    assertResultIs(result, 105496); // 107424
});