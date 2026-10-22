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
    // Only catalogue entries can resolve source files; website source is public.
    const { getComponentCode } = await import('../../../../../lib/component-code.server');
    const code = await getComponentCode(componentSlug);
    if (!code) return errorResponse('Component not found.', 404);
    return Response.json({ ...code, ...access }, { headers });
  } catch {
    return errorResponse('Code is temporarily unavailable. Please try again.', 503);
  }
}
