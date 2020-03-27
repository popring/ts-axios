// function pick(a: number, b: number): number;
// function pick(a: string, b: string): number;
function pick(a, b) {
    if (typeof a === "string" && typeof b === "string") {
        return a + b;
    }
    if (typeof a === "number" && typeof b === "number") {
        return a + b;
    }
}
pick(1, 1);
pick("1", "1");
