import { YTNode } from '../helpers.js';
import { Parser } from '../index.js';
import Text from './misc/Text.js';
class VerticalList extends YTNode {
    constructor(data) {
        super();
        this.items = Parser.parseArray(data.items);
        this.collapsed_item_count = data.collapsedItemCount;
        this.collapsed_state_button_text = new Text(data.collapsedStateButtonText);
    }
    // XXX: Alias for consistency.
    get contents() {
        return this.items;
    }
}
VerticalList.type = 'VerticalList';
export default VerticalList;
//# sourceMappingURL=VerticalList.js.map