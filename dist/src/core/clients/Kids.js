var _Kids_session;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import { Parser } from '../../parser/index.js';
import { Channel, HomeFeed, Search, VideoInfo } from '../../parser/ytkids/index.js';
import { InnertubeError, generateRandomString } from '../../utils/Utils.js';
import NavigationEndpoint from '../../parser/classes/NavigationEndpoint.js';
import KidsBlocklistPickerItem from '../../parser/classes/ytkids/KidsBlocklistPickerItem.js';
class Kids {
    constructor(session) {
        _Kids_session.set(this, void 0);
        __classPrivateFieldSet(this, _Kids_session, session, "f");
    }
    async search(query) {
        const search_endpoint = new NavigationEndpoint({ searchEndpoint: { query } });
        const response = await search_endpoint.call(__classPrivateFieldGet(this, _Kids_session, "f").actions, { client: 'YTKIDS' });
        return new Search(__classPrivateFieldGet(this, _Kids_session, "f").actions, response);
    }
    async getInfo(video_id) {
        const payload = { videoId: video_id };
        const watch_endpoint = new NavigationEndpoint({ watchEndpoint: payload });
        const watch_next_endpoint = new NavigationEndpoint({ watchNextEndpoint: payload });
        const session = __classPrivateFieldGet(this, _Kids_session, "f");
        const extra_payload = {
            playbackContext: {
                contentPlaybackContext: {
                    vis: 0,
                    splay: false,
                    lactMilliseconds: '-1',
                    signatureTimestamp: session.player?.sts
                }
            },
            client: 'YTKIDS'
        };
        if (session.po_token) {
            extra_payload.serviceIntegrityDimensions = {
                poToken: session.po_token
            };
        }
        const watch_response = watch_endpoint.call(session.actions, extra_payload);
        const watch_next_response = watch_next_endpoint.call(session.actions, { client: 'YTKIDS' });
        const response = await Promise.all([watch_response, watch_next_response]);
        const cpn = generateRandomString(16);
        return new VideoInfo(response, session.actions, cpn);
    }
    async getChannel(channel_id) {
        const browse_endpoint = new NavigationEndpoint({ browseEndpoint: { browseId: channel_id } });
        const response = await browse_endpoint.call(__classPrivateFieldGet(this, _Kids_session, "f").actions, { client: 'YTKIDS' });
        return new Channel(__classPrivateFieldGet(this, _Kids_session, "f").actions, response);
    }
    async getHomeFeed() {
        const browse_endpoint = new NavigationEndpoint({ browseEndpoint: { browseId: 'FEkids_home' } });
        const response = await browse_endpoint.call(__classPrivateFieldGet(this, _Kids_session, "f").actions, { client: 'YTKIDS' });
        return new HomeFeed(__classPrivateFieldGet(this, _Kids_session, "f").actions, response);
    }
    /**
     * Retrieves the list of supervised accounts that the signed-in user has
     * access to, and blocks the given channel for each of them.
     * @param channel_id - The channel id to block.
     * @returns A list of API responses.
     */
    async blockChannel(channel_id) {
        const session = __classPrivateFieldGet(this, _Kids_session, "f");
        if (!session.logged_in)
            throw new InnertubeError('You must be signed in to perform this operation.');
        const kids_blocklist_picker_command = new NavigationEndpoint({
            getKidsBlocklistPickerCommand: {
                blockedForKidsContent: {
                    external_channel_id: channel_id
                }
            }
        });
        const response = await kids_blocklist_picker_command.call(session.actions, { client: 'YTKIDS' });
        const popup = response.data.command.confirmDialogEndpoint;
        const popup_fragment = { contents: popup.content, engagementPanels: [] };
        const kid_picker = Parser.parseResponse(popup_fragment);
        const kids = kid_picker.contents_memo?.getType(KidsBlocklistPickerItem);
        if (!kids)
            throw new InnertubeError('Could not find any kids profiles or supervised accounts.');
        // Iterate through the kids and block the channel if not already blocked.
        const responses = [];
        for (const kid of kids) {
            if (!kid.block_button?.is_toggled) {
                kid.setActions(session.actions);
                // Block channel and add to the response list.
                responses.push(await kid.blockChannel());
            }
        }
        return responses;
    }
}
_Kids_session = new WeakMap();
export default Kids;
//# sourceMappingURL=Kids.js.map