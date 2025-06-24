export async function bfs(grid, startNode, endNode, setGrid, delay = 20) {
  const numRows = grid.length;
  const numCols = grid[0].length;
  const visited = Array.from({ length: numRows }, () => Array(numCols).fill(false));
  const prev = Array.from({ length: numRows }, () => Array(numCols).fill(null));
  const queue = [];

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

    for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      grid[r][c].isVisited = false;
      grid[r][c].isQueued = false;
      grid[r][c].isPath = false;
    }
  }

  queue.push(startNode);
  visited[startNode.row][startNode.col] = true;
//   console.log("BFS started from", startNode, "to", endNode);
  const directions = [
    [0, 1], [1, 0], [-1, 0], [0, -1]
  ];
  let found = false;
  while (queue.length > 0) {
      let size = queue.length
      while(size > 0){
            const current = queue.shift();
            grid[current.row][current.col].isQueued = false;
            // console.log(current);
            // If reached the end
            if (current.row === endNode.row && current.col === endNode.col) {
                found = true;
                break;
            }
            for (const [dr, dc] of directions) {
            const newRow = current.row + dr;
            const newCol = current.col + dc;
        
            if (
                newRow >= 0 && newRow < numRows &&
                newCol >= 0 && newCol < numCols &&
                !visited[newRow][newCol] &&
                !grid[newRow][newCol].isWall
            ) {
                visited[newRow][newCol] = true;
                prev[newRow][newCol] = current;
                queue.push({ row: newRow, col: newCol });
        
                grid[newRow][newCol].isVisited = true;
                grid[newRow][newCol].isQueued = true;
            }
        }
        size--;
    }
    setGrid([...grid.map(row => [...row])]); // trigger re-render
    await sleep(delay);
    if(found) break;
  }

  // Trace back path
  let curr = endNode;
  while (prev[curr.row][curr.col] !== null) {
    const { row, col } = curr;
    grid[row][col].isPath = true;
    curr = prev[row][col];
    setGrid([...grid.map(row => [...row])]);
    await sleep(delay);
  }
}
