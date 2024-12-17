import {parseInput, testInput} from "./input.js";

console.log(run());

function _(v) {
    return JSON.parse(JSON.stringify(v));
}

export function run(grid) {
    if (!grid) {
        grid = parseInput(testInput);
    }

    let start, end;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === 'S') {
                start = {x: i, y: j, d: [0, 1], type: 'S', win: 'E', price: 0, path: []};
            }
        }
    }

    const visited = new Array(grid.length).fill(0).map(() => new Array(grid[0].length).fill(0));
    for (let i = 0; i < visited.length; i++) {
        for (let j = 0; j < visited[i].length; j++) {
            visited[i][j] = [];
        }
    }

    let winners = [];
    let tracks = [];
    tracks.push(start);

    let c = 0;
    while (tracks.length) {
        let newTracks = [];
        for (let i = 0; i < tracks.length; i++) {
            newTracks = newTracks.concat(traverse(grid, visited, tracks[i], winners));
        }
        tracks = newTracks;

        console.log(c, tracks.length, winners.length);
        c++;
    }

    if (!winners.length) {
        throw new Error('No path found');
    }

    const winner = winners.sort((a, b) => a.price - b.price)[0];

    const result = winner.price;

    for (let i = 1; i < winner.path.length - 1; i++) {
        const p = winner.path[i];
        const n = winner.path[i + 1];
        grid[p.x][p.y] = n.d ? n.d[0] > 0 ? 'v' : n.d[0] < 0 ? '^' : n.d[1] > 0 ? '>' : '<' : '?';
    }

    const str = grid.map(s => s.join('')).join('\n');

    return [result, str];
}

function traverse(grid, visited, track, winners) {
    const x = track.x;
    const y = track.y;

    if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length) {
        return [];
    }

    if (grid[x][y] !== '.' && grid[x][y] !== track.type && grid[x][y] !== track.win) {
        return [];
    }

    if (track.path.find(p => p.x === x && p.y === y)) {
        return [];
    }

    if (track.path.length) {
        const lastTrack = track.path[track.path.length - 1];
        lastTrack.price = lastTrack.d[0] !== track.d[0] || lastTrack.d[1] !== track.d[1] ? 1001 : 1;
    }

    track.price = track.path.reduce((acc, p) => acc + (p.price || 0), 0);

    track.path = track.path.concat({
        x,
        y,
        d: track.d,
        aPrice: track.price,
    });

    if (visited[x][y].length) {
        const first = visited[x][y].find(t => t.type === track.type && t.d[0] === track.d[0] && t.d[1] === track.d[1]);

        if (!first) {
            visited[x][y].push(track);
        } else {
            if (first.price > track.price) {
                visited[x][y] = visited[x][y].filter(t => t.type !== track.type || t.d[0] !== track.d[0] || t.d[1] !== track.d[1]);
                visited[x][y].push(track);
            } else if (first.price === track.price) {
                visited[x][y].push(track);
                return [];
            } else {
                return [];
            }
        }
    } else {
        visited[x][y].push(track);
    }

    if (grid[x][y] === track.win) {
        winners.push({path: track.path, price: track.path.reduce((acc, p) => acc + (p.price || 0), 0)});
        return [];
    }

    return [
        {x: x - 1, y, d: [-1, 0], type: track.type, win: track.win, path: _(track.path)},
        {x: x + 1, y, d: [1, 0], type: track.type, win: track.win, path: _(track.path)},
        {x, y: y - 1, d: [0, -1], type: track.type, win: track.win, path: _(track.path)},
        {x, y: y + 1, d: [0, 1], type: track.type, win: track.win, path: _(track.path)},
    ]
}
