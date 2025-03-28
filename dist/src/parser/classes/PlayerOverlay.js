import { YTNode } from '../helpers.js';
import { Parser } from '../index.js';
import Button from './Button.js';
import DecoratedPlayerBar from './DecoratedPlayerBar.js';
import PlayerOverlayAutoplay from './PlayerOverlayAutoplay.js';
import PlayerOverlayVideoDetails from './PlayerOverlayVideoDetails.js';
import WatchNextEndScreen from './WatchNextEndScreen.js';
import Menu from './menus/Menu.js';
class PlayerOverlay extends YTNode {
    constructor(data) {
        super();
        this.end_screen = Parser.parseItem(data.endScreen, WatchNextEndScreen);
        this.autoplay = Parser.parseItem(data.autoplay, PlayerOverlayAutoplay);
        this.share_button = Parser.parseItem(data.shareButton, Button);
        this.add_to_menu = Parser.parseItem(data.addToMenu, Menu);
        this.fullscreen_engagement = Parser.parseItem(data.fullscreenEngagement);
        this.actions = Parser.parseArray(data.actions);
        this.browser_media_session = Parser.parseItem(data.browserMediaSession);
        this.decorated_player_bar = Parser.parseItem(data.decoratedPlayerBarRenderer, DecoratedPlayerBar);
        this.video_details = Parser.parseItem(data.videoDetails, PlayerOverlayVideoDetails);
    }
}
PlayerOverlay.type = 'PlayerOverlay';
export default PlayerOverlay;
//# sourceMappingURL=PlayerOverlay.js.map