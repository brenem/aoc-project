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

/**
 * Check if a point lies on a line segment (horizontal or vertical only)
 */
export function isPointOnAxisAlignedSegment(p: { x: number; y: number }, a: { x: number; y: number }, b: { x: number; y: number }): boolean {
    if (a.x === b.x) {
        return p.x === a.x && p.y >= Math.min(a.y, b.y) && p.y <= Math.max(a.y, b.y);
    }
    if (a.y === b.y) {
        return p.y === a.y && p.x >= Math.min(a.x, b.x) && p.x <= Math.max(a.x, b.x);
    }
    return false;
}

/**
 * Check if a point is inside or on the boundary of a polygon
 */
export function isPointInOrOnPolygon(p: { x: number; y: number }, vertices: { x: number; y: number }[]): boolean {
    // Check if on boundary
    for (let i = 0; i < vertices.length; i++) {
        const next = (i + 1) % vertices.length;
        if (isPointOnAxisAlignedSegment(p, vertices[i], vertices[next])) {
            return true;
        }
    }
    // Check if inside
    return isPointInPolygon(p.x, p.y, vertices, "windingNumber");
}

/**
 * Check if two axis-aligned line segments cross each other at an interior point
 * (touching at endpoints or polygon vertices is allowed)
 */
export function doAxisAlignedSegmentsCross(
    r1: { x: number; y: number },
    r2: { x: number; y: number },
    e1: { x: number; y: number },
    e2: { x: number; y: number }
): boolean {
    const rectHorizontal = r1.y === r2.y;
    const edgeHorizontal = e1.y === e2.y;

    // Parallel segments don't cross
    if (rectHorizontal === edgeHorizontal) return false;

    // Determine horizontal and vertical segments
    const h = rectHorizontal
        ? { y: r1.y, x1: Math.min(r1.x, r2.x), x2: Math.max(r1.x, r2.x) }
        : { y: e1.y, x1: Math.min(e1.x, e2.x), x2: Math.max(e1.x, e2.x) };
    const v = rectHorizontal
        ? { x: e1.x, y1: Math.min(e1.y, e2.y), y2: Math.max(e1.y, e2.y) }
        : { x: r1.x, y1: Math.min(r1.y, r2.y), y2: Math.max(r1.y, r2.y) };

    // Check if they intersect
    const intersects = v.x >= h.x1 && v.x <= h.x2 && h.y >= v.y1 && h.y <= v.y2;
    if (!intersects) return false;

    // Allow touching at rectangle corners
    const isRectCorner = (v.x === r1.x && h.y === r1.y) || (v.x === r2.x && h.y === r2.y);
    if (isRectCorner) return false;

    // Allow touching at polygon vertices
    const isPolygonVertex = (v.x === e1.x && h.y === e1.y) || (v.x === e2.x && h.y === e2.y);
    if (isPolygonVertex) return false;

    return true; // Interior crossing
}