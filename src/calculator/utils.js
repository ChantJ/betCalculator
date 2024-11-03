export const systemBets = {
    3: ["2 out of 3"],
    4: ["2 out of 4", "3 out of 4"],
    5: ["2 out of 5", "3 out of 5", "4 out of 5"],
    6: ["2 out of 6", "3 out of 6", "4 out of 6", "5 out of 6"],
    7: ["2 out of 7", "3 out of 7", "4 out of 7", "5 out of 7", "6 out of 7"],
    8: ["2 out of 8", "3 out of 8", "4 out of 8", "5 out of 8", "6 out of 8", "7 out of 8"],
    9: ["2 out of 9", "3 out of 9", "4 out of 9", "5 out of 9", "6 out of 9", "7 out of 9", "8 out of 9"],
    10: ["2 out of 10", "3 out of 10", "4 out of 10", "5 out of 10", "6 out of 10", "7 out of 10", "8 out of 10", "9 out of 10"],
    11: ["2 out of 11", "3 out of 11", "4 out of 11", "5 out of 11", "6 out of 11", "7 out of 11", "8 out of 11", "9 out of 11", "10 out of 11"],
    12: ["2 out of 12", "3 out of 12", "4 out of 12", "5 out of 12", "6 out of 12", "7 out of 12", "8 out of 12", "9 out of 12", "10 out of 12", "11 out of 12"],
    13: ["2 out of 13", "3 out of 13", "4 out of 13", "5 out of 13", "6 out of 13", "7 out of 13", "8 out of 13", "9 out of 13", "10 out of 13", "11 out of 13", "12 out of 13"],
    14: ["2 out of 14", "3 out of 14", "4 out of 14", "5 out of 14", "6 out of 14", "7 out of 14", "8 out of 14", "9 out of 14", "10 out of 14", "11 out of 14", "12 out of 14", "13 out of 14"],
    15: ["2 out of 15", "3 out of 15", "4 out of 15", "5 out of 15", "6 out of 15", "7 out of 15", "8 out of 15", "9 out of 15", "10 out of 15", "11 out of 15", "12 out of 15", "13 out of 15", "14 out of 15"],
    16: ["2 out of 16", "3 out of 16", "4 out of 16", "5 out of 16", "6 out of 16", "7 out of 16", "8 out of 16", "9 out of 16", "10 out of 16", "11 out of 16", "12 out of 16", "13 out of 16", "14 out of 16", "15 out of 16"]
};

export const initialEventForm = (eventNum) => ({ name: `Event ${eventNum + 1}`, odds: '2.00', result: 'w' })
export const resultRadioOptions = [{ label: 'Won', value: 'w' }, { label: 'Lost', value: 'l' }, { label: 'Void', value: 'v' }]

export const displayNumber = (num) => {
    return parseFloat(num).toFixed(2)
}

export const checkNumber = (value, defaultValue) => {
    return (!isNaN(value) && value > 0) ? displayNumber(value) : displayNumber(defaultValue);
}
export function getCombinations(arr, length) {
    const result = [];

    const backtrack = (start, path) => {
        if (path.length === length) {
            result.push([...path]);
            return;
        }
        for (let i = start; i < arr.length; i++) {
            path.push(arr[i]);
            backtrack(i + 1, path);
            path.pop();
        }
    };

    backtrack(0, []);
    return result;
}