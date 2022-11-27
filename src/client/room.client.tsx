import {AbstractClient} from "@/client/abstract.client";
import {Room, RoomCollectionResource} from "@/types/room.types";

export class RoomClient extends AbstractClient<Room, RoomCollectionResource> {
    constructor() {
        super('rooms')
    }
}
