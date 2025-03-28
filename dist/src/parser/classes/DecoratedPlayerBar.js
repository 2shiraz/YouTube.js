import { YTNode } from '../helpers.js';
import { Parser } from '../index.js';
import Button from './Button.js';
import MultiMarkersPlayerBar from './MultiMarkersPlayerBar.js';
class DecoratedPlayerBar extends YTNode {
    constructor(data) {
        super();
        this.player_bar = Parser.parseItem(data.playerBar, MultiMarkersPlayerBar);
        this.player_bar_action_button = Parser.parseItem(data.playerBarActionButton, Button);
    }
}
DecoratedPlayerBar.type = 'DecoratedPlayerBar';
export default DecoratedPlayerBar;
//# sourceMappingURL=DecoratedPlayerBar.js.map