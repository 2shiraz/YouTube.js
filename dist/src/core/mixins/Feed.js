var _Feed_instances, _Feed_page, _Feed_actions, _Feed_memo, _Feed_continuation, _Feed_isParsed, _Feed_getBodyContinuations;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import { Parser, ReloadContinuationItemsCommand } from '../../parser/index.js';
import { concatMemos, InnertubeError } from '../../utils/Utils.js';
import BackstagePost from '../../parser/classes/BackstagePost.js';
import SharedPost from '../../parser/classes/SharedPost.js';
import Channel from '../../parser/classes/Channel.js';
import CompactVideo from '../../parser/classes/CompactVideo.js';
import GridChannel from '../../parser/classes/GridChannel.js';
import GridPlaylist from '../../parser/classes/GridPlaylist.js';
import GridVideo from '../../parser/classes/GridVideo.js';
import LockupView from '../../parser/classes/LockupView.js';
import Playlist from '../../parser/classes/Playlist.js';
import PlaylistPanelVideo from '../../parser/classes/PlaylistPanelVideo.js';
import PlaylistVideo from '../../parser/classes/PlaylistVideo.js';
import Post from '../../parser/classes/Post.js';
import ReelItem from '../../parser/classes/ReelItem.js';
import ShortsLockupView from '../../parser/classes/ShortsLockupView.js';
import ReelShelf from '../../parser/classes/ReelShelf.js';
import RichShelf from '../../parser/classes/RichShelf.js';
import Shelf from '../../parser/classes/Shelf.js';
import Tab from '../../parser/classes/Tab.js';
import Video from '../../parser/classes/Video.js';
import AppendContinuationItemsAction from '../../parser/classes/actions/AppendContinuationItemsAction.js';
import ContinuationItem from '../../parser/classes/ContinuationItem.js';
import TwoColumnBrowseResults from '../../parser/classes/TwoColumnBrowseResults.js';
import TwoColumnSearchResults from '../../parser/classes/TwoColumnSearchResults.js';
import WatchCardCompactVideo from '../../parser/classes/WatchCardCompactVideo.js';
class Feed {
    constructor(actions, response, already_parsed = false) {
        _Feed_instances.add(this);
        _Feed_page.set(this, void 0);
        _Feed_actions.set(this, void 0);
        _Feed_memo.set(this, void 0);
        _Feed_continuation.set(this, void 0);
        if (__classPrivateFieldGet(this, _Feed_instances, "m", _Feed_isParsed).call(this, response) || already_parsed) {
            __classPrivateFieldSet(this, _Feed_page, response, "f");
        }
        else {
            __classPrivateFieldSet(this, _Feed_page, Parser.parseResponse(response.data), "f");
        }
        const memo = concatMemos(...[
            __classPrivateFieldGet(this, _Feed_page, "f").contents_memo,
            __classPrivateFieldGet(this, _Feed_page, "f").continuation_contents_memo,
            __classPrivateFieldGet(this, _Feed_page, "f").on_response_received_commands_memo,
            __classPrivateFieldGet(this, _Feed_page, "f").on_response_received_endpoints_memo,
            __classPrivateFieldGet(this, _Feed_page, "f").on_response_received_actions_memo,
            __classPrivateFieldGet(this, _Feed_page, "f").sidebar_memo,
            __classPrivateFieldGet(this, _Feed_page, "f").header_memo
        ]);
        if (!memo)
            throw new InnertubeError('No memo found in feed');
        __classPrivateFieldSet(this, _Feed_memo, memo, "f");
        __classPrivateFieldSet(this, _Feed_actions, actions, "f");
    }
    /**
     * Get all videos on a given page via memo
     */
    static getVideosFromMemo(memo) {
        return memo.getType(Video, GridVideo, ReelItem, ShortsLockupView, CompactVideo, PlaylistVideo, PlaylistPanelVideo, WatchCardCompactVideo);
    }
    /**
     * Get all playlists on a given page via memo
     */
    static getPlaylistsFromMemo(memo) {
        const playlists = memo.getType(Playlist, GridPlaylist);
        const lockup_views = memo.getType(LockupView)
            .filter((lockup) => {
            return ['PLAYLIST', 'ALBUM', 'PODCAST'].includes(lockup.content_type);
        });
        if (lockup_views.length > 0) {
            playlists.push(...lockup_views);
        }
        return playlists;
    }
    /**
     * Get all the videos in the feed
     */
    get videos() {
        return Feed.getVideosFromMemo(__classPrivateFieldGet(this, _Feed_memo, "f"));
    }
    /**
     * Get all the community posts in the feed
     */
    get posts() {
        return __classPrivateFieldGet(this, _Feed_memo, "f").getType(BackstagePost, Post, SharedPost);
    }
    /**
     * Get all the channels in the feed
     */
    get channels() {
        return __classPrivateFieldGet(this, _Feed_memo, "f").getType(Channel, GridChannel);
    }
    /**
     * Get all playlists in the feed
     */
    get playlists() {
        return Feed.getPlaylistsFromMemo(__classPrivateFieldGet(this, _Feed_memo, "f"));
    }
    get memo() {
        return __classPrivateFieldGet(this, _Feed_memo, "f");
    }
    /**
     * Returns contents from the page.
     */
    get page_contents() {
        const tab_content = __classPrivateFieldGet(this, _Feed_memo, "f").getType(Tab)?.[0].content;
        const reload_continuation_items = __classPrivateFieldGet(this, _Feed_memo, "f").getType(ReloadContinuationItemsCommand)[0];
        const append_continuation_items = __classPrivateFieldGet(this, _Feed_memo, "f").getType(AppendContinuationItemsAction)[0];
        return tab_content || reload_continuation_items || append_continuation_items;
    }
    /**
     * Returns all segments/sections from the page.
     */
    get shelves() {
        return __classPrivateFieldGet(this, _Feed_memo, "f").getType(Shelf, RichShelf, ReelShelf);
    }
    /**
     * Finds shelf by title.
     */
    getShelf(title) {
        return this.shelves.get({ title });
    }
    /**
     * Returns secondary contents from the page.
     */
    get secondary_contents() {
        if (!__classPrivateFieldGet(this, _Feed_page, "f").contents?.is_node)
            return null;
        const node = __classPrivateFieldGet(this, _Feed_page, "f").contents?.item();
        if (!node.is(TwoColumnBrowseResults, TwoColumnSearchResults))
            return null;
        return node.secondary_contents;
    }
    get actions() {
        return __classPrivateFieldGet(this, _Feed_actions, "f");
    }
    /**
     * Get the original page data
     */
    get page() {
        return __classPrivateFieldGet(this, _Feed_page, "f");
    }
    /**
     * Checks if the feed has continuation.
     */
    get has_continuation() {
        return __classPrivateFieldGet(this, _Feed_instances, "m", _Feed_getBodyContinuations).call(this).length > 0;
    }
    /**
     * Retrieves continuation data as it is.
     */
    async getContinuationData() {
        if (__classPrivateFieldGet(this, _Feed_continuation, "f")) {
            if (__classPrivateFieldGet(this, _Feed_continuation, "f").length === 0)
                throw new InnertubeError('There are no continuations.');
            return await __classPrivateFieldGet(this, _Feed_continuation, "f")[0].endpoint.call(__classPrivateFieldGet(this, _Feed_actions, "f"), { parse: true });
        }
        __classPrivateFieldSet(this, _Feed_continuation, __classPrivateFieldGet(this, _Feed_instances, "m", _Feed_getBodyContinuations).call(this), "f");
        if (__classPrivateFieldGet(this, _Feed_continuation, "f"))
            return this.getContinuationData();
    }
    /**
     * Retrieves next batch of contents and returns a new {@link Feed} object.
     */
    async getContinuation() {
        const continuation_data = await this.getContinuationData();
        if (!continuation_data)
            throw new InnertubeError('Could not get continuation data');
        return new Feed(this.actions, continuation_data, true);
    }
}
_Feed_page = new WeakMap(), _Feed_actions = new WeakMap(), _Feed_memo = new WeakMap(), _Feed_continuation = new WeakMap(), _Feed_instances = new WeakSet(), _Feed_isParsed = function _Feed_isParsed(response) {
    return !('data' in response);
}, _Feed_getBodyContinuations = function _Feed_getBodyContinuations() {
    if (__classPrivateFieldGet(this, _Feed_page, "f").header_memo) {
        const header_continuations = __classPrivateFieldGet(this, _Feed_page, "f").header_memo.getType(ContinuationItem);
        return __classPrivateFieldGet(this, _Feed_memo, "f").getType(ContinuationItem).filter((continuation) => !header_continuations.includes(continuation));
    }
    return __classPrivateFieldGet(this, _Feed_memo, "f").getType(ContinuationItem);
};
export default Feed;
//# sourceMappingURL=Feed.js.map