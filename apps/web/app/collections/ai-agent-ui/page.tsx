import '../../globals.css';
import { pageMetadata } from '../../../lib/seo';
import { agentCollection } from '../collection-content';
import { CollectionPage } from '../collection-page';

export const metadata = pageMetadata(agentCollection.title, agentCollection.description, agentCollection.path);

export default function AgentCollectionPage() {
  return <CollectionPage collection={agentCollection} />;
}
