function yardToMeter(yard: number) {
    return Math.round(yard / 1.094);
}

function yardToGroupAdult(yard: number) {
    return yard > 60 ? undefined : yard > 45 ? 1 : yard > 35 ? 2 : yard > 20 ? 3 : 4;
}

function yardToGroupJunior(yard: number) {
    return yard > 50 ? undefined : yard > 45 ? 1 : yard > 35 ? 2 : yard > 20 ? 3 : 4;
}
export { yardToMeter, yardToGroupAdult, yardToGroupJunior };