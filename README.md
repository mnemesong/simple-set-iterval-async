# simple-set-iterval-async
Non intersectable async interval. It will never calls new execution until previous had not finished

## Api
```typescript
export type AsyncIntervalController = {
    continue: boolean,
    lastExecTime: number,
}

export function setIntervalAsync(
    f: () => Promise<void>,
    timeoutMs: number
): AsyncIntervalController {...}

export function clearIntervalAsync(controller: AsyncIntervalController): void {...}
```

## Test
```typescript
import { describe, it } from "mocha";
import { clearIntervalAsync, setIntervalAsync } from "../src";
import assert from "assert";

it("test set interval async", () => {
    const counter = { cnt1: 0, cnt2: 0 }
    const i1 = setIntervalAsync(async () => {
        counter.cnt1 = counter.cnt1 + 1
        if (counter.cnt1 === 3) {
            await new Promise(r => setTimeout(r, 3000))
        }
        console.log("cnt 1 =" + counter.cnt1)
        return Promise.resolve()
    }, 1000)
    const i2 = setIntervalAsync(async () => {
        counter.cnt2 = counter.cnt2 + 1
        console.log("cnt 2 =" + counter.cnt2)
        return Promise.resolve()
    }, 2000)
    setTimeout(() => {
        clearIntervalAsync(i1)
        clearIntervalAsync(i2)
        assert.ok((counter.cnt1 < 9) && (counter.cnt1 > 5))
        assert.ok((counter.cnt2 < 7) && (counter.cnt2 > 3))
        setTimeout(() => {
            assert.ok((counter.cnt1 < 9) && (counter.cnt1 > 5))
            assert.ok((counter.cnt2 < 7) && (counter.cnt2 > 3))
        }, 5000)
    }, 10000)
})
```