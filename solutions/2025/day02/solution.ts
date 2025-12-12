
export async function part1(input: string): Promise<number | string | bigint> {
    const ranges = parseInput(input);
    let invalidSum = 0;

    for (const range of ranges) {
        for (let i = range.start; i <= range.end; i++) {
            const isValid = isValidIdPart1(i);
            if (!isValid) {
                invalidSum += i;
            }
        }
    }

    return invalidSum;
}

export async function part2(input: string): Promise<number | string | bigint> {
    const ranges = parseInput(input);
    let invalidSum = 0;

    for (const range of ranges) {
        for (let i = range.start; i <= range.end; i++) {
            const isValid = isValidIdPart2(i);
            if (!isValid) {
                invalidSum += i;
            }
        }
    }

    return invalidSum;
}

function parseInput(input: string): { start: number; end: number }[] {
    const ranges = input.replace('\n', '').split(',').map(range => {
        const [start, end] = range.split('-').map(Number);
        return { start, end };
    });

    return ranges;
}

const regex = new RegExp(/^(.+?)( ?\1)+$/gm);

function isValidIdPart1(id: number): boolean {
    const idStr = id.toString();
    if (idStr.length % 2 !== 0) {
        return true;
    }

    const splitIndex = idStr.length / 2;
    const firstHalf = idStr.slice(0, splitIndex);
    const secondHalf = idStr.slice(splitIndex);

    return firstHalf != secondHalf;
}

function isValidIdPart2(id: number): boolean {
    const isValid = !regex.test(id.toString());
    return isValid;
    // const idStr = id.toString();
    // if (idStr.length % 2 !== 0) {
    //     return true;
    // }

    // const splitIndex = idStr.length / 2;
    // const firstHalf = idStr.slice(0, splitIndex);
    // const secondHalf = idStr.slice(splitIndex);

    // return firstHalf != secondHalf;
}
