import { codeAccessHeaders, getCodeAccess } from '../../../lib/code-access.server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    return Response.json(await getCodeAccess(), { headers: codeAccessHeaders });
  } catch {
    return Response.json({ error: 'Code access is temporarily unavailable.' }, { status: 503, headers: codeAccessHeaders });
  }
}
