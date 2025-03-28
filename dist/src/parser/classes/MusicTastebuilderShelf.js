import { Parser } from '../index.js';
import Button from './Button.js';
import Text from './misc/Text.js';
import MusicTastebuilderShelfThumbnail from './MusicTastebuilderShelfThumbnail.js';
import { YTNode } from '../helpers.js';
class MusicTasteBuilderShelf extends YTNode {
    constructor(data) {
        super();
        this.thumbnail = Parser.parseItem(data.thumbnail, MusicTastebuilderShelfThumbnail);
        this.primary_text = new Text(data.primaryText);
        this.secondary_text = new Text(data.secondaryText);
        this.action_button = Parser.parseItem(data.actionButton, Button);
        this.is_visible = data.isVisible;
    }
}
MusicTasteBuilderShelf.type = 'MusicTasteBuilderShelf';
export default MusicTasteBuilderShelf;
//# sourceMappingURL=MusicTastebuilderShelf.js.map