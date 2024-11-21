# simple-set-iterval-async
Non intersectable async interval. It will never calls new execution until previous had not finished

# REPOSITORY HAVE BEEN MOVED!
Repository have been moved to: https://gitflic.ru/project/pantagruel74/simple-set-iterval-async

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
        if ((counter.cnt1 > 3) && (counter.cnt1 < 7)) {
            await new Promise(r => setTimeout(r, 1700))
        }
        console.log((new Date()).toLocaleTimeString() + ": cnt 1 = " + counter.cnt1)
        return Promise.resolve()
    }, 1000)
    const i2 = setIntervalAsync(async () => {
        counter.cnt2 = counter.cnt2 + 1
        console.log((new Date()).toLocaleTimeString() + ": cnt 2 = " + counter.cnt2)
        return Promise.resolve()
    }, 2000)
    setTimeout(() => {
        clearIntervalAsync(i1)
        clearIntervalAsync(i2)
        assert.ok((counter.cnt1 < 9) && (counter.cnt1 > 6))
        assert.ok((counter.cnt2 < 7) && (counter.cnt2 > 4))
        setTimeout(() => {
            assert.ok((counter.cnt1 < 9) && (counter.cnt1 > 6))
            assert.ok((counter.cnt2 < 7) && (counter.cnt2 > 4))
        }, 5000)
    }, 10000)
})
//Console output:
//05:39:49: cnt 1 = 1
//05:39:49: cnt 2 = 1
//05:39:50: cnt 1 = 2
//05:39:51: cnt 1 = 3
//05:39:51: cnt 2 = 2
//05:39:53: cnt 2 = 3
//05:39:54: cnt 1 = 4
//05:39:55: cnt 2 = 4
//05:39:55: cnt 1 = 5
//05:39:57: cnt 2 = 5
//05:39:57: cnt 1 = 6
//05:39:57: cnt 1 = 7
//05:39:58: cnt 1 = 8
//05:39:59: cnt 2 = 6
```

## Author
Anatoly Starodubtsev
tostar74@mail.ru

## Licence
MIT
