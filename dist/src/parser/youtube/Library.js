var _Library_instances, _Library_getAll;
import { __classPrivateFieldGet } from "tslib";
import { InnertubeError } from '../../utils/Utils.js';
import Feed from '../../core/mixins/Feed.js';
import History from './History.js';
import Playlist from './Playlist.js';
import Menu from '../classes/menus/Menu.js';
import Shelf from '../classes/Shelf.js';
import Button from '../classes/Button.js';
import PageHeader from '../classes/PageHeader.js';
class Library extends Feed {
    constructor(actions, data) {
        super(actions, data);
        _Library_instances.add(this);
        if (!this.page.contents_memo)
            throw new InnertubeError('Page contents not found');
        this.header = this.memo.getType(PageHeader)[0];
        const shelves = this.page.contents_memo.getType(Shelf);
        this.sections = shelves.map((shelf) => ({
            type: shelf.icon_type,
            title: shelf.title,
            contents: shelf.content?.key('items').array() || [],
            getAll: () => __classPrivateFieldGet(this, _Library_instances, "m", _Library_getAll).call(this, shelf)
        }));
    }
    get history() {
        return this.sections.find((section) => section.type === 'WATCH_HISTORY');
    }
    get watch_later() {
        return this.sections.find((section) => section.type === 'WATCH_LATER');
    }
    get liked_videos() {
        return this.sections.find((section) => section.type === 'LIKE');
    }
    get playlists_section() {
        return this.sections.find((section) => section.type === 'PLAYLISTS');
    }
    get clips() {
        return this.sections.find((section) => section.type === 'CONTENT_CUT');
    }
}
_Library_instances = new WeakSet(), _Library_getAll = async function _Library_getAll(shelf) {
    if (!shelf.menu?.as(Menu).top_level_buttons)
        throw new InnertubeError(`The ${shelf.title.text} shelf doesn't have more items`);
    const button = shelf.menu.as(Menu).top_level_buttons.firstOfType(Button);
    if (!button)
        throw new InnertubeError('Did not find target button.');
    const page = await button.as(Button).endpoint.call(this.actions, { parse: true });
    switch (shelf.icon_type) {
        case 'LIKE':
        case 'WATCH_LATER':
            return new Playlist(this.actions, page, true);
        case 'WATCH_HISTORY':
            return new History(this.actions, page, true);
        case 'CONTENT_CUT':
            return new Feed(this.actions, page, true);
        default:
            throw new InnertubeError('Target shelf not implemented.');
    }
};
export default Library;
//# sourceMappingURL=Library.js.map