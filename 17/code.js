import {example1, example2, realInput} from "./input.js";

const Opcodes = Object.freeze({
    adv: 0,
    bxl: 1,
    bst: 2,
    jnz: 3,
    bxc: 4,
    out: 5,
    bdv: 6,
    cdv: 7,
});

const A = 12;
let B, C, X;

B = (A % 8);
B = (B ^ 3);
C = (A >> B);
B = (B ^ 5);
B = (B ^ C);
X = (B % 8);




//X = ((((A % 8) ^ 3) ^ 5) ^ (((A % 8) ^ 3) >> (A % 8))) % 8;

//console.log(X);




if (typeof process !== "undefined" && process.argv[2] === "run") {
    console.log(part2(example2));
}

export function part1(input) {
    let {a, b, c, program} = parseInput(input);
    return run({a, b, c, program});
}

export function part2(input) {
    let {a, b, c, program} = parseInput(input);

    const max = 9007199254740992;
    const sta = 117440;
    const inc = 1;

    //a = 2024;   // 00000011111101000
    //a = 117440; // 11100101011000000

    const aa = dec2bin(a);

    "11100101011000";
    let num = '';
    for (let i = program.length - 1; i >= 0; i--) {
        const part = dec2bin(program[i]);
        num = num + part;
    }


    main: for (let ca = sta; ca < max; ca = ca + inc) {
        if (ca % 1000000 === 0) {
            console.log(ca);
        }

        let pointer = 0;
        let allOutput = [];
        let i = 0;
        a = ca;
        while (pointer < program.length) {
            let output;
            ({a, b, c, pointer, program, output} = cycle({a, b, c, pointer, program}));
            if (output !== undefined) {
                allOutput.push(output);

                if (allOutput.length === program.length && arraysEqual(allOutput, program)) {
                    return ca;
                } else if (!startsWithArray(program, allOutput)) {
                    continue main;
                }
            }
            i++;
        }
    }

    throw new Error('No solution found in maxIterations iterations.');
}

function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

function startsWithArray(arr, prefix) {
    if (prefix.length > arr.length) {
        return false;
    }
    for (let i = 0; i < prefix.length; i++) {
        if (arr[i] !== prefix[i]) {
            return false;
        }
    }
    return true;
}

export function run({a, b, c, program}) {
    let pointer = 0;
    let allOutput = [];
    let i = 0;
    while (pointer < program.length) {
        let output;
        ({a, b, c, pointer, program, output} = cycle({a, b, c, pointer, program}));
        if (output !== undefined) {
            allOutput.push(output);
        }
        i++;
    }

    return [allOutput.join(','), {a, b, c, pointer}];
}

function cycle({a, b, c, pointer, program}) {
    const opcode = program[pointer];
    pointer++;

    let operand;
    let output;
    switch (opcode) {
        case Opcodes.adv:
        case Opcodes.bxl:
        case Opcodes.bst:
        case Opcodes.bxc:
        case Opcodes.out:
        case Opcodes.bdv:
        case Opcodes.cdv:
            operand = getOperand(program, pointer);
            pointer++;
            break;
        case Opcodes.jnz:
            break;
        default:
            throw new Error(`Unknown opcode ${program[pointer]}`);
    }

    switch (opcode) {
        case Opcodes.adv:
            ({a, b, c, pointer} = adv(operand, a, b, c, pointer));
            break;
        case Opcodes.bxl:
            ({a, b, c, pointer} = bxl(operand, a, b, c, pointer));
            break;
        case Opcodes.bst:
            ({a, b, c, pointer} = bst(operand, a, b, c, pointer));
            break;
        case Opcodes.jnz:
            ({a, b, c, pointer, output} = jnz(operand, a, b, c, pointer, program));
            break;
        case Opcodes.bxc:
            ({a, b, c, pointer} = bxc(operand, a, b, c, pointer));
            break;
        case Opcodes.out:
            ({a, b, c, pointer, output} = out(operand, a, b, c, pointer));
            const aaaa = 3;
            break;
        case Opcodes.bdv:
            ({a, b, c, pointer} = bdv(operand, a, b, c, pointer));
            break;
        case Opcodes.cdv:
            ({a, b, c, pointer} = cdv(operand, a, b, c, pointer));
            break;
        default:
            throw new Error(`Unknown opcode ${program[pointer]}`);
    }

    return {a, b, c, pointer, program, output};
}

export function adv(operand, a, b, c, pointer) {
    const operandValue = combo(operand, a, b, c);
    a = a >> operandValue;
    return {a, b, c, pointer};
}

export function bxl(operand, a, b, c, pointer) {
    const operandValue = literal(operand, a, b, c);
    b = b ^ operandValue;
    return {a, b, c, pointer};
}

export function bst(operand, a, b, c, pointer) {
    const operandValue = combo(operand, a, b, c);
    b = operandValue % 8;
    return {a, b, c, pointer};
}

export function jnz(operand, a, b, c, pointer, program) {
    if (a === 0) {
        pointer++;
        return {a, b, c, pointer};
    }

    operand = getOperand(program, pointer);
    // Reset to jnz start before jump.
    pointer--;

    const operandValue = literal(operand);
    pointer = operandValue;

    return {a, b, c, pointer};
}

export function bxc(operand, a, b, c, pointer) {
    b = b ^ c;
    return {a, b, c, pointer};
}

export function out(operand, a, b, c, pointer) {
    const operandValue = combo(operand, a, b, c);
    const output = operandValue % 8;
    return {a, b, c, pointer, output};
}

export function bdv(operand, a, b, c, pointer) {
    const operandValue = combo(operand, a, b, c);
    b = a >> operandValue;
    return {a, b, c, pointer};
}

export function cdv(operand, a, b, c, pointer) {
    const operandValue = combo(operand, a, b, c);
    c = a >> operandValue;
    return {a, b, c, pointer};
}


function getOperand(program, pointer) {
    if (pointer + 1 > program.length) {
        throw new Error(`Out of bounds at ${pointer}`);
    }
    return program[pointer];
}

function literal(value) {
    return value;
}

function combo(value, a, b, c) {
    switch (value) {
        case 0:
        case 1:
        case 2:
        case 3:
            return value;
        case 4:
            return a;
        case 5:
            return b;
        case 6:
            return c;
        case 7:
            throw new Error(`Combo value 7 is reserved.`);
        default:
            throw new Error(`Unknown combo value ${value}`);
    }
}

export function parseInput(input) {
    const [registers, rawProgram] = input.trim().split('\n\n');

    const a = parseInt(registers.match(/Register A: (\d+)/)[1]);
    const b = parseInt(registers.match(/Register B: (\d+)/)[1]);
    const c = parseInt(registers.match(/Register C: (\d+)/)[1]);

    const program = rawProgram.match(/Program: (.+)$/)[1].split(',').map(x => parseInt(x));

    return {a, b, c, program};
}

function dec2bin(dec) {
    return zeroPad((dec >>> 0).toString(2), 3);
}

function zeroPad(num, places) {
    return String(num).padStart(places, '0');
}
