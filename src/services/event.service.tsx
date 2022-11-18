import {Event, EventCollectionResource} from "@/types/event.types";
import {AbstractService} from "@/services/abstract.service";
import {EventClient} from "@/client/events.client";

class EventService extends AbstractService<Event, EventCollectionResource> {
    constructor() {
        super(new EventClient())
    }
}

export default new EventService()