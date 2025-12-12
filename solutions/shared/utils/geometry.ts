/**
 * ray castng algorithm
 */
export function rayCast(px: number, py: number, vertices: { x: number; y: number }[]): boolean {
    let inside = false;
    for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
        const xi = vertices[i].x, yi = vertices[i].y;
        const xj = vertices[j].x, yj = vertices[j].y;

        const intersect = ((yi > py) !== (yj > py)) &&
            (px < (xj - xi) * (py - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}

/**
 * winding number algorithm
 */
export function windingNumber(px: number, py: number, vertices: { x: number; y: number }[]): number {
    let wn = 0; // winding number counter

    for (let i = 0; i < vertices.length; i++) {
        const v1 = vertices[i];
        const v2 = vertices[(i + 1) % vertices.length];

        if (v1.y <= py) {
            if (v2.y > py) {
                if (isLeft(v1, v2, { x: px, y: py }) > 0) {
                    wn++;
                }
            }
        } else {
            if (v2.y <= py) {
                if (isLeft(v1, v2, { x: px, y: py }) < 0) {
                    wn--;
                }
            }
        }
    }
    return wn;
}

function isLeft(p0: { x: number; y: number }, p1: { x: number; y: number }, p2: { x: number; y: number }): number {
    return (p1.x - p0.x) * (p2.y - p0.y) - (p2.x - p0.x) * (p1.y - p0.y);
}

/**
 * Check if point is within boundary
 */
export function isPointInPolygon(px: number, py: number, vertices: { x: number; y: number }[], algorithm: "rayCast" | "windingNumber" = "rayCast"): boolean {
    if (algorithm === "rayCast") {
        return rayCast(px, py, vertices);
    } else {
        return windingNumber(px, py, vertices) !== 0;
    }
}