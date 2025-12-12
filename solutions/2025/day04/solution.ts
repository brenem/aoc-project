import { parseGrid, getAllNeighbors, getCell, Point } from '../../shared/utils/grid';

export async function part1(input: string): Promise<number | string | bigint> {
    const parsedGrid = parseGrid(input);
    const rollLocations = getRollLocations(parsedGrid);
    return rollLocations.length;
}

export async function part2(input: string): Promise<number | string | bigint> {
    const parsedGrid = [ ...parseGrid(input) ];
    let rollLocations = getRollLocations(parsedGrid);

    let totalRemovals = 0;
    while (rollLocations.length > 0) {
        for (const loc of rollLocations) {
            parsedGrid[loc.x][loc.y] = '.';
        }

        totalRemovals += rollLocations.length;

        rollLocations = getRollLocations(parsedGrid);
    }

    return totalRemovals;
}

function getRollLocations(grid: string[][]): Point[] {
    const rollLocations: Point[] = [];
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            const currValue = getCell(grid, { y: r, x: c });

            if (currValue !== '@') {
                continue;
            }
            
            const neighbors = getAllNeighbors({ y: r, x: c});
            let rollCount = 0;
            for (const neighbor of neighbors) {
                const nValue = getCell(grid, neighbor);
                if (nValue === '@') {
                    rollCount++;
                }
            }
            if (rollCount < 4) {
                rollLocations.push({ x: r, y: c });
            }
        }
    }

    return rollLocations;
}
