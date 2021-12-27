function jsonPretty(raw: string): string {
    const result = JSON.stringify(raw, null, 2);

    return result == "null" ? "" : result; 
}
export { jsonPretty }