import makeCrudModule from './crud'
import { HydraMemberObject } from '~/api/hydra'

export interface PageLog extends HydraMemberObject {
    id: number;
    createdBy: string;
    createdAt: string;
    originalContent: string;
    isDraft: boolean;
}

export interface PageLogPayload {
    originalContent: string;
    draft: boolean;
    page: string;
}

export default makeCrudModule({
  resource: 'page_logs'
})
