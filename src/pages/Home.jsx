import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center px-6 bg-gradient-to-br from-indigo-50 to-white text-center">
      <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-700 mb-4 drop-shadow-md">
        Algorithm Visualizer
      </h1>
      <p className="text-lg md:text-xl text-gray-700 max-w-2xl mb-10">
        A modern tool to visually understand how algorithms like sorting and graph traversal work step-by-step. Perfect for learning and interviews.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl w-full">
        {/* Sorting */}
        <Link to="/sorting" className='h-full'>
          <div className="group cursor-pointer bg-white hover:shadow-xl transition-all duration-300 rounded-xl p-6 border border-gray-200 hover:border-indigo-500 h-full">
            <div className="text-3xl mb-2 text-indigo-600 group-hover:scale-105 transition-transform">🧮</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-1">Sorting Visualizer</h2>
            <p className="text-gray-600 text-sm">
              Explore sorting algorithms like Bubble Sort, Insertion Sort, Selection Sort with real-time animations and controls.
            </p>
          </div>
        </Link>

        {/* Graphs */}
        <Link to="/graph" className='h-full'>
          <div className="group cursor-pointer bg-white hover:shadow-xl transition-all duration-300 rounded-xl p-6 border border-gray-200 hover:border-emerald-500 h-full">
            <div className="text-3xl mb-2 text-emerald-600 group-hover:scale-105 transition-transform">🧭</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-1">Graph Algorithms</h2>
            <p className="text-gray-600 text-sm">
              Visualize BFS, DFS, Dijkstra’s Algorithm and see how graph traversal works in real-time.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
