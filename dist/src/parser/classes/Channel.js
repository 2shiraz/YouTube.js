import { YTNode } from '../helpers.js';
import { Parser } from '../index.js';
import Button from './Button.js';
import NavigationEndpoint from './NavigationEndpoint.js';
import SubscribeButton from './SubscribeButton.js';
import Author from './misc/Author.js';
import Text from './misc/Text.js';
class Channel extends YTNode {
    constructor(data) {
        super();
        this.id = data.channelId;
        this.author = new Author({
            ...data.title,
            navigationEndpoint: data.navigationEndpoint
        }, data.ownerBadges, data.thumbnail);
        // XXX: `subscriberCountText` is now the channel's handle and `videoCountText` is the subscriber count.
        this.subscriber_count = new Text(data.subscriberCountText);
        this.video_count = new Text(data.videoCountText);
        this.long_byline = new Text(data.longBylineText);
        this.short_byline = new Text(data.shortBylineText);
        this.endpoint = new NavigationEndpoint(data.navigationEndpoint);
        this.subscribe_button = Parser.parseItem(data.subscribeButton, [SubscribeButton, Button]);
        this.description_snippet = new Text(data.descriptionSnippet);
    }
}
Channel.type = 'Channel';
export default Channel;
//# sourceMappingURL=Channel.js.map