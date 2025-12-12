# Advent of Code Solutions

This repository contains solutions for [Advent of Code](https://adventofcode.com/) puzzles.

## Prerequisites

To run and debug these solutions effectively, you need:

1.  **Visual Studio Code**
2.  **[Advent of Code VS Code Extension](https://marketplace.visualstudio.com/items?itemName=brenem.aoc-vscode)** (Dependency)
3.  **Node.js** and **npm**



> [!IMPORTANT]
> The **Advent of Code VS Code Extension** is required for features like automatic input downloading, solution running, and submission.

## Usage

### Running Solutions

You can run solutions directly from VS Code using the extension commands:

-   **AoC: Run Part**: Runs the solution for the current part with real input.
-   **AoC: Run Part (Sample)**: Runs the solution with sample input.

Or via command line:

```bash
npx ts-node solutions/YYYY/dayXX/solution.ts
```

### Debugging


1. Open a solution file (e.g., `solutions/2023/day01/solution.ts`).
2. Add breakpoints.
3. Open the "Run and Debug" view.
4. Select "AoC: Debug Part" or "AoC: Debug Part (Sample)".
5. Press F5.

## Project Structure

-   `solutions/`: Contains solution files organized by year and day.
-   `inputs/`: (Optional) Cached input files.
-   `package.json`: Dependencies.
-   `tsconfig.json`: TypeScript configuration.
