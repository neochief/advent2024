import {example, realInput} from "./input.js";

const CellType = Object.freeze({
    WALL: '#',
    EMPTY: '.',
    START: 'S',
    END: 'E',
    SEAT: 'O',
});

const DEBUG = false;

if (typeof process !== "undefined" && process.argv[2] === "run") {
    console.log(part2(realInput));
}

export function part1(input) {
    const {width, height, pt1size, bytes} = parseInput(input);

    const start = {x: 0, y: 0};
    const end = {x: width - 1, y: height - 1};
    const grid = new Array(width).fill(0).map(() => new Array(height).fill(CellType.EMPTY));
    for (let i = 0; i < pt1size; i++) {
        const [y, x] = bytes[i];
        grid[x][y] = CellType.WALL;
    }

    const winner = findPath(grid, start, end);
    const tracks = trackToArray(winner);
    const map = renderGrid(grid, tracks);

    return [tracks.length - 1, map];
}

export function part2(input) {
    const {width, height, bytes} = parseInput(input);
    const start = {x: 0, y: 0};
    const end = {x: width - 1, y: height - 1};
    const grid = new Array(width).fill(0).map(() => new Array(height).fill(CellType.EMPTY));
    for (let i = 0; i < bytes.length; i++) {
        const [y, x] = bytes[i];
        grid[x][y] = CellType.WALL;

        try {
            findPath(grid, start, end);
        } catch (e) {
            return [bytes[i].join(','), renderGrid(grid)];
        }
    }
}

export function parseInput(input) {
    const [width, height, pt1size, list] = input;
    const bytes = list.split('\n').map(line => line.split(',').map(Number));
    return {width, height, pt1size, bytes};
}

function findPath(grid, start, end) {
    const visited = new Array(grid.length).fill(0).map(() => new Array(grid[0].length).fill(0));
    for (let i = 0; i < visited.length; i++) {
        for (let j = 0; j < visited[i].length; j++) {
            visited[i][j] = [];
        }
    }

    let winners = [];
    let tracks = [];
    tracks.push({
        x: start.x,
        y: start.y,
        prev: undefined,
    });

    let c = 0;
    while (tracks.length) {
        let allNewTracks = [];
        for (let i = 0; i < tracks.length; i++) {
            const newTracks = traverse(grid, visited, tracks[i], end, winners, c);
            allNewTracks = allNewTracks.concat(newTracks);
        }
        tracks = allNewTracks;

        if (DEBUG) {
            console.log(c, tracks.length);
            console.log(c, tracks.length, ": ", tracks.map(t => t.x + "/" + t.y).join(' '), winners.length);
            console.log(renderGrid(grid, tracks, visited));
        }

        c++;
    }

    if (!winners.length) {
        throw new Error('No path found');
    }

    const winner = winners[0];

    return winner;
}

function traverse(grid, visited, track, end, winners, c) {
    const x = track.x;
    const y = track.y;
    const d = track.d;

    if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length) {
        return [];
    }

    if (grid[x][y] === CellType.WALL) {
        return [];
    }

    if (findInPath(track, x, y, d)) {
        return [];
    }

    if (visited[x][y].length) {
        return [];
    } else {
        visited[x][y].push(track);
    }

    if (x === end.x && y === end.y) {
        winners.push(track);
        return [];
    }

    // Add new tracks.

    const directions = [
        [0, -1],
        [1, 0],
        [0, 1],
        [-1, 0],
    ]

    const newTracks = [];

    for (let i = 0; i < directions.length; i++) {
        const nums = directions[i];

        const nx = x + nums[0];
        const ny = y + nums[1];

        if (nx < 0 || nx >= grid.length || ny < 0 || ny >= grid[0].length) {
            continue;
        }

        if (grid[nx][ny] === CellType.WALL) {
            continue;
        }
        //
        // // Don't return, unless there's no other way to go.
        // if (isOpposite(dir, d)) {
        //     continue;
        // }

        newTracks.push({x: nx, y: ny, prev: track});
    }

    // Return only if there's no other way to go.
    // if (c === 0) {
    //     const dir = getOppositeDirection(d);
    //     const nums = getDirectionNums(dir);
    //     const nx = x + nums[0];
    //     const ny = y + nums[1];
    //     newTracks.push({x: nx, y: ny, prev: track});
    // }

    return newTracks;
}

function findInPath(track, x, y, d) {
    if (track.prev === undefined) {
        return false;
    }

    if (track.prev.x === x && track.prev.y === y) {
        return true;
    }

    return findInPath(track.prev, x, y, d);
}

function trackToArray(track, flatterned = []) {
    flatterned.push(track);
    if (track.prev) {
        trackToArray(track.prev, flatterned);
    }
    return flatterned;
}

function renderGrid(grid, tracks = [], visited = undefined) {
    const render = JSON.parse(JSON.stringify(grid));
    if (tracks.length) {
        for (let i = tracks.length - 1; i >= 0; i--) {
            render[tracks[i].x][tracks[i].y] = render[tracks[i].x][tracks[i].y] === '.' ? CellType.SEAT : render[tracks[i].x][tracks[i].y];
        }
    }
    if (visited) {
        for (let i = 0; i < visited.length; i++) {
            for (let j = 0; j < visited[i].length; j++) {
                if (visited[i][j].length) {
                    render[i][j] = 'X';
                }
            }
        }
    }
    let str = render.map(s => s.join('')).join('\n');
    return str;
}
