# 🧠 Algorithm Visualizer

An interactive web-based visualizer for sorting and graph traversal algorithms, built using **React 19**, **Tailwind CSS**, and the **MERN stack**.

---

## 🚀 Features

### 🔢 Sorting Visualizer

- Adjustable array size and sorting speed
- Highlighted comparisons with animations
- Supported algorithms:
  - Bubble Sort
  - Insertion Sort
  - Selection Sort
  - Merge Sort
  - Quick Sort (Coming Soon)

### 📊 Graph Algorithm Visualizer

- Grid-based pathfinding
- Interactive wall, start, and end node placement
- Animated traversal with color-coded nodes
- Supported algorithms:
  - Breadth-First Search (BFS)
  - Depth-First Search (DFS)
  - Dijkstra & A* (Planned)

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Tailwind CSS, Vite
- **State Management**: React Hooks
- **Backend (Planned)**: Node.js, Express, MongoDB (for storing custom mazes, sessions)

---

## 📂 Project Structure

```bash
src/
├── components/         # Reusable UI components (Navbar, Footer, etc.)
├── pages/
│   ├── Sorting.jsx     # Sorting visualizer page
│   └── Graph.jsx      # Graph algorithms page
|   └── Home.jsx      # Graph algorithms page
├── algorithms/
│   ├── bubbleSort.js
│   ├── insertionSort.js
│   ├── selectionSort.js
│   ├── mergeSort.js
│   ├── bfs.js
│   ├── dfs.js
│   └── graphAlgorithms.js
└── App.jsx
```

## 📌 To-Do

- [ ] Add Dijkstra,  A*
- [ ] Add speed slider to Graph visualizer
- [ ] Add weighted node support
- [ ] Export/share custom maze configurations

---

## ✨ Author

**Mohammad Kashif Khan**
🏫 M.Tech, IIT Bombay
🔗 [LinkedIn](https://www.linkedin.com/in/mohammad-kashif-khan-826754207/) • [GitHub](https://github.com/silent-learner)
