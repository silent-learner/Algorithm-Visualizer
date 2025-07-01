import React, { useEffect, useState } from 'react';
import { bubbleSort } from '../algorithms/bubbleSort';
import { insertionSort } from '../algorithms/insertionSort';
import { selectionSort } from '../algorithms/selectionSort';
import { mergeSort } from '../algorithms/mergeSort';
import { quickSort } from '../algorithms/quickSort';


const Sorting = () => {
    const [array, setArray] = useState([]);
    const [sorting, setsorting] = useState(false);
    const [showVal, setshowVal] = useState(false);
    const [arrayLength, setArrayLength] = useState(20);
    const [speed, setSpeed] = useState(50);
    const [colorMap, setColorMap] = useState({});
    const [algorithm, setAlgorithm] = useState('bubble');

    const map = {
        'bubble': bubbleSort,
        'insertion': insertionSort,
        'selection': selectionSort,
        'merge': mergeSort,
        'quick': quickSort,
    }

    const handleSort = () => {
        map[algorithm]?.(array, setArray, setColorMap, setsorting, speed);
    };
    const generateArray = () => {
        const newArr = Array.from({ length: arrayLength }, () =>
            Math.floor(Math.random() * 100) + 10
        );
        setArray(newArr);
        // console.log(array);
    }
    useEffect(() => {
        generateArray();
    }, [arrayLength]);
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
                Sorting Algorithms Visualizer
            </h1>
            <div className="flex flex-wrap justify-center items-end gap-2 mb-10 h-[24rem] border border-gray-200 bg-white rounded-lg shadow-inner p-4">
                {array.map((val, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                        {arrayLength <= 30 && showVal && <div className="text-sm font-bold text-gray-600 mb-1">{val}</div>}
                        <div
                            style={{
                                height: `${val * 3}px`,
                                width: `${Math.max(6, 360 / arrayLength)}px`,
                            }}
                            className={`${colorMap[idx] || 'bg-gradient-to-t from-blue-100 to-blue-600'
                                } rounded-t-full transition-all duration-150`}
                        ></div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center gap-4 mb-4 flex-wrap">
                <div>
                    <label className="font-medium mr-2">Algorithm:</label>
                    <select
                        value={algorithm}
                        disabled={sorting}
                        onChange={(e) => setAlgorithm(e.target.value)}
                        className="rounded bg-white shadow px-3 py-2 border text-sm hover:border-yellow-500 focus:outline-none"
                    >
                        <option value="bubble">Bubble Sort</option>
                        <option value="insertion">Insertion Sort</option>
                        <option value="selection">Selection Sort</option>
                        <option value="merge">Merge Sort</option>
                        <option value="quick">Quick Sort</option>
                        {/* add more here later */}
                    </select>
                </div>
            </div>

            <div className="flex justify-center gap-4 flex-col lg:flex-row">
                <div className="flex gap-4 flex-wrap items-center justify-center">

                    <button
                        onClick={generateArray}
                        disabled={sorting}
                        className="bg-gray-800 text-white px-4 disabled:cursor-not-allowed py-2 rounded hover:bg-gray-700 disabled:opacity-50"
                    >
                        Generate New Array
                    </button>
                    <button
                        onClick={handleSort}
                        disabled={sorting}
                        className="bg-green-500 text-white px-4 disabled:cursor-not-allowed py-2 rounded hover:bg-green-400 disabled:opacity-50"
                    >
                        Start Sorting
                    </button>
                    <button
                        onClick={() => setshowVal(!showVal)}
                        disabled={arrayLength >= 30 || sorting}
                        className="bg-yellow-500 text-white disabled:cursor-not-allowed px-4 py-2 rounded hover:bg-yellow-400 disabled:opacity-50"
                    >
                        {!showVal ? "Show Values" : "Hide Values"}
                    </button>
                </div>

                <div className="flex flex-col items-center mb-4">
                    <label htmlFor="length" className="mb-1 text-gray-700 font-medium">
                        Array Length: {arrayLength}
                    </label>
                    <input
                        type="range"
                        id="length"
                        min="10"
                        max="100"
                        value={arrayLength}
                        disabled={sorting}
                        onChange={(e) => setArrayLength(Number(e.target.value))}
                        className="w-64 accent-yellow-500"
                    />
                </div>
                <div className="flex flex-col items-center mb-4">
                    <label htmlFor="length" className="mb-1 text-gray-700 font-medium">
                        Delay : {speed}
                    </label>
                    <input
                        type="range"
                        id="speed"
                        min="20"
                        max="200"
                        value={speed}
                        disabled={sorting}
                        onChange={(e) => setSpeed(Number(e.target.value))}
                        className="w-64 accent-yellow-500"
                    />
                </div>
            </div>
        </div>

    );
}

export default Sorting;
