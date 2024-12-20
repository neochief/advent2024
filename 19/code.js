import {example, realInput} from "./input.js";

if (typeof process !== "undefined" && process.argv[2] === "run") {
    console.log(part1(realInput));
}

const cache = {};

export function part1(input) {
    const {towels, designs} = parseInput(input);

    const result = findPossibleDesigns(towels, designs);

    return result;
}

export function part2(input) {

}

export function parseInput(input) {
    const [rawTowels, rawDesigns] = input.trim().split("\n\n");
    return {
        towels: rawTowels.split(", "),
        designs: rawDesigns.split("\n")
    };
}

function findPossibleDesigns(towels, designs) {
    let possibleDesigns = 0;

    for (let i = 0; i < designs.length; i++) {

        const possibleTowels = towels.filter(towel => designs[i].includes(towel));

        const towelsByLength = new Array(9).fill(0).map(() => []);
        possibleTowels.forEach((towel) => {
            towelsByLength[towel.length].push(towel);
        });
        for (let i = 0; i < towelsByLength.length; i++) {
            towelsByLength[i].sort();
        }

        const result = ifPossible(towelsByLength, designs[i]);
        if (result) {
            possibleDesigns++;
        }
    }

    return possibleDesigns;
}

function ifPossible(towelsByLength, design) {
    if (design.length === 0) {
        return true;
    }

    if (cache[design] !== undefined) {
        return cache[design];
    }

    for (let i = Math.min(design.length, towelsByLength.length - 1); i > 0; i--) {

        if (towelsByLength[i].length === 0) {
            continue;
        }

        for (let j = 0; j < towelsByLength[i].length; j++) {
            if (design.length === i) {
                if (design === towelsByLength[i][j]) {
                    cache[design] = true;
                    return true;
                }
            } else {
                const parts = design.split(towelsByLength[i][j]);
                if (parts.length > 1) {
                    const result = parts.reduce((acc, part) => {
                        return acc && ifPossible(towelsByLength, part);
                    }, true);

                    cache[design] = true;

                    if (result) {
                        return true;
                    }
                }
            }
        }
    }

    cache[design] = false;

    return false;
}

//
// function findAllCombinations(towels, design) {
//     const combinations = [];
//
//     if (design.length === 0) {
//         return combinations;
//     }
//
//     for (let i = 0; i < towels.length; i++) {
//         const towel = towels[i];
//
//         if (design.startsWith(towel)) {
//             const remainingLetters = design.slice(towel.length);
//
//             if (remainingLetters.length === 0) {
//                 combinations.push([towel]);
//             } else {
//                 const subcombinations = findCombinations(towels, remainingLetters);
//                 if (subcombinations.length) {
//                     subcombinations.forEach(subcombination => {
//                         combinations.push([towel].concat(subcombination));
//                     });
//                 }
//             }
//         }
//     }
//
//     return combinations;
// }

