export async function bubbleSort(arr, setArray, setColorMap, setSorting, speed) {
  setSorting(true);
  const array = [...arr];
  const n = array.length;

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      const tempColors = {};
      tempColors[j] = 'bg-red-500';
      tempColors[j + 1] = 'bg-red-500';
      setColorMap(tempColors);
      await delay(speed);
      
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        setArray([...array]);
        await delay(speed);
      }

      // Remove highlight
      setColorMap({});
    }
  }

  setSorting(false);
}
