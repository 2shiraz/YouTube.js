import { YTNode } from '../helpers.js';
import { Parser } from '../index.js';
import Button from './Button.js';
import Menu from './menus/Menu.js';
import Text from './misc/Text.js';
import MusicCardShelfHeaderBasic from './MusicCardShelfHeaderBasic.js';
import MusicInlineBadge from './MusicInlineBadge.js';
import MusicItemThumbnailOverlay from './MusicItemThumbnailOverlay.js';
import MusicThumbnail from './MusicThumbnail.js';
import NavigationEndpoint from './NavigationEndpoint.js';
class MusicCardShelf extends YTNode {
    constructor(data) {
        super();
        this.thumbnail = Parser.parseItem(data.thumbnail, MusicThumbnail);
        this.title = new Text(data.title);
        this.subtitle = new Text(data.subtitle);
        this.buttons = Parser.parseArray(data.buttons, Button);
        this.menu = Parser.parseItem(data.menu, Menu);
        this.on_tap = new NavigationEndpoint(data.onTap);
        this.header = Parser.parseItem(data.header, MusicCardShelfHeaderBasic);
        if (Reflect.has(data, 'endIcon') && Reflect.has(data.endIcon, 'iconType')) {
            this.end_icon_type = data.endIcon.iconType;
        }
        this.subtitle_badges = Parser.parseArray(data.subtitleBadges, MusicInlineBadge);
        this.thumbnail_overlay = Parser.parseItem(data.thumbnailOverlay, MusicItemThumbnailOverlay);
        if (Reflect.has(data, 'contents')) {
            this.contents = Parser.parseArray(data.contents);
        }
    }
}
MusicCardShelf.type = 'MusicCardShelf';
export default MusicCardShelf;
//# sourceMappingURL=MusicCardShelf.js.map