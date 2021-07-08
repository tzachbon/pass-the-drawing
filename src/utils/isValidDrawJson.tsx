/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export function isValidJson(json: string | null | undefined) {
    if (!json) {
        return false
    }

    try {
        return JSON.parse(json).lines.every(
            ({ points }: { points?: { x?: string; y?: string }[] }) =>
                points?.every(
                    (point) =>
                        typeof point?.x === 'number' &&
                        typeof point?.y === 'number',
                ),
        )
    } catch {
        return false
    }
}
