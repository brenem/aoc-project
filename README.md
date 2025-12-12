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

The easiest way to run your solutions is using the **CodeLens** links that appear directly above your code in the editor:

-   Click **Run** to execute the solution with your real input.
-   Click **Debug** to debug the solution.

You can also use the command palette or the run icons in the editor title bar.

### Working with Samples

You can create a `sample.txt` file in the day's folder to test your solution with example data.
-   Use **CodeLens** to "Run (Sample)" or "Debug (Sample)" using this file.

### Puzzle View

When you open a day, the puzzle description is shown in a webview.
-   **Copy to Clipboard**: detailed sample inputs in the description often have a "Copy" button added by the extension for easy transfer to your `sample.txt`.

### Project Structure

-   `solutions/`: Contains solution files organized by year and day.
    -   Example: `solutions/2023/day01/`
        -   `solution.ts`: Your code.
        -   `input.txt`: The puzzle input.
-   `package.json`: Dependencies.
-   `tsconfig.json`: TypeScript configuration.
