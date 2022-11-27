import  {AbstractClient} from "@/client/abstract.client";
import {Lecture, LectureCollectionResource} from "@/types/lecture.types";

export class LectureClient extends AbstractClient<Lecture, LectureCollectionResource> {
    constructor() {
        super('lectures')
    }
}