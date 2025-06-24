export async function selectionSort(arr, setArray, setColorMap, setSorting, speed) {
  setSorting(true);
  const array = [...arr];
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const n = array.length;
  for (let i = 0; i < n; i++) {
    let minIdx = i;

    for (let j = i + 1; j < n; j++) {
      // Highlight current min and j
      setColorMap({
        [minIdx]: 'bg-green-500',
        [j]: 'bg-red-500',
      });
      await delay(speed);

      if (array[j] < array[minIdx]) {
        minIdx = j;
        setColorMap({
          [minIdx]: 'bg-green-500',
          [i]: 'bg-yellow-500',
        });
        await delay(speed);
      }
    }

    if (minIdx !== i) {
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
      setArray([...array]);
      await delay(speed);
    }

    setColorMap({});
  }

  setSorting(false);
}
