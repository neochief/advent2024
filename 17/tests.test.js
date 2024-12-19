import {assert, test} from 'vitest'
import {example1, realInput} from "./input.js";
import {part1,part2, parseInput, adv, bxl} from "./code.js";

function assertResultIs(result, expected) {
    assert.strictEqual(result[0], expected, result[1])
}

test('input', () => {
    const {a, b, c, program} = parseInput(example1);
    assert.equal(a, 729);
    assert.equal(b, 0);
    assert.equal(c, 0);
    assert.equal(program.length, 6);
    assert.deepEqual(program, [0, 1, 5, 4, 3, 0]);
});

test('part1: e1', () => {
    const result = part1(`Register A: 0
Register B: 0
Register C: 9

Program: 2,6`);
    assert.equal(result[1].b, 1);
});

test('part1: e2', () => {
    const result = part1(`Register A: 10
Register B: 0
Register C: 0

Program: 5,0,5,1,5,4`);
    assert.deepEqual(result[0], '0,1,2');
});

test('part1: e3', () => {
    const result = part1(`Register A: 2024
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`);
    assert.deepEqual(result[0], '4,2,5,6,7,7,7,7,3,1,0');
    assert.equal(result[1].a, 0);
});

test('part1: e4', () => {
    const result = part1(`Register A: 0
Register B: 29
Register C: 0

Program: 1,7`);
    assert.equal(result[1].b, 26);
});

test('part1: e5', () => {
    const result = part1(`Register A: 0
Register B: 2024
Register C: 43690

Program: 4,0`);
    assert.equal(result[1].b, 44354);
});

test('part1: example1', () => {
    const result = part1(example1);
    assert.deepEqual(result[0], '4,6,3,5,6,3,5,2,1,0');
});

test('part1: real', () => {
    const result = part1(realInput);
    assert.deepEqual(result[0], '6,2,7,2,3,1,6,0,5');
});

test('part1 -> part2: example1', () => {
    const result1 = part1(`Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`);
    assert.deepEqual(result1[0], '5,7,3,0');

    const result2 = part1(`Register A: 117440
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`);
    assert.deepEqual(result2[0], '0,3,5,4,3,0');
});

// test('part2: example1', () => {
//     const result = part2(`Register A: 2024
// Register B: 0
// Register C: 0
//
// Program: 0,3,5,4,3,0`);
//     assert.equal(result, 117440);
// });
//
// test('part2: real', () => {
//     const result = part2(realInput);
//     assert.equal(result, 117440);
// });




