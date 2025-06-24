export async function insertionSort(arr, setArray, setColorMap, setSorting, speed) {
    setSorting(true);
    const array = [...arr];
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        const tempColors = { [i]: 'bg-green-500' };
        setColorMap(tempColors);
        await delay(speed);
        
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
            
            const tempColors = { [j + 1]: 'bg-red-500', [i]: 'bg-green-500' };
            setColorMap(tempColors);
            setArray([...array]);
            await delay(speed);
        }

        array[j + 1] = key;
        setArray([...array]);
        await delay(speed);
        setColorMap({});
    }

    setSorting(false);
}
