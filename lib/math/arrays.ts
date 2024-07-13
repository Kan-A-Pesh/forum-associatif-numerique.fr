// https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
export function uniq(a: string[]) {
    const seen: { [key: string]: boolean } = {};
    return a.filter((item) => {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}
