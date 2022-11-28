import {AbstractLinks} from "@/types/abstract-links.type";
import {ApiLink} from "@/types/api-link.types"

import {CollectionResource} from "@/types/collection-resource.types";
import {AbstractEntity} from "@/types/abstract-entity.types";

interface ILecture {
    id: number,
    name: string,
    description: string,
}

export class Lecture implements AbstractEntity {
    id!: number;
    name: string;
    description: string;
    room!: string;
    active!: boolean;
    _links!: LectureLinks;
    event!: string;
    language!:string;
    tags!: string[];
    interval!: interval;
    attendanceMode!: string;
    constructor() {
        this.name = '';
        this.description = '';
        this.room = '';
        this.event = '';
        this.language = '';
        this.tags = [];
        this.interval = {
            startDate: '',
            endDate: '',
        };
        this.attendanceMode = '';
    }
}

export interface interval {
    startDate: string,
    endDate: string,
}

export interface LectureCollectionResource  extends CollectionResource<Lecture> {
    _embedded: {
        palestras: Lecture[]
    }
}

export interface LectureLinks extends AbstractLinks {
    palestras: ApiLink,
}