export default class Credential {
    type: string
    projectId: string
    privateKeyId: string
    privateKey: string
    clientEmail: string
    clientId: string
    authUri: string
    tokenUri: string
    authProviderX509CertUrl: string
    clientC509CertUrl: string

    constructor(json: any) {
        this.type = json.type;
        this.projectId = json.project_id;
        this.privateKeyId = json.private_key_id;
        this.privateKey = json.private_key;
        this.clientEmail = json.client_email;
        this.clientId = json.client_id;
        this.authUri = json.auth_uri;
        this.tokenUri = json.token_uri;
        this.authProviderX509CertUrl = json.auth_provider_x509_cert_url;
        this.clientC509CertUrl = json.client_x509_cert_url;
    }
}