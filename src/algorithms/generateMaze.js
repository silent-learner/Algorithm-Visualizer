export function generateMaze(grid, setGrid) {
    const numRows = grid.length;
    const numCols = grid[0].length;
    const visited = Array.from({ length: numRows }, () => Array(numCols).fill(false));
    const startNode = { row: 1, col: 1 }; 
    const endNode = { row: numRows - 2, col: numCols - 2 }; 
    const directions = [
        [-1, 0], 
        [1, 0],  
        [0, -1], 
        [0, 1]   
    ];

    for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
            grid[r][c].isVisited = false;
            grid[r][c].isQueued = false;
            grid[r][c].isPath = false;
            grid[r][c].isWall = false; 
            grid[r][c].isStart = false; 
            grid[r][c].isEnd = false; 
            if(r%2 == 0 || c%2 == 0) {
                grid[r][c].isWall = true; 
            }
            if(r == 1 && c == 1) {
                grid[r][c].isStart = true; 
            }
            if(r == numRows - 2 && c == numCols - 2) {
                grid[r][c].isEnd = true; 
            }
        }
    }
    
    setGrid([...grid]); 

    
    
    function carveMaze(r, c) {
        grid[r][c].isVisited = true;
    
        
        const shuffledDirections = directions.sort(() => Math.random() - 0.5);
    
        for (const [dr, dc] of shuffledDirections) {
            const newRow = r + dr * 2;
            const newCol = c + dc * 2;
    
            if (
                newRow >= 0 && newRow < numRows &&
                newCol >= 0 && newCol < numCols &&
                !grid[newRow][newCol].isVisited
            ) {
                grid[r + dr][c + dc].isWall = false; 
                carveMaze(newRow, newCol);
            }
        }
    }
    
    
    carveMaze(startNode.row, startNode.col);

    for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
            grid[r][c].isVisited = false;
            grid[r][c].isQueued = false;
            grid[r][c].isPath = false;
        }
    }
    
    
    grid[startNode.row][startNode.col].isWall = false;
    grid[endNode.row][endNode.col].isWall = false;
    
    setGrid([...grid]); 
    }