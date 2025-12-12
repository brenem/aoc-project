import { readLines } from "../../shared/utils/input";
import { euclideanDistance3d } from "../../shared/utils/math";

interface JunctionBox {
    x: number;
    y: number;
    z: number;
}

interface Circuit {
    juntionBoxes: JunctionBox[];
}

const MAX_DISTANCE = 200000000;

export async function part1(input: string): Promise<number | string | bigint> {
    const junctionBoxes: JunctionBox[] = readLines(input, line => line.split(',').map(Number)).map(coords => ({
        x: coords[0],
        y: coords[1],
        z: coords[2],
    }));

    const maxConnections = junctionBoxes.length < 1000 ? 10 : 1000;

    const distances: { distance: number; boxA: JunctionBox; boxB: JunctionBox }[] = [];
    
    for (let i = 0; i < junctionBoxes.length; i++) {
        const boxA = junctionBoxes[i];
        for (let j = i + 1; j < junctionBoxes.length; j++) {
            const boxB = junctionBoxes[j];
            const distance = euclideanDistance3d(boxA.x, boxA.y, boxA.z, boxB.x, boxB.y, boxB.z);

            if (distance <= MAX_DISTANCE) {
                distances.push({ distance, boxA, boxB });
            }
        }
    }

    distances.sort((a, b) => a.distance - b.distance);
    distances.splice(maxConnections);

    const circuits = junctionBoxes.map(box => ({ juntionBoxes: [box] } as Circuit));

    for (let i = 0; i < maxConnections; i++) {
        const { boxA, boxB } = distances[i];

        const circuitA = circuits.find(circuit => circuit.juntionBoxes.includes(boxA));
        const circuitB = circuits.find(circuit => circuit.juntionBoxes.includes(boxB));

        if (circuitA && circuitB && circuitA !== circuitB) {
            circuitA.juntionBoxes.push(...circuitB.juntionBoxes);
            const index = circuits.indexOf(circuitB);
            circuits.splice(index, 1);
        }
    }

    // sort circuits by size descending
    circuits.sort((a, b) => b.juntionBoxes.length - a.juntionBoxes.length);

    const topCircuits = circuits.slice(0, 3);
    let circuitSize = topCircuits.reduce((acc, circuit) => acc * circuit.juntionBoxes.length, 1);

    return circuitSize;
}

export async function part2(input: string): Promise<number | string | bigint> {
    const junctionBoxes: JunctionBox[] = readLines(input, line => line.split(',').map(Number)).map(coords => ({
        x: coords[0],
        y: coords[1],
        z: coords[2],
    }));

    const distances: { distance: number; boxA: JunctionBox; boxB: JunctionBox }[] = [];
    
    for (let i = 0; i < junctionBoxes.length; i++) {
        const boxA = junctionBoxes[i];
        for (let j = i + 1; j < junctionBoxes.length; j++) {
            const boxB = junctionBoxes[j];
            const distance = euclideanDistance3d(boxA.x, boxA.y, boxA.z, boxB.x, boxB.y, boxB.z);

            if (distance <= MAX_DISTANCE) {
                distances.push({ distance, boxA, boxB });
            }
        }
    }

    distances.sort((a, b) => a.distance - b.distance);

    const circuits = junctionBoxes.map(box => ({ juntionBoxes: [box] } as Circuit));

    let circuitsLeft = circuits.length;
    let result = 0;

    for (const { boxA, boxB } of distances) {
        const circuitA = circuits.find(circuit => circuit.juntionBoxes.includes(boxA));
        const circuitB = circuits.find(circuit => circuit.juntionBoxes.includes(boxB));

        if (circuitA && circuitB && circuitA !== circuitB) {
            if (circuitsLeft === 2) {
                result = boxA.x * boxB.x;
            }

            while (circuitB.juntionBoxes.length !== 0) {
                circuitA.juntionBoxes.push(circuitB.juntionBoxes.pop()!);
            }

            circuitsLeft--;
        }
    }

    return result;
}
