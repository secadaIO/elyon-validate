export function agreementScore(a, b) {
    if (a === b)
        return 1.0;
    if (a.includes(b) || b.includes(a))
        return 0.9;
    return 0.5;
}
