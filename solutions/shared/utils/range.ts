/**
 * range utilities
 */

export type Range = [start: number, end: number];

export function parseRange(rangeStr: string, delimiter = '-'): Range {
    const [startStr, endStr] = rangeStr.split(delimiter);
    return [Number(startStr), Number(endStr)];
}

export function rangeContains(range: Range, value: number): boolean {
    return value >= range[0] && value <= range[1];
}

export function rangesOverlap(rangeA: Range, rangeB: Range): boolean {
    return rangeA[0] <= rangeB[1] && rangeB[0] <= rangeA[1];
}

export function mergeRanges(ranges: Range[]): Range[] {
    if (ranges.length === 0) return [];
    
    // Sort ranges by their start values
    ranges.sort((a, b) => a[0] - b[0]);
    const merged: Range[] = [];
    let currentRange = ranges[0];

    for (let i = 1; i < ranges.length; i++) {
        const nextRange = ranges[i];
        if (rangesOverlap(currentRange, nextRange)) {
            // Merge overlapping ranges
            currentRange = [currentRange[0], Math.max(currentRange[1], nextRange[1])];
        } else {
            merged.push(currentRange);
            currentRange = nextRange;
        }
    }
    merged.push(currentRange);
    return merged;
}

export function rangeLength(range: Range): number {
    return range[1] - range[0] + 1;
}