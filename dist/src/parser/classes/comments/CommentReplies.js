import { Parser } from '../../index.js';
import Button from '../Button.js';
import Thumbnail from '../misc/Thumbnail.js';
import { YTNode } from '../../helpers.js';
class CommentReplies extends YTNode {
    constructor(data) {
        super();
        this.contents = Parser.parseArray(data.contents);
        this.view_replies = Parser.parseItem(data.viewReplies, Button);
        this.hide_replies = Parser.parseItem(data.hideReplies, Button);
        this.view_replies_creator_thumbnail = Thumbnail.fromResponse(data.viewRepliesCreatorThumbnail);
        this.has_channel_owner_replied = !!data.viewRepliesCreatorThumbnail;
    }
}
CommentReplies.type = 'CommentReplies';
export default CommentReplies;
//# sourceMappingURL=CommentReplies.js.map