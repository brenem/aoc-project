import { isPointInPolygon, rayCast } from "../../shared/utils/geometry";
import { Point } from "../../shared/utils/grid";
import { readLines } from "../../shared/utils/input";

export async function part1(input: string): Promise<number | string | bigint> {
    const points: Point[] = readLines(input, (line) => ({
        x: parseInt(line.split(",")[0], 10),
        y: parseInt(line.split(",")[1], 10),
    }));

    const areas: number[] = [];
    for (const point of points) {
        const others = points.filter((p) => p !== point);
        for (const other of others) {
            const rise = Math.abs(other.y - point.y) + 1;
            const run = Math.abs(other.x - point.x) + 1;
            const area = rise * run;
            areas.push(area);
        }
    }

    return areas.sort((a, b) => b - a)[0];
}

export async function part2(input: string): Promise<number | string | bigint> {
    const points: Point[] = readLines(input, (line) => ({
        x: parseInt(line.split(",")[0], 10),
        y: parseInt(line.split(",")[1], 10),
    }));

    interface Area {
        points: Point[];
        area: number;
    }

    const areas: Area[] = [];
    for (const point of points) {
        const others = points.filter((p) => p !== point);
        for (const other of others) {
            const rise = Math.abs(other.y - point.y) + 1;
            const run = Math.abs(other.x - point.x) + 1;
            const area = rise * run;
            areas.push({ points: [point, other], area } );
        }
    }

    const areasWithinBoundary: Area[] = [];
    for (let i = 0; i < areas.length; i++) {
        const pointsWithinBoundary = areas[i].points.filter(p => isPointInPolygon(p.x, p.y, points, 'windingNumber'));
        if (pointsWithinBoundary.length === areas[i].points.length) {
            areasWithinBoundary.push(areas[i]);
        }
    }

    return areasWithinBoundary.sort((a, b) => b.area - a.area)[0].area;
}
