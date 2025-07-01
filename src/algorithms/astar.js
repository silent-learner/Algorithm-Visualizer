export async function astar(grid, startNode, endNode, setGrid, delay = 20, setrunning) {
    setrunning(true);
    const numRows = grid.length;
    const numCols = grid[0].length;

    const openSet = [];
    const visited = Array.from({ length: numRows }, () => Array(numCols).fill(false));
    const prev = Array.from({ length: numRows }, () => Array(numCols).fill(null));
    const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

    // Reset grid visual states
    for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
            grid[r][c].isVisited = false;
            grid[r][c].isQueued = false;
            grid[r][c].isPath = false;
        }
    }

    const heuristic = (a, b) => Math.abs(a.row - b.row) + Math.abs(a.col - b.col);

    const start = {
        ...startNode,
        g: 0,
        f: heuristic(startNode, endNode)
    };

    openSet.push(start);

    while (openSet.length > 0) {
        // Sort by lowest f-score (simulate priority queue)
        openSet.sort((a, b) => a.f - b.f);
        const current = openSet.shift();
        const { row, col } = current;

        // Mark current node as visited
        visited[row][col] = true;
        grid[row][col].isVisited = true;
        grid[row][col].isQueued = false;

        // If end node is reached, reconstruct path
        if (row === endNode.row && col === endNode.col) {
            let curr = current;
            while (prev[curr.row][curr.col] !== null) {
                grid[curr.row][curr.col].isPath = true;
                curr = prev[curr.row][curr.col];
                setGrid([...grid.map(r => [...r])]);
                await sleep(delay);
            }
            setGrid([...grid.map(r => [...r])]);
            setrunning(false);
            return;
        }

        const directions = [
            [1, 0], [0, -1], [-1, 0], [0, 1]
        ];

        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;

            if (
                newRow >= 0 && newRow < numRows &&
                newCol >= 0 && newCol < numCols &&
                !grid[newRow][newCol].isWall
            ) {
                const gScore = current.g + 1;
                const hScore = heuristic({ row: newRow, col: newCol }, endNode);
                const fScore = gScore + hScore;

                const existing = openSet.find(n => n.row === newRow && n.col === newCol);

                if (!visited[newRow][newCol] && (!existing || gScore < existing.g)) {
                    prev[newRow][newCol] = current;

                    if (!existing) {
                        openSet.push({ row: newRow, col: newCol, g: gScore, f: fScore });
                        grid[newRow][newCol].isQueued = true;
                    } else {
                        existing.g = gScore;
                        existing.f = fScore;
                    }
                }
            }
        }

        setGrid([...grid.map(r => [...r])]);
        await sleep(delay);
    }

    // No path found
    console.log("No path found");
    setrunning(false);
    return;
}
