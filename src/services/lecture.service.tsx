import {AbstractService} from "@/services/abstract.service";
import {LectureClient} from "@/client/lecture.client";
import {Lecture, LectureCollectionResource} from "@/types/lecture.types";

class LectureService extends AbstractService<Lecture, LectureCollectionResource> {
    constructor() {
        super(new LectureClient())
    }
}

export default new LectureService()