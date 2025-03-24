import { YTNode } from '../helpers.js';
import type { RawNode } from '../index.js';
import Thumbnail from './misc/Thumbnail.js';
export default class PlaylistCustomThumbnail extends YTNode {
    static type: string;
    thumbnail: Thumbnail[];
    constructor(data: RawNode);
}
