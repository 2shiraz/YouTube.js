import { Parser } from '../index.js';
import { YTNode } from '../helpers.js';
class PlaylistVideoList extends YTNode {
    constructor(data) {
        super();
        this.id = data.playlistId;
        this.is_editable = data.isEditable;
        this.can_reorder = data.canReorder;
        this.videos = Parser.parseArray(data.contents);
    }
}
PlaylistVideoList.type = 'PlaylistVideoList';
export default PlaylistVideoList;
//# sourceMappingURL=PlaylistVideoList.js.map