// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.0
//   protoc               v5.29.2
// source: youtube/api/pfiinnertube/get_watch_request.proto
/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { InnerTubeContext } from "./innertube_context.js";
import { PlayerRequest } from "./player_request.js";
import { ReelItemWatchRequest } from "./reel_item_watch_request.js";
import { WatchNextRequest } from "./watch_next_request.js";
export const protobufPackage = "youtube.api.pfiinnertube";
function createBaseGetWatchRequest() {
    return { context: undefined, playerRequest: undefined, watchNextRequest: undefined, reelItemWatchRequest: undefined };
}
export const GetWatchRequest = {
    encode(message, writer = new BinaryWriter()) {
        if (message.context !== undefined) {
            InnerTubeContext.encode(message.context, writer.uint32(10).fork()).join();
        }
        if (message.playerRequest !== undefined) {
            PlayerRequest.encode(message.playerRequest, writer.uint32(18).fork()).join();
        }
        if (message.watchNextRequest !== undefined) {
            WatchNextRequest.encode(message.watchNextRequest, writer.uint32(26).fork()).join();
        }
        if (message.reelItemWatchRequest !== undefined) {
            ReelItemWatchRequest.encode(message.reelItemWatchRequest, writer.uint32(34).fork()).join();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetWatchRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.context = InnerTubeContext.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.playerRequest = PlayerRequest.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.watchNextRequest = WatchNextRequest.decode(reader, reader.uint32());
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.reelItemWatchRequest = ReelItemWatchRequest.decode(reader, reader.uint32());
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    },
};
//# sourceMappingURL=get_watch_request.js.map