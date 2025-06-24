export async function quickSort(arr, setArray, setColorMap, setSorting, speed) {
  setSorting(true);
  const array = [...arr];
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  async function partition(low, high) {
    const pivot = array[high];
    let i = low;

    for (let j = low; j < high; j++) {
      setColorMap({ [j]: 'bg-red-500', [high]: 'bg-yellow-500' });
      await delay(speed);

      if (array[j] < pivot) {
        [array[i], array[j]] = [array[j], array[i]];
        setArray([...array]);
        i++;
        await delay(speed);
      }
      setColorMap({});
    }

    [array[i], array[high]] = [array[high], array[i]];
    setArray([...array]);
    await delay(speed);

    return i;
  }

  async function quickSortHelper(low, high) {
    if (low < high) {
      const pi = await partition(low, high);
      await quickSortHelper(low, pi - 1);
      await quickSortHelper(pi + 1, high);
    }
  }

  await quickSortHelper(0, array.length - 1);
  setSorting(false);
}
