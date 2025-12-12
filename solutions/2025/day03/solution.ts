
export async function part1(input: string): Promise<number | string | bigint> {
    const lines = parseInput(input);
    let totalOuputJoltage = 0;

    for (const line of lines) {
        let max1 = 0;
        let max2 = 0;

        for (let i = 0; i < line.length; i++) {
            const joltage = parseInt(line[i]);
            if (joltage > max1 && i !== line.length - 1) {
                max1 = joltage;
                max2 = 0;
            } else if (joltage > max2) {
                max2 = joltage;
            }
        }

        totalOuputJoltage += max1 * 10 + max2;
    }

    return totalOuputJoltage;
}

export async function part2(input: string): Promise<number | string | bigint> {
    const lines = parseInput(input);

    let count = 0;
    for (const line of lines) {
        let maxes = Array(12).fill(0);

        for (let i = 0; i < line.length; i++) {
            const joltage = parseInt(line[i]);
            for (let j = 0; j < maxes.length; j++) {
                if (joltage > maxes[j] && i < line.length - maxes.length + j + 1) {
                    maxes[j] = joltage;
                    for (let k = j + 1; k < maxes.length; k++) {
                        maxes[k] = 0;
                    }
                    break;
                }
            }
        }

        count += maxes.reduce((a, x, i, r) => a + x * (10 ** (r.length - i - 1)), 0);
    }

    return count;
}

function parseInput(input: string): string[] {
    return input.split('\n').filter(line => line.length > 0);
}
