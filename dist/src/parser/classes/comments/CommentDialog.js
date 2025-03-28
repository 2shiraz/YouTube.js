import { Parser } from '../../index.js';
import Button from '../Button.js';
import Text from '../misc/Text.js';
import Thumbnail from '../misc/Thumbnail.js';
import EmojiPicker from './EmojiPicker.js';
import { YTNode } from '../../helpers.js';
class CommentDialog extends YTNode {
    constructor(data) {
        super();
        this.editable_text = new Text(data.editableText);
        this.author_thumbnail = Thumbnail.fromResponse(data.authorThumbnail);
        this.submit_button = Parser.parseItem(data.submitButton, Button);
        this.cancel_button = Parser.parseItem(data.cancelButton, Button);
        this.placeholder = new Text(data.placeholderText);
        this.emoji_button = Parser.parseItem(data.emojiButton, Button);
        this.emoji_picker = Parser.parseItem(data.emojiPicker, EmojiPicker);
    }
}
CommentDialog.type = 'CommentDialog';
export default CommentDialog;
//# sourceMappingURL=CommentDialog.js.map