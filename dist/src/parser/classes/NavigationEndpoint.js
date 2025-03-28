import { YTNode } from '../helpers.js';
import { Parser } from '../index.js';
import OpenPopupAction from './actions/OpenPopupAction.js';
import CreatePlaylistDialog from './CreatePlaylistDialog.js';
class NavigationEndpoint extends YTNode {
    constructor(data) {
        super();
        if (data) {
            if (data.serialCommand || data.parallelCommand) {
                const raw_command = data.serialCommand || data.parallelCommand;
                this.commands = raw_command.commands.map((command) => new NavigationEndpoint(command));
            }
            if (data.innertubeCommand || data.command || data.performOnceCommand) {
                data = data.innertubeCommand || data.command || data.performOnceCommand;
            }
        }
        this.command = Parser.parseCommand(data);
        if (Reflect.has(data || {}, 'openPopupAction'))
            this.open_popup = new OpenPopupAction(data.openPopupAction);
        this.name = Object.keys(data || {})
            .find((item) => item.endsWith('Endpoint') ||
            item.endsWith('Command'));
        this.payload = this.name ? Reflect.get(data, this.name) : {};
        if (Reflect.has(this.payload, 'dialog') || Reflect.has(this.payload, 'content')) {
            this.dialog = Parser.parseItem(this.payload.dialog || this.payload.content);
        }
        if (Reflect.has(this.payload, 'modal')) {
            this.modal = Parser.parseItem(this.payload.modal);
        }
        if (Reflect.has(this.payload, 'nextEndpoint')) {
            this.next_endpoint = new NavigationEndpoint(this.payload.nextEndpoint);
        }
        if (data?.serviceEndpoint) {
            data = data.serviceEndpoint;
        }
        this.metadata = {};
        if (data?.commandMetadata?.webCommandMetadata?.url) {
            this.metadata.url = data.commandMetadata.webCommandMetadata.url;
        }
        if (data?.commandMetadata?.webCommandMetadata?.webPageType) {
            this.metadata.page_type = data.commandMetadata.webCommandMetadata.webPageType;
        }
        if (data?.commandMetadata?.webCommandMetadata?.apiUrl) {
            this.metadata.api_url = data.commandMetadata.webCommandMetadata.apiUrl.replace('/youtubei/v1/', '');
        }
        else if (this.name) {
            this.metadata.api_url = this.getPath(this.name);
        }
        if (data?.commandMetadata?.webCommandMetadata?.sendPost) {
            this.metadata.send_post = data.commandMetadata.webCommandMetadata.sendPost;
        }
        if (data?.createPlaylistEndpoint) {
            if (data?.createPlaylistEndpoint.createPlaylistDialog) {
                this.dialog = Parser.parseItem(data?.createPlaylistEndpoint.createPlaylistDialog, CreatePlaylistDialog);
            }
        }
    }
    /**
     * Sometimes InnerTube does not return an API url, in that case the library should set it based on the name of the payload object.
     * @deprecated This should be removed in the future.
     */
    getPath(name) {
        switch (name) {
            case 'browseEndpoint':
                return '/browse';
            case 'watchEndpoint':
            case 'reelWatchEndpoint':
                return '/player';
            case 'searchEndpoint':
                return '/search';
            case 'watchPlaylistEndpoint':
                return '/next';
            case 'liveChatItemContextMenuEndpoint':
                return '/live_chat/get_item_context_menu';
        }
    }
    call(actions, args) {
        if (!actions)
            throw new Error('An API caller must be provided');
        if (this.command) {
            const command = this.command;
            return actions.execute(command.getApiPath(), { ...command.buildRequest(), ...args });
        }
        if (!this.metadata.api_url)
            throw new Error('Expected an api_url, but none was found.');
        return actions.execute(this.metadata.api_url, { ...this.payload, ...args });
    }
    toURL() {
        if (!this.metadata.url)
            return undefined;
        if (!this.metadata.page_type)
            return undefined;
        return (this.metadata.page_type === 'WEB_PAGE_TYPE_UNKNOWN' ?
            this.metadata.url : `https://www.youtube.com${this.metadata.url}`);
    }
}
NavigationEndpoint.type = 'NavigationEndpoint';
export default NavigationEndpoint;
//# sourceMappingURL=NavigationEndpoint.js.map