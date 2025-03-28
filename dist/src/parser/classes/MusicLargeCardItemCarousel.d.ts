import NavigationEndpoint from './NavigationEndpoint.js';
import Thumbnail from './misc/Thumbnail.js';
import { YTNode } from '../helpers.js';
import type { RawNode } from '../index.js';
declare class ActionButton {
    static type: string;
    icon_name: string;
    endpoint: NavigationEndpoint;
    a11y_text: string;
    style: string;
    constructor(data: RawNode);
}
declare class Panel {
    static type: string;
    image: Thumbnail[];
    content_mode: string;
    crop_options: string;
    image_aspect_ratio: string;
    caption: string;
    action_buttons: ActionButton[];
    constructor(data: RawNode);
}
export default class MusicLargeCardItemCarousel extends YTNode {
    static type: string;
    panels: Panel[];
    header: any;
    constructor(data: RawNode);
}
export {};
