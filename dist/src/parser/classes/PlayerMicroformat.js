import { YTNode } from '../helpers.js';
import Text from './misc/Text.js';
import Thumbnail from './misc/Thumbnail.js';
class PlayerMicroformat extends YTNode {
    constructor(data) {
        super();
        this.title = new Text(data.title);
        this.description = new Text(data.description);
        this.thumbnails = Thumbnail.fromResponse(data.thumbnail);
        if (Reflect.has(data, 'embed')) {
            this.embed = {
                iframe_url: data.embed.iframeUrl,
                flash_url: data.embed.flashUrl,
                flash_secure_url: data.embed.flashSecureUrl,
                width: data.embed.width,
                height: data.embed.height
            };
        }
        this.length_seconds = parseInt(data.lengthSeconds);
        this.channel = {
            id: data.externalChannelId,
            name: data.ownerChannelName,
            url: data.ownerProfileUrl
        };
        this.is_family_safe = !!data.isFamilySafe;
        this.is_unlisted = !!data.isUnlisted;
        this.has_ypc_metadata = !!data.hasYpcMetadata;
        this.view_count = parseInt(data.viewCount);
        this.category = data.category;
        this.publish_date = data.publishDate;
        this.upload_date = data.uploadDate;
        this.available_countries = data.availableCountries;
        this.start_timestamp = data.liveBroadcastDetails?.startTimestamp ? new Date(data.liveBroadcastDetails.startTimestamp) : null;
        this.end_timestamp = data.liveBroadcastDetails?.endTimestamp ? new Date(data.liveBroadcastDetails.endTimestamp) : null;
    }
}
PlayerMicroformat.type = 'PlayerMicroformat';
export default PlayerMicroformat;
//# sourceMappingURL=PlayerMicroformat.js.map