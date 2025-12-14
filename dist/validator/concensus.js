export function determineConsensus(score) {
    if (score > 0.9)
        return "ACCEPT";
    if (score > 0.7)
        return "REVIEW_REQUIRED";
    return "REJECT";
}
