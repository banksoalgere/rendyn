export interface CodeAccess {
  allowed: boolean;
}

export function isCodeAccess(value: unknown): value is CodeAccess {
  return !!value && typeof value === 'object' && 'allowed' in value && typeof value.allowed === 'boolean';
}
