var _Guide_page;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import { Parser } from '../index.js';
import GuideSection from '../classes/GuideSection.js';
import GuideSubscriptionsSection from '../classes/GuideSubscriptionsSection.js';
class Guide {
    constructor(data) {
        _Guide_page.set(this, void 0);
        __classPrivateFieldSet(this, _Guide_page, Parser.parseResponse(data), "f");
        if (__classPrivateFieldGet(this, _Guide_page, "f").items)
            this.contents = __classPrivateFieldGet(this, _Guide_page, "f").items.array().as(GuideSection, GuideSubscriptionsSection);
    }
    get page() {
        return __classPrivateFieldGet(this, _Guide_page, "f");
    }
}
_Guide_page = new WeakMap();
export default Guide;
//# sourceMappingURL=Guide.js.map