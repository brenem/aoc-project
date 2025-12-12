import { parseGrid } from '../../shared/utils/grid';
import { readLines, WHITESPACE_REGEX } from '../../shared/utils/input';

interface Problem {
    numbers: number[];
    operation?: '*' | '+' | '-' | '/';
}

export async function part1(input: string): Promise<number | string | bigint> {
    const problemsGrid = readLines(input, line => line.split(WHITESPACE_REGEX).filter(Boolean));

    const problems: Problem[] = [];
    for (let col = 0; col < problemsGrid[0].length; col++) {
        const problem: Problem = {
            numbers: []
        };

        for (let row = 0; row < problemsGrid.length; row++) {
            if (row === problemsGrid.length - 1) {
                problem.operation = problemsGrid[row][col] as '*' | '+' | '-' | '/';
            } else {
                problem.numbers.push(Number(problemsGrid[row][col]));
            }
        }

        problems.push(problem);
    }

    const total = performOperations(problems);
    return total;
}

export async function part2(input: string): Promise<number | string | bigint> {
    const lines = readLines(input, line => line);
    const operations = lines[lines.length - 1].split(/\s(?=[\*\+])/g);

    // get column indexes for each operation
    const columns: { index: number; operaton: string, length: number }[] = [];
    let prevOps = '';
    let colIndex = 0;

    for (let i = 0; i < operations.length; i++) {
        const operation = operations[i];
        columns.push({ index: colIndex, operaton: operation.trim(), length: operation.length });

        colIndex += operation.length + 1; // +1 for the space
    }

    const groups: string[][][] = [];
    for (const col of columns) {
        const group: string[][] = [];
        for (let row = 0; row < lines.length - 1; row++) {
            const part = lines[row].substring(col.index, col.index + col.length).split('');
            if (part) {
                group.push(part);
            }
        }
        group.push(col.operaton.padEnd(col.length).split('')); // add operation at the end
        groups.push(group);
    }

    const problems: Problem[] = [];
    for (const group of groups) {
        const problem: Problem = {
            numbers: []
        };

        for (let col = 0; col < group[0].length; col++) {
            let numStr = '';
            for (let row = 0; row < group.length; row++) {
                if (row === group.length - 1) {
                    if (!problem.operation) {
                        problem.operation = group[row][0] as '*' | '+' | '-' | '/';
                    }
                } else {
                    numStr += group[row][col];
                }
            }
            const num = Number(numStr.trim());
            if (!isNaN(num)) {
                problem.numbers.push(num);
            }
        }

        problems.push(problem);
    }

    const total = performOperations(problems);
    return total;
}

function performOperations(problems: Problem[]): number {
    let total = 0;
    for (const problem of problems) {
        if (!problem.operation) continue;

        let result: number;
        switch (problem.operation) {
            case '+':
                result = problem.numbers.reduce((a, b) => a + b, 0);
                break;
            case '-':
                result = problem.numbers.reduce((a, b) => a - b);
                break;
            case '*':
                result = problem.numbers.reduce((a, b) => a * b, 1);
                break;
            case '/':
                result = problem.numbers.reduce((a, b) => a / b);
                break;
            default:
                throw new Error(`Unknown operation: ${problem.operation}`);
        }

        total += result;
    }

    return total;
}
