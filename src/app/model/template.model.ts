import Credential from './credential.model'

export interface DisPlayTemplate {
    id: string
    name: string
    projectUrl: string
}

export class Template implements DisPlayTemplate {
    id: string
    name: string
    projectUrl: string
    credential: Credential
    isEncrypted: boolean = false;

    constructor(
        id: string,
        name: string,
        projectUrl: string,
        credential: Credential
    ) {
        this.id = id;
        this.name = name;
        this.projectUrl = projectUrl;
        this.credential = credential;
    }
}