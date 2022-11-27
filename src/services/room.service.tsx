import {AbstractService} from "@/services/abstract.service";
import {RoomClient} from "@/client/room.client";
import {Room, RoomCollectionResource} from "@/types/room.types";

class RoomService extends AbstractService<Room, RoomCollectionResource> {
    constructor() {
        super(new RoomClient())
    }
}

export default new RoomService()