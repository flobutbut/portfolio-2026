import { pointsMarkdown } from '../../lib/pointsMarkdown';

export const { getStaticPaths, GET } = pointsMarkdown('ecrits', 'fr');
