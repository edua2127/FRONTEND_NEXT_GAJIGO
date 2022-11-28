import { AbstractLinks } from './abstract-links.type'
import { ApiLink } from '@/types/api-link.types'
import { CollectionResource } from '@/types/collection-resource.types'
import { AbstractEntity } from '@/types/abstract-entity.types'

export class User implements AbstractEntity {
    id!: number;
    name: string;
    email: string;
    username: string;
    password: string;
    _links!: UserLinks;
    active: boolean;
    description: string;
    events!: [];
    documents!: [];
    admin: boolean;
    organizes!: [];
    telephone!: string;
    participatesIn!: [];
    speaksIn!: [];
    authorities!: autorities[];
    constructor() {
        this.name = '';
        this.email = '';
        this.username = '';
        this.password = '';
        this.active = true;
        this.description = '';
        this.documents = [];
        this.admin = false;
        this.organizes = [];
        this.telephone = '';
        this.participatesIn = [];
        this.speaksIn = [];
        this.authorities = [];
    }

    get passwords() {
        return // eventService.getAll(this._links.events)
    }
}

export interface autorities {
    authority: string;
}

export interface UserCollection extends CollectionResource<User> {
    // Tentei setar dinamicamente jogando uma variavel "nomeRecurso" em AbstractEntity
    // porem tem que ser manual mesmo, foda.
    _embedded: {
        users: User[]
    }
}

interface UserLinks extends AbstractLinks {
    passwords: ApiLink
}