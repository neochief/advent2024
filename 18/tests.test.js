import {assert, test} from 'vitest'
import {example, realInput} from "./input.js";
import {part1, part2, parseInput} from "./code.js";

test('input', () => {
    const {width, height, bytes} = parseInput(example);
    assert.equal(width, 7);
    assert.equal(height, 7);
    assert.equal(bytes.length, 22);
    assert.deepEqual(bytes[0], [5, 4]);
});

function assertResultIs(result, expected) {
    assert.strictEqual(result[0], expected, result[1])
}

test('part1: example', () => {
    assertResultIs(part1(example), 22);
});

test('part1: realInput', () => {
    assertResultIs(part1(realInput), 506);
});

test('part2: example', () => {
    assert.equal(part2(example)[0], '6,1');
});

test('part2: realInput', () => {
    assert.equal(part2(realInput)[0], '62,6');
});