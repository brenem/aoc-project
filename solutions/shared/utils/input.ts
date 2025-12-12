/**
 * input utilities
 */

export const EMPTY_LINE_REGEX = /\n\s*\n/g;
export const WHITESPACE_REGEX = /\s+/g;

export function readLines<T>(
    input: string,
    selector: (line: string) => T,
    separator: RegExp | string = "\n"
): T[] {
    const normalized = normalizeLineEndings(input);
    const split = normalized.split(separator).filter(Boolean);
    return split.map((x) => selector(x));
}

export function read2DMap<T>(
    input: string,
    selector: (char: string) => T,
    rowSeparator: RegExp | string = "\n",
    colSeparator: RegExp | string = ""
): T[][] {
    const normalized = normalizeLineEndings(input);
    const split = normalized.split(rowSeparator).filter(Boolean);
    return split.map((x) => x.split(colSeparator).map((y) => selector(y)));
}

function normalizeLineEndings(input: string): string {
    return input.replaceAll("\r\n", "\n");
}
