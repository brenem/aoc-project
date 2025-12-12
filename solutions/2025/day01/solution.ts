
export async function part1(input: string): Promise<number | string | bigint> {
    const rotations = getRotations(input);

    const zeroCount = countZeroes(rotations);
    return zeroCount;
}

export async function part2(input: string): Promise<number | string | bigint> {
    const rotations = getRotations(input);
    
    const zeroCount = countZeroes(rotations, 50, true);
    return zeroCount;
}

function getRotations(input: string): { dir: string; amount: number }[] {
    const lines = input.split('\n');
    
    const rotations = lines.map(line => {
        const dir = line[0];
        const amount = parseInt(line.slice(1), 10);
        return { dir, amount };
    });

    return rotations;
}

function countZeroes(rotations: { dir: string; amount: number }[], start = 50, useSpecialMethod = false): number {
    let current = start;
    let zeroCount = 0;

    for (const step of rotations) {
        if (step.dir === 'L') {
            for (let i = 0; i < step.amount; i++) {
                current -= 1;
                if (current === -1) {
                    current = 99;
                }

                if (useSpecialMethod && current === 0) {
                    zeroCount += 1;
                }
            }
        } else if (step.dir === 'R') {
            for (let i = 0; i < step.amount; i++) {
                current += 1;
                if (current === 100) {
                    current = 0;
                }

                if (useSpecialMethod && current === 0) {
                    zeroCount += 1;
                }
            }
        }

        if (!useSpecialMethod && current === 0) {
            zeroCount += 1;
        }
    }

    return zeroCount;
}
