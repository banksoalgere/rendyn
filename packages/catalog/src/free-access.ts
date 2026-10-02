// One campaign window for website pricing, checkout and authenticated MCP access.
// Boundaries are midnight in Europe/London; November is on GMT.
export const FREE_ACCESS_STARTS_AT = '2026-10-01T23:00:00.000Z';
export const FREE_ACCESS_ENDS_AT = '2026-11-02T00:00:00.000Z';
export const FREE_ACCESS_END_LABEL = '2 November 2026';

export function isFreeAccessActive(now = Date.now()): boolean {
  return Number.isFinite(now)
    && now >= Date.parse(FREE_ACCESS_STARTS_AT)
    && now < Date.parse(FREE_ACCESS_ENDS_AT);
}
