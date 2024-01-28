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