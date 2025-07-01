import { useState } from 'react';
import { graphAlgorithms } from '../algorithms/graphAlgorithms';
import { generateMaze } from '../algorithms/generateMaze';


const NUM_ROWS = 21;
const NUM_COLS = 41;

const createEmptyGrid = () => {
  const grid = [];
  for (let row = 0; row < NUM_ROWS; row++) {
    const currentRow = [];
    for (let col = 0; col < NUM_COLS; col++) {
      currentRow.push({
        row,
        col,
        isStart: row === 10 && col === 5,
        isEnd: row === 10 && col === 35,
        isWall: false,
      });
    }
    grid.push(currentRow);
  }
  return grid;
};



const Graphs = () => {
  const [grid, setGrid] = useState(createEmptyGrid());
  const [isMousePressed, setIsMousePressed] = useState(false);
  const [delay, setdelay] = useState(50);
  const [running, setrunning] = useState(false);
  const [mode, setMode] = useState('none'); // 'none', 'start', 'end'
  const [selectedAlgo, setSelectedAlgo] = useState('bfs');


  const updateGridNode = (row, col, updater) => {
    const newGrid = grid.map((r, rIdx) =>
      r.map((node, cIdx) => {
        if (rIdx === row && cIdx === col) {
          return updater(node);
        }
        return node;
      })
    );
    setGrid(newGrid);
  };

  const handleCellClick = (row, col) => {
    const node = grid[row][col];

    if (mode === 'start') {
      // Reset old start
      const newGrid = grid.map((r) =>
        r.map((n) => (n.isStart ? { ...n, isStart: false } : n))
      );
      newGrid[row][col].isStart = true;
      setGrid(newGrid);
      setMode('none');
    } else if (mode === 'end') {
      const newGrid = grid.map((r) =>
        r.map((n) => (n.isEnd ? { ...n, isEnd: false } : n))
      );
      newGrid[row][col].isEnd = true;
      setGrid(newGrid);
      setMode('none');
    } else {
      // Toggle wall if not start/end
      if (!node.isStart && !node.isEnd) {
        updateGridNode(row, col, (n) => ({ ...n, isWall: !n.isWall }));
      }
    }
  };

  const getCellClass = (node) => {
    if (node.isStart) return 'bg-gradient-to-r from-green-500 to-green-700';
    if (node.isEnd) return 'bg-red-500';
    if (node.isPath) return 'bg-gradient-to-r from-yellow-400 to-yellow-300 animate-pulse';
    if (node.isQueued) return 'bg-gradient-to-r from-purple-400 to-purple-500';
    if (node.isVisited) return 'bg-blue-400';
    if (node.isWall) return 'bg-gray-800';
    return 'bg-white';
  };


  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-4 text-indigo-600">
        Graph Algorithms Visualizer
      </h1>

      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        <div className="flex gap-4 flex-wrap items-center justify-center">
          <button
            disabled={running}
            onClick={() => setMode('start')}
            className={`px-4 py-2 rounded text-white disabled:cursor-not-allowed disabled:bg-green-400 ${mode === 'start' ? 'bg-green-600' : 'bg-green-500 hover:bg-green-600'}`}
          >
            Set Start Node
          </button>
          <button
            disabled={running}
            onClick={() => setMode('end')}
            className={`px-4 py-2 rounded text-white disabled:cursor-not-allowed disabled:bg-red-400 ${mode === 'end' ? 'bg-red-600' : 'bg-red-500 hover:bg-red-600'}`}
          >
            Set End Node
          </button>
          <button
            disabled={running}
            onClick={() => setGrid(createEmptyGrid())}
            className="bg-gray-700 hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400 text-white px-4 py-2 rounded"
          >
            Reset Grid
          </button>
          <button
            disabled={running}
            onClick={() => {
              generateMaze(grid, setGrid);
            }}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400 text-white px-4 py-2 rounded"
          >
            Generate Random Grid
          </button>
          <select
            disabled={running}
            value={selectedAlgo}
            onChange={(e) => setSelectedAlgo(e.target.value)}
            className="rounded bg-white shadow px-3 py-2 border text-sm hover:border-yellow-500 focus:outline-none"
          >
            {Object.entries(graphAlgorithms).map(([key, algo]) => (
              <option key={key} value={key}>
                {algo.name}
              </option>
            ))}
          </select>
          <div className="flex flex-col items-center mb-4">
            <label htmlFor="length" className="mb-1 text-gray-700 font-medium disabled:cursor-not-allowed disabled:bg-gray-400">
              Delay : {delay}
            </label>
            <input
              type="range"
              id="delay"
              min="20"
              max="200"
              value={delay}
              disabled={running}
              onChange={(e) => setdelay(Number(e.target.value))}
              className="w-64 accent-yellow-500"
            />
          </div>

          <button
            onClick={() => {
              const algoFunc = graphAlgorithms[selectedAlgo]?.func;
              if (!algoFunc) return;

              let startNode = null, endNode = null;
              for (let r = 0; r < NUM_ROWS; r++) {
                for (let c = 0; c < NUM_COLS; c++) {
                  if (grid[r][c].isStart) startNode = grid[r][c];
                  if (grid[r][c].isEnd) endNode = grid[r][c];
                }
              }

              if (startNode && endNode) {
                algoFunc(grid, startNode, endNode, setGrid, delay, setrunning);
              }
            }}
            disabled={running}
            className="bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded disabled:cursor-not-allowed disabled:bg-yellow-400"
          >
            Visualize
          </button>
        </div>


      </div>

      {/* Grid */}
      <div
        className="bg-gradient-to-br from-slate-100 to-slate-200 p-4 rounded-md shadow-lg border-blue-700 border-2"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${NUM_COLS}, 20px)`,
          justifyContent: 'center',
        }}
        onMouseLeave={() => setIsMousePressed(false)}
      >
        {grid.map((row, rowIdx) =>
          row.map((node, nodeIdx) => {
            const baseClasses = `w-5 h-5 border border-gray-300 transition-all duration-100`;

            return (
              <div
                key={`${rowIdx}-${nodeIdx}`}
                className={`${baseClasses} ${getCellClass(node)}`}
                onMouseDown={() => {
                  setIsMousePressed(true);
                  handleCellClick(rowIdx, nodeIdx);
                }}
                onMouseEnter={() => {
                  if (isMousePressed && mode === 'none') {
                    handleCellClick(rowIdx, nodeIdx);
                  }
                }}
                onMouseUp={() => setIsMousePressed(false)}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Graphs;
