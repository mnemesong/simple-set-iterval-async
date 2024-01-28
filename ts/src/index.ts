export type AsyncIntervalController = {
    continue: boolean,
    lastExecTime: number,
}

async function runIntervalAsync(
    f: () => Promise<void>,
    timeoutMs: number,
    controller: AsyncIntervalController
) {
    let dateDiff = 0
    while (controller && controller.continue) {
        controller.lastExecTime = Date.now()
        await f()
        dateDiff = controller.lastExecTime + timeoutMs - Date.now()
        await new Promise(r => setTimeout(r, (dateDiff <= 0) ? 1 : dateDiff))
    }
    return Promise.resolve()
}

export function setIntervalAsync(
    f: () => Promise<void>,
    timeoutMs: number
): AsyncIntervalController {
    const controller: AsyncIntervalController = { continue: true, lastExecTime: 0 }
    runIntervalAsync(f, timeoutMs, controller)
    return controller
}

export function clearIntervalAsync(controller: AsyncIntervalController): void {
    controller.continue = false
}