import { MyValidator } from './my-validator'
function jsonPretty(raw: string): string {
    const result = JSON.stringify(raw, null, 2);

    return result == "null" ? "" : result; 
}
export { jsonPretty, MyValidator  }