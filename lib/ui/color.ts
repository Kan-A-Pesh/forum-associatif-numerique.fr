export default function getHslColor(baseHue: number): string {
    return baseHue === -1 ? "0, 0%, 44%" : `${baseHue % 360}, 100%, 44%`;
}
