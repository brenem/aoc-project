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

-   Click **Run Part 1** or **Run Part 2** to execute the specific part with your real input.
-   Click **Debug Part 1** or **Debug Part 2** to debug the specific part.

You can also use the command palette to run these commands.

### Working with Samples
 
A `sample.txt` file is created for you in the day's folder. You can use this file to test your solution with example data.
-   Use **CodeLens** to "Run (Sample)" or "Debug (Sample)" using this file.

### Puzzle View

When you open a day, the puzzle description is shown in a webview.
-   **Copy to Clipboard**: detailed sample inputs in the description often have a "Copy" button added by the extension for easy transfer to your `sample.txt`.

### Project Structure

-   `solutions/`: Contains solution files organized by year and day.
    -   `solutions/shared/`: Shared utilities and functionality.
    -   Example: `solutions/2023/day01/`
        -   `solution.ts`: Your code.
        -   `input.txt`: The puzzle input.
        -   `sample.txt`: Sample input.
-   `tsconfig.json`: TypeScript configuration.
