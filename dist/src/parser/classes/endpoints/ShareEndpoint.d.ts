import type { RawNode } from '../../index.js';
import ShareEntityServiceEndpoint from './ShareEntityServiceEndpoint.js';
export default class ShareEndpoint extends ShareEntityServiceEndpoint {
    static type: string;
    constructor(data: RawNode);
}
