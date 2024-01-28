export type AsyncIntervalController = {
    continue: boolean;
    lastExecTime: number;
};
export declare function setIntervalAsync(f: () => Promise<void>, timeoutMs: number): AsyncIntervalController;
export declare function clearIntervalAsync(controller: AsyncIntervalController): void;
