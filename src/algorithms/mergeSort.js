export async function mergeSort(arr, setArray, setColorMap, setSorting, speed) {
  setSorting(true);
  const array = [...arr];
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  async function merge(left, mid, right) {
    const leftPart = array.slice(left, mid + 1);
    const rightPart = array.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    while (i < leftPart.length && j < rightPart.length) {
      // Highlight elements being compared
      const leftIdx = left + i;
      const rightIdx = mid + 1 + j;

      setColorMap({ [leftIdx]: 'bg-orange-800', [rightIdx]: 'bg-red-500' });
      await delay(speed);

      if (leftPart[i] <= rightPart[j]) {
        array[k] = leftPart[i];
        i++;
      } else {
        array[k] = rightPart[j];
        j++;
      }

      setArray([...array]);
      k++;
      setColorMap({});
      await delay(speed);
    }

    while (i < leftPart.length) {
      array[k] = leftPart[i];
      setArray([...array]);
      k++; i++;
      await delay(speed);
    }

    while (j < rightPart.length) {
      array[k] = rightPart[j];
      setArray([...array]);
      k++; j++;
      await delay(speed);
    }
  }

  async function mergeSortHelper(left, right) {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    await mergeSortHelper(left, mid);
    await mergeSortHelper(mid + 1, right);
    await merge(left, mid, right);
  }

  await mergeSortHelper(0, array.length - 1);
  setSorting(false);
}
