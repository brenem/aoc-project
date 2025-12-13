import { readLines } from "../../shared/utils/input";
import { init } from 'z3-solver';

interface InitializationProcedure {
    targetState: number;
    buttonWiring: number[];
    joltageRequirements?: number[];
    lightCount: number;
}

export async function part1(input: string): Promise<number | string | bigint> {
    const initializationProcedures = parseInitializationProcedures(input);

    let totalPresses = 0;
    for (const procedure of initializationProcedures) {
        let minPresses = Infinity;
        const limit = 1 << procedure.buttonWiring.length;

        for (let i = 0; i < limit; i++) {
            let current = 0;
            for (let j = 0; j < procedure.buttonWiring.length; j++) {
                if ((i >> j) & 1) {
                    current ^= procedure.buttonWiring[j];
                }
            }

            if (current === procedure.targetState) {
                const presses = i.toString(2).split("1").length - 1;
                if (presses < minPresses) {
                    minPresses = presses;
                }
            }
        }
        totalPresses += minPresses;
    }

    return totalPresses;
}

export async function part2(input: string): Promise<number | string | bigint> {
    const { Context } = await init();
    const initializationProcedures = parseInitializationProcedures(input);

    let totalPresses = 0;

    for (const procedure of initializationProcedures) {
        if (!procedure.joltageRequirements) {
            continue;
        }

        const Z3 = Context('main');
        const solver = new Z3.Optimize();

        // Create variables for button press counts
        const buttonVars = procedure.buttonWiring.map((_, i) => 
            Z3.Int.const(`button_${i}`)
        );

        // All button press counts must be non-negative
        for (const btnVar of buttonVars) {
            solver.add(btnVar.ge(0));
        }

        // For each counter, sum up contributions from all buttons
        for (let counterIdx = 0; counterIdx < procedure.joltageRequirements.length; counterIdx++) {
            const targetValue = procedure.joltageRequirements[counterIdx];
            const contributions: ReturnType<typeof Z3.Int.const>[] = [];

            for (let btnIdx = 0; btnIdx < procedure.buttonWiring.length; btnIdx++) {
                const button = procedure.buttonWiring[btnIdx];
                // Check if this button affects this counter
                if ((button >> counterIdx) & 1) {
                    contributions.push(buttonVars[btnIdx]);
                }
            }

            if (contributions.length > 0) {
                const counterSum = contributions.length === 1 
                    ? contributions[0]
                    : Z3.Sum(...contributions as [any, any, ...any[]]);
                solver.add(counterSum.eq(targetValue));
            } else {
                // No buttons affect this counter, so it must equal target (should be 0)
                solver.add(Z3.Int.val(targetValue).eq(0));
            }
        }

        // Minimize total button presses
        const totalPressesExpr = buttonVars.length > 0
            ? (buttonVars.length === 1 
                ? buttonVars[0] 
                : Z3.Sum(...buttonVars as [any, any, ...any[]]))
            : Z3.Int.val(0);
        solver.minimize(totalPressesExpr);

        // Solve
        const result = await solver.check();
        if (result === 'sat') {
            const model = solver.model();
            let machineTotal = 0;
            for (const btnVar of buttonVars) {
                const value = Number(model.eval(btnVar).toString());
                machineTotal += value;
            }
            totalPresses += machineTotal;
        }
    }

    return totalPresses;
}

function parseInitializationProcedures(
    input: string
): InitializationProcedure[] {
    return readLines(input, (line) => {
        const indicatorLightDiagram = line.match(/^\[([.#]+)\]/)?.[1];
        const buttonWiringSchematic = line
            .match(/(\([\d,\(\)]+\)\s*)+/)?.[0]
            .trim();
        const joltageRequirements = line
            .match(/\{([\d,]+)\}/)?.[1]
            .split(",")
            .map(Number);

        let targetState = 0;
        for (let i = 0; i < indicatorLightDiagram!.length; i++) {
            if (indicatorLightDiagram![i] === "#") {
                targetState |= 1 << i;
            }
        }

        const buttonWiring: number[] = [];
        const buttonMatches = buttonWiringSchematic!.matchAll(/\(([\d,]+)\)/g);
        for (const match of buttonMatches) {
            const connections = match[1]
                .split(",")
                .map((numStr) => parseInt(numStr, 10));
            let wiring = 0;
            for (const conn of connections) {
                wiring |= 1 << conn;
            }
            buttonWiring.push(wiring);
        }

        return {
            targetState,
            buttonWiring,
            joltageRequirements,
            lightCount: indicatorLightDiagram!.length,
        };
    });
}
