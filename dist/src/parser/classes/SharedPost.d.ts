import { YTNode } from '../helpers.js';
import type { RawNode } from '../index.js';
import BackstagePost from './BackstagePost.js';
import Button from './Button.js';
import Menu from './menus/Menu.js';
import Author from './misc/Author.js';
import Text from './misc/Text.js';
import Thumbnail from './misc/Thumbnail.js';
import NavigationEndpoint from './NavigationEndpoint.js';
import Post from './Post.js';
export default class SharedPost extends YTNode {
    static type: string;
    thumbnail: Thumbnail[];
    content: Text;
    published: Text;
    menu: Menu | null;
    original_post: BackstagePost | Post | null;
    id: string;
    endpoint: NavigationEndpoint;
    expand_button: Button | null;
    author: Author;
    constructor(data: RawNode);
}
