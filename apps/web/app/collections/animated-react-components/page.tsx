import '../../globals.css';
import { pageMetadata } from '../../../lib/seo';
import { animatedCollection } from '../collection-content';
import { CollectionPage } from '../collection-page';

export const metadata = pageMetadata(animatedCollection.title, animatedCollection.description, animatedCollection.path);

export default function AnimatedCollectionPage() {
  return <CollectionPage collection={animatedCollection} />;
}
