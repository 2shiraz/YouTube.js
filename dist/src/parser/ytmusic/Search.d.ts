import { MusicShelfContinuation } from '../index.js';
import ChipCloud from '../classes/ChipCloud.js';
import ChipCloudChip from '../classes/ChipCloudChip.js';
import DidYouMean from '../classes/DidYouMean.js';
import ItemSection from '../classes/ItemSection.js';
import Message from '../classes/Message.js';
import MusicCardShelf from '../classes/MusicCardShelf.js';
import MusicHeader from '../classes/MusicHeader.js';
import MusicShelf from '../classes/MusicShelf.js';
import ShowingResultsFor from '../classes/ShowingResultsFor.js';
import type { ObservedArray } from '../helpers.js';
import type { ISearchResponse } from '../types/index.js';
import type { ApiResponse, Actions } from '../../core/index.js';
export default class Search {
    #private;
    header?: ChipCloud;
    contents?: ObservedArray<MusicShelf | MusicCardShelf | ItemSection>;
    constructor(response: ApiResponse, actions: Actions, is_filtered?: boolean);
    /**
     * Loads more items for the given shelf.
     */
    getMore(shelf: MusicShelf | undefined): Promise<Search>;
    /**
     * Retrieves search continuation. Only available for filtered searches and shelf continuations.
     */
    getContinuation(): Promise<SearchContinuation>;
    /**
     * Applies given filter to the search.
     */
    applyFilter(target_filter: string | ChipCloudChip): Promise<Search>;
    get filters(): string[];
    get has_continuation(): boolean;
    get did_you_mean(): DidYouMean | undefined;
    get showing_results_for(): ShowingResultsFor | undefined;
    get message(): Message | undefined;
    get songs(): MusicShelf | undefined;
    get videos(): MusicShelf | undefined;
    get albums(): MusicShelf | undefined;
    get artists(): MusicShelf | undefined;
    get playlists(): MusicShelf | undefined;
    get page(): ISearchResponse;
}
export declare class SearchContinuation {
    #private;
    header?: MusicHeader;
    contents?: MusicShelfContinuation;
    constructor(actions: Actions, response: ApiResponse);
    getContinuation(): Promise<SearchContinuation>;
    get has_continuation(): boolean;
    get page(): ISearchResponse;
}
