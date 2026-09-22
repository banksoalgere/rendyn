import { findCatalogueEntry } from '../../../../../lib/catalogue';
import { codeAccessHeaders, getCodeAccess } from '../../../../../lib/code-access.server';

export const dynamic = 'force-dynamic';
const headers = codeAccessHeaders;
const errorResponse = (error: string, status: number) => Response.json({ error }, { status, headers });

export async function GET(request: Request, { params }: {
  params: Promise<{ componentSlug: string }>;
}) {
  const { componentSlug } = await params;
  if (!findCatalogueEntry(componentSlug)) return errorResponse('Component not found.', 404);
  try {
    const access = await getCodeAccess();
    if (!access.signedIn) return errorResponse('Log in to get this component free.', 401);

    // Verify the session on the server before loading source. No subscription is required.
    const { getComponentCode } = await import('../../../../../lib/component-code.server');
    const code = await getComponentCode(componentSlug);
    if (!code) return errorResponse('Component not found.', 404);
    return Response.json({ ...code, ...access }, { headers });
  } catch {
    return errorResponse('Code is temporarily unavailable. Please try again.', 503);
  }
}
