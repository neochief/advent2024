import {assert, test} from 'vitest'
import {example, realInput} from "./input.js";
import {part1, part2, parseInput} from "./code.js";

test('input', () => {
    const {towels, designs} = parseInput(example);
    assert.equal(towels.length, 8);
    assert.equal(towels[0], 'r');
    assert.equal(designs.length, 8);
    assert.equal(designs[0], 'brwrr');
});

test('part1: example', () => {
    assert.equal(part1(example), 6);
});

test('part1: realInput', () => {
    assert.equal(part1(realInput), 6);
});
