import { YTNode } from '../helpers.js';
import { Parser } from '../index.js';
import Author from './misc/Author.js';
import Text from './misc/Text.js';
import Thumbnail from './misc/Thumbnail.js';
import NavigationEndpoint from './NavigationEndpoint.js';
class GridPlaylist extends YTNode {
    constructor(data) {
        super();
        this.id = data.playlistId;
        this.title = new Text(data.title);
        if (Reflect.has(data, 'shortBylineText')) {
            this.author = new Author(data.shortBylineText, data.ownerBadges);
        }
        this.badges = Parser.parseArray(data.ownerBadges);
        this.endpoint = new NavigationEndpoint(data.navigationEndpoint);
        this.view_playlist = new Text(data.viewPlaylistText);
        this.thumbnails = Thumbnail.fromResponse(data.thumbnail);
        this.thumbnail_renderer = Parser.parseItem(data.thumbnailRenderer);
        this.sidebar_thumbnails = [].concat(...data.sidebarThumbnails?.map((thumbnail) => Thumbnail.fromResponse(thumbnail)) || []) || null;
        this.video_count = new Text(data.thumbnailText);
        this.video_count_short = new Text(data.videoCountShortText);
    }
}
GridPlaylist.type = 'GridPlaylist';
export default GridPlaylist;
//# sourceMappingURL=GridPlaylist.js.map