import { getCatalogueFilters } from '../../../lib/catalogue-search';
import { workspaceComponents } from '../../../lib/workspace-catalogue';
import { WorkspaceCatalogue } from '../workspace-catalogue';

export default async function SavedPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return <WorkspaceCatalogue components={workspaceComponents} initialFilters={getCatalogueFilters(await searchParams)} savedOnly />;
}
