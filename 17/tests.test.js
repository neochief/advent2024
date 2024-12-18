import {assert, test} from 'vitest'
import {example1, realInput} from "./input.js";
import {part1, parseInput, adv, bxl} from "./part1.js";

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

test('adv', () => {
    assert.deepEqual(adv(2, 64, 0, 0, 0), { a: 16, b: 0, c: 0, pointer: 0 });
    assert.deepEqual(adv(5, 64, 4, 0, 0), { a: 4, b: 4, c: 0, pointer: 0 });
    assert.deepEqual(adv(6, 64, 0, 12, 0), { a: 0, b: 0, c: 12, pointer: 0 });
});

test('bxl', () => {
    assert.deepEqual(bxl(2, 0, 64, 0, 0), { a: 0, b: 66, c: +0, pointer: +0 });
    assert.deepEqual(bxl(5, 0, 4, 0, 0), { a: 0, b: 1, c: +0, pointer: +0 });
    assert.deepEqual(bxl(6, 0, 0, 0, 0), { a: 0, b: 6, c: +0, pointer: +0 });
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
