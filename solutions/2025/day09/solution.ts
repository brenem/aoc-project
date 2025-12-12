import { isPointInOrOnPolygon, doAxisAlignedSegmentsCross } from "../../shared/utils/geometry";
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

    const rectangleCrossesPolygon = (corners: Point[]): boolean => {
        const rectEdges: [Point, Point][] = [
            [corners[0], corners[1]],
            [corners[1], corners[2]],
            [corners[2], corners[3]],
            [corners[3], corners[0]],
        ];

        for (const [r1, r2] of rectEdges) {
            for (let i = 0; i < points.length; i++) {
                const e1 = points[i];
                const e2 = points[(i + 1) % points.length];
                if (doAxisAlignedSegmentsCross(r1, r2, e1, e2)) {
                    return true;
                }
            }
        }
        return false;
    };

    let maxArea = 0;

    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const p1 = points[i];
            const p2 = points[j];

            const minX = Math.min(p1.x, p2.x);
            const maxX = Math.max(p1.x, p2.x);
            const minY = Math.min(p1.y, p2.y);
            const maxY = Math.max(p1.y, p2.y);

            const corners: Point[] = [
                { x: minX, y: minY },
                { x: maxX, y: minY },
                { x: maxX, y: maxY },
                { x: minX, y: maxY },
            ];

            // Check if all corners are inside or on the polygon boundary
            if (!corners.every(corner => isPointInOrOnPolygon(corner, points))) {
                continue;
            }

            // Check if rectangle edges cross the polygon boundary
            if (rectangleCrossesPolygon(corners)) {
                continue;
            }

            const area = (maxX - minX + 1) * (maxY - minY + 1);
            maxArea = Math.max(maxArea, area);
        }
    }

    return maxArea;
}
