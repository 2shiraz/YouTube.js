import { type ObservedArray, YTNode } from '../../../helpers.js';
import type { RawNode } from '../../../index.js';
import Button from '../../Button.js';
import ButtonView from '../../ButtonView.js';
import NavigationEndpoint from '../../NavigationEndpoint.js';
import Author from '../../misc/Author.js';
import Text from '../../misc/Text.js';
export default class LiveChatTextMessage extends YTNode {
    static type: string;
    id: string;
    message: Text;
    inline_action_buttons: ObservedArray<Button>;
    timestamp: number;
    timestamp_usec: number;
    timestamp_text?: string;
    author: Author;
    menu_endpoint?: NavigationEndpoint;
    context_menu_accessibility_label?: string;
    before_content_buttons: ObservedArray<ButtonView>;
    constructor(data: RawNode);
}
