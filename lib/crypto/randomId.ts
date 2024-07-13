import { randomInt } from "crypto";

const BIGINT_SAFE_MIN = 0;
const BIGINT_SAFE_MAX = 281474976710655;

export default function randomId(): number {
    return randomInt(BIGINT_SAFE_MIN, BIGINT_SAFE_MAX);
}
