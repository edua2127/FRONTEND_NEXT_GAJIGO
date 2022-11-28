import {AbstractService} from "@/services/abstract.service";
import {TagClient} from "@/client/tag.client";
import {Tag, TagCollectionResource} from "@/types/tag.types";

class TagService extends AbstractService<Tag, TagCollectionResource> {
    constructor() {
        super(new TagClient())
    }
}

export default new TagService()