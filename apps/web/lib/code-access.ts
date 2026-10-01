export interface CodeAccess {
  signedIn: boolean;
}

export function isCodeAccess(value: unknown): value is CodeAccess {
  return !!value && typeof value === 'object' && 'signedIn' in value && typeof value.signedIn === 'boolean';
}
