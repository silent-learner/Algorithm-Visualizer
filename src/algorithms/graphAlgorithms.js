import { bfs } from './bfs';
import { dfs } from './dfs';
import { astar } from './astar';
import { greedyheuristic } from './greedyheuristic';

export const graphAlgorithms = {
    bfs: {
        name: 'Breadth-First Search',
        func: bfs,
    },
    dfs: {
        name: 'Depth-First Search',
        func: dfs
    },
    astar: {
        name: 'A* Search',
        func: astar
    },
    greedyheuristic : {
        name: 'Greedy Heuristic',
        func: greedyheuristic
    }
};
