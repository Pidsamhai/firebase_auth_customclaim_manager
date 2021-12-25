import * as CryptoJS from "crypto-js";
import {SECRETS_KEY} from "./secrets";

const aes = CryptoJS.AES;
const deCode = CryptoJS.enc.Utf8;

function encrypt(source: string): string {
  return aes.encrypt(source, SECRETS_KEY).toString();
}

function decrypt(source: string): string {
  return aes.decrypt(source, SECRETS_KEY).toString(deCode);
}

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
      this.type = encrypt(this.type);
      this.projectId = encrypt(this.projectId);
      this.privateKeyId = encrypt(this.privateKeyId);
      this.privateKey = encrypt(this.privateKey);
      this.clientEmail = encrypt(this.clientEmail);
      this.clientId = encrypt(this.clientId);
      this.authUri = encrypt(this.authUri);
      this.tokenUri = encrypt(this.tokenUri);
      this.authProviderX509CertUrl = encrypt(this.authProviderX509CertUrl);
      this.clientC509CertUrl = encrypt(this.clientC509CertUrl);
    }

    decrypt(): void {
      this.type = decrypt(this.type);
      this.projectId = decrypt(this.projectId);
      this.privateKeyId = decrypt(this.privateKeyId);
      this.privateKey = decrypt(this.privateKey);
      this.clientEmail = decrypt(this.clientEmail);
      this.clientId = decrypt(this.clientId);
      this.authUri = decrypt(this.authUri);
      this.tokenUri = decrypt(this.tokenUri);
      this.authProviderX509CertUrl = decrypt(this.authProviderX509CertUrl);
      this.clientC509CertUrl = decrypt(this.clientC509CertUrl);
    }
}

class Template {
    id: string
    name: string
    projectUrl: string
    credential: Credential
    isEncrypted = false;

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

export {Template, Credential};
