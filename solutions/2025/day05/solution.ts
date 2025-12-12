import { EMPTY_LINE_REGEX, readLines } from "../../shared/utils/input";
import { mergeRanges, parseRange, rangeContains, rangeLength } from "../../shared/utils/range";

export async function part1(input: string): Promise<number | string | bigint> {
    const sections = readLines(input, (line) => line, EMPTY_LINE_REGEX);
    const ranges = readLines(sections[0], (line) => parseRange(line, '-'));
    const availableIds = readLines(sections[1], line => Number(line));

    const freshIds: number[] = [];

    for (const id of availableIds) {
        let inAnyRange = ranges.some(r => rangeContains(r, id));
        if (inAnyRange) {
            freshIds.push(id);
        }
    }

    return freshIds.length;
}

export async function part2(input: string): Promise<number | string | bigint> {
    const sections = readLines(input, (line) => line, EMPTY_LINE_REGEX);
    const ranges = readLines(sections[0], (line) => parseRange(line, '-'));

    let freshIdCount = 0;
    const mergedRanges = mergeRanges(ranges);

    for (const range of mergedRanges) {
        freshIdCount += rangeLength(range);
    }

    return freshIdCount;
}
