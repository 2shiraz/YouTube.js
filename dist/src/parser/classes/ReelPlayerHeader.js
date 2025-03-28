import { YTNode } from '../helpers.js';
import Thumbnail from './misc/Thumbnail.js';
import Author from './misc/Author.js';
import Text from './misc/Text.js';
class ReelPlayerHeader extends YTNode {
    constructor(data) {
        super();
        this.reel_title_text = new Text(data.reelTitleText);
        this.timestamp_text = new Text(data.timestampText);
        this.channel_title_text = new Text(data.channelTitleText);
        this.channel_thumbnail = Thumbnail.fromResponse(data.channelThumbnail);
        this.author = new Author(data.channelNavigationEndpoint, undefined);
    }
}
ReelPlayerHeader.type = 'ReelPlayerHeader';
export default ReelPlayerHeader;
//# sourceMappingURL=ReelPlayerHeader.js.map