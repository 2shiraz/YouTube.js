import { YTNode } from '../helpers.js';
import { Parser } from '../index.js';
import NavigationEndpoint from './NavigationEndpoint.js';
import Text from './misc/Text.js';
class PlaylistSidebarPrimaryInfo extends YTNode {
    constructor(data) {
        super();
        this.stats = data.stats.map((stat) => new Text(stat));
        this.thumbnail_renderer = Parser.parseItem(data.thumbnailRenderer);
        this.title = new Text(data.title);
        this.menu = Parser.parseItem(data.menu);
        this.endpoint = new NavigationEndpoint(data.navigationEndpoint);
        this.description = new Text(data.description);
    }
}
PlaylistSidebarPrimaryInfo.type = 'PlaylistSidebarPrimaryInfo';
export default PlaylistSidebarPrimaryInfo;
//# sourceMappingURL=PlaylistSidebarPrimaryInfo.js.map