export function toTitleCase(aString: string) {
    return aString
        .split(' ')
        .filter(Boolean)
        .map((w) => w[ 0 ]!.toUpperCase() + w.substr(1).toLowerCase())
        .join(' ')
}
