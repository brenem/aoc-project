import { readLines } from "../../shared/utils/input";

export async function part1(input: string): Promise<number | string | bigint> {
    const grid = readLines(input, line => line.split(''));
    
    const { splits } = findSplits2(grid);
    return splits;
}

export async function part2(input: string): Promise<number | string | bigint> {
    const grid = readLines(input, line => line.split(''));
    
    const { beamSum } = findSplits2(grid);
    return beamSum;
}

// ported from https://github.com/7UpMan/aoc2025/blob/main/src/main/java/day07/Day07.java
function findSplits2(grid: string[][]): { splits: number; beamSum: number } {
    const rowWidth = grid[0].length;
    const beamLocations: number[] = Array(rowWidth).fill(0);
    beamLocations[grid[0].indexOf('S')] = 1;
    let splitCount = 0;

    for (let r = 1; r < grid.length; r++) {
        const row = grid[r];

        for (let c = 0; c < rowWidth; c++) {
            if (row[c] === '^') {
                if (beamLocations[c] > 0) {
                    splitCount++;

                    beamLocations[c - 1] += beamLocations[c];
                    beamLocations[c + 1] += beamLocations[c];
                    beamLocations[c] = 0;
                }
            }
        }
    }

    // sum of beam locations
    let beamSum = 0;
    for (let c = 0; c < rowWidth; c++) {
        beamSum += beamLocations[c];
    }

    return { splits: splitCount, beamSum };
}

// failed attempt
function findSplits(grid: string[][]): { splits: number; beamSum: number } {
    const beamIndexes: number[][] = [[grid[0].indexOf('S')]];
    let numSplits = 0;

    for (let row = 2; row < grid.length; row += 2) {
        const splitterIndexes: number[] = [];
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === '^') {
                splitterIndexes.push(col);
            }
        }

        const newBeamIndexes: number[] = [];
        const prevBeamIndexes = beamIndexes[row / 2 - 1];

        for (const beamIndex of prevBeamIndexes) {
            if (splitterIndexes.includes(beamIndex)) {
                newBeamIndexes.push(beamIndex - 1, beamIndex + 1);

                numSplits++;
            }
        }

        beamIndexes.push([...new Set(newBeamIndexes)]);
    }

    let beamSum = 0;
    for (const beams of beamIndexes) {
        for (const idx of beams) {
            beamSum += idx;
        }
    }

    return { splits: numSplits, beamSum };
}