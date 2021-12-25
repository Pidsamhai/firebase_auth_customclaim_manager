import * as CryptoJS from 'crypto-js';
import * as aes from 'crypto-js/aes';
import { SECRETS_KEY } from './secrets';

// const aes = CryptoJS.AES;
const deCode = CryptoJS.enc.Utf8;

class Credential {
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
        this.projectId = json.projectId;
        this.privateKeyId = json.privateKeyId;
        this.privateKey = json.privateKey;
        this.clientEmail = json.clientEmail;
        this.clientId = json.clientId;
        this.authUri = json.authUri;
        this.tokenUri = json.tokenUri;
        this.authProviderX509CertUrl = json.authProviderX509CertUrl;
        this.clientC509CertUrl = json.clientC509CertUrl;
    }

    encrypt(): void {
        this.type = aes.encrypt(this.type, SECRETS_KEY).toString();
        this.projectId = aes.encrypt(this.projectId, SECRETS_KEY).toString();
        this.privateKeyId = aes.encrypt(this.privateKeyId, SECRETS_KEY).toString();
        this.privateKey = aes.encrypt(this.privateKey, SECRETS_KEY).toString();
        this.clientEmail = aes.encrypt(this.clientEmail, SECRETS_KEY).toString();
        this.clientId = aes.encrypt(this.clientId, SECRETS_KEY).toString();
        this.authUri = aes.encrypt(this.authUri, SECRETS_KEY).toString();
        this.tokenUri = aes.encrypt(this.tokenUri, SECRETS_KEY).toString();
        this.authProviderX509CertUrl = aes.encrypt(this.authProviderX509CertUrl, SECRETS_KEY).toString();
        this.clientC509CertUrl = aes.encrypt(this.clientC509CertUrl, SECRETS_KEY).toString();
    }

    decrypt(): void {
        this.type = aes.decrypt(this.type, SECRETS_KEY).toString(deCode);
        this.projectId = aes.decrypt(this.projectId, SECRETS_KEY).toString(deCode);
        this.privateKeyId = aes.decrypt(this.privateKeyId, SECRETS_KEY).toString(deCode);
        this.privateKey = aes.decrypt(this.privateKey, SECRETS_KEY).toString(deCode);
        this.clientEmail = aes.decrypt(this.clientEmail, SECRETS_KEY).toString(deCode);
        this.clientId = aes.decrypt(this.clientId, SECRETS_KEY).toString(deCode);
        this.authUri = aes.decrypt(this.authUri, SECRETS_KEY).toString(deCode);
        this.tokenUri = aes.decrypt(this.tokenUri, SECRETS_KEY).toString(deCode);
        this.authProviderX509CertUrl = aes.decrypt(this.authProviderX509CertUrl, SECRETS_KEY).toString(deCode);
        this.clientC509CertUrl = aes.decrypt(this.clientC509CertUrl, SECRETS_KEY).toString(deCode);
    }
}

class Template {
    id: string
    name: string
    projectUrl: string
    credential: Credential
    isEncrypted: boolean = false;

    constructor(
        json: any
    ) {
        this.id = json.id;
        this.name = json.name;
        this.projectUrl = json.projectUrl;
        this.isEncrypted = json.isEncrypted ?? false;
        this.credential = new Credential(json.credential);
    }

    encrypt(): Template {
        this.credential.encrypt();
        this.isEncrypted = true;
        return this;
    }

    decrypt(): Template {
        this.credential.decrypt();
        this.isEncrypted = false;
        return this;
    }
}

export { Template, Credential }