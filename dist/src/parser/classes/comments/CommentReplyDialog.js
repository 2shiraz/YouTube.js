import { Parser } from '../../index.js';
import Button from '../Button.js';
import Text from '../misc/Text.js';
import Thumbnail from '../misc/Thumbnail.js';
import { YTNode } from '../../helpers.js';
class CommentReplyDialog extends YTNode {
    constructor(data) {
        super();
        this.reply_button = Parser.parseItem(data.replyButton, Button);
        this.cancel_button = Parser.parseItem(data.cancelButton, Button);
        this.author_thumbnail = Thumbnail.fromResponse(data.authorThumbnail);
        this.placeholder = new Text(data.placeholderText);
        this.error_message = new Text(data.errorMessage);
    }
}
CommentReplyDialog.type = 'CommentReplyDialog';
export default CommentReplyDialog;
//# sourceMappingURL=CommentReplyDialog.js.map