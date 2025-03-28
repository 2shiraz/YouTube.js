import { YTNode } from '../helpers.js';
import { Parser } from '../index.js';
class MerchandiseShelf extends YTNode {
    constructor(data) {
        super();
        this.title = data.title;
        this.menu = Parser.parseItem(data.actionButton);
        this.items = Parser.parseArray(data.items);
    }
    // XXX: Alias for consistency.
    get contents() {
        return this.items;
    }
}
MerchandiseShelf.type = 'MerchandiseShelf';
export default MerchandiseShelf;
//# sourceMappingURL=MerchandiseShelf.js.map