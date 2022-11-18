
import {AbstractLinks} from "@/types/abstract-links.type";
import {ApiLink} from "@/types/api-link.types"
import {CollectionResource} from "@/types/collection-resource.types";
import {AbstractEntity} from "@/types/abstract-entity.types";

export interface IEvent {
    name: string,
    attendanceMode: string,
    interval: interval,
    owner: string,
}

export interface interval {
    startDate: string,
    endDate: string,
}

export class Event implements AbstractEntity {
    name: string;
    attendanceMode: string;
    interval: interval;
    owner: string;
    _links!: EventLinks;
    active: boolean;

    constructor() {
        this.name = '';
        this.attendanceMode = '';
        this.interval = {
            startDate: '',
            endDate: '',
        }
        this.owner = '';
        this.active = true;
    }
}

export interface EventCollectionResource extends CollectionResource<Event> {
    _embedded: {
        events: Event[]
    }
}

export interface EventLinks extends AbstractLinks {
    events: ApiLink,
}