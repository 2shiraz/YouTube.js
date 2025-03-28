import { YTNode } from '../helpers.js';
import { Parser } from '../index.js';
import Button from './Button.js';
import SortFilterSubMenu from './SortFilterSubMenu.js';
import Menu from './menus/Menu.js';
class LiveChatHeader extends YTNode {
    constructor(data) {
        super();
        this.overflow_menu = Parser.parseItem(data.overflowMenu, Menu);
        this.collapse_button = Parser.parseItem(data.collapseButton, Button);
        this.view_selector = Parser.parseItem(data.viewSelector, SortFilterSubMenu);
    }
}
LiveChatHeader.type = 'LiveChatHeader';
export default LiveChatHeader;
//# sourceMappingURL=LiveChatHeader.js.map