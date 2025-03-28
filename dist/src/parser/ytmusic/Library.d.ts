import { GridContinuation, MusicShelfContinuation } from '../index.js';
import Grid from '../classes/Grid.js';
import MusicShelf from '../classes/MusicShelf.js';
import MusicSideAlignedItem from '../classes/MusicSideAlignedItem.js';
import MusicMultiSelectMenuItem from '../classes/menus/MusicMultiSelectMenuItem.js';
import type { ObservedArray } from '../helpers.js';
import type { IBrowseResponse } from '../types/index.js';
import type { ApiResponse, Actions } from '../../core/index.js';
import type ChipCloudChip from '../classes/ChipCloudChip.js';
export default class Library {
    #private;
    header?: MusicSideAlignedItem;
    contents?: ObservedArray<Grid | MusicShelf>;
    constructor(response: ApiResponse, actions: Actions);
    /**
     * Applies given sort option to the library items.
     */
    applySort(sort_by: string | MusicMultiSelectMenuItem): Promise<Library>;
    /**
     * Applies given filter to the library.
     */
    applyFilter(filter: string | ChipCloudChip): Promise<Library>;
    /**
     * Retrieves continuation of the library items.
     */
    getContinuation(): Promise<LibraryContinuation>;
    get has_continuation(): boolean;
    get sort_options(): string[];
    get filters(): string[];
    get page(): IBrowseResponse;
}
export declare class LibraryContinuation {
    #private;
    contents: GridContinuation | MusicShelfContinuation;
    constructor(response: ApiResponse, actions: Actions);
    getContinuation(): Promise<LibraryContinuation>;
    get has_continuation(): boolean;
    get page(): IBrowseResponse;
}
