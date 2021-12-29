const fs = require('fs');
const faker = require('faker');
const uuid = require('uuid');

function main() {
    const defaultRage = 100;
    const range = process.argv.find(v => v.startsWith("n="))?.split("=")?.[1];
    const user = {
        localId: "DxmNBraEVSXTJ7UO5aA5L7Oi01Xs",
        createdAt: "1640759507755",
        lastLoginAt: "1640759507754",
        displayName: "",
        photoUrl: "",
        emailVerified: false,
        email: "aaa@aaa.com",
        salt: "fakeSalt5fGXDzv9vg0nmXYX58tp",
        passwordHash: "fakeHash:salt=fakeSalt5fGXDzv9vg0nmXYX58tp:password=123456",
        passwordUpdatedAt: 1640759507754,
        validSince: "1640759507",
        providerUserInfo: [
            {
                providerId: "password",
                email: "aaa@aaa.com",
                federatedId: "aaa@aaa.com",
                rawId: "aaa@aaa.com",
                displayName: "",
                photoUrl: ""
            }
        ]
    }
    const account = {
        kind: "identitytoolkit#DownloadAccountResponse",
        users: []
    }

    const users = [];

    if(!range) {
        console.info(`No range in put use defalut 100 ${defaultRage}`);
    }

    for (let index = 0; index < range ?? defaultRage; index++) {
        
        const _user = Object.assign({}, user);
        const now = Date.now();
        const email = faker.internet.email();
        _user.localId = uuid.v1();
        _user.createdAt = `${now}`
        _user.lastLoginAt = `${now}`
        _user.email = email;
        _user.passwordUpdatedAt = Date.now();
        _user.emailVerified = Math.random() < 0.7
        _user.providerUserInfo = [{
            providerId: "password",
            email: email,
            federatedId: email,
            rawId: email,
            displayName: "",
            photoUrl: ""
        }];

        users.push(_user);
        
    }

    account.users = users;

    fs.writeFile('./seed/auth_export/accounts.json', JSON.stringify(account, null, 2), err => {
        if (err) {
          console.error(err)
          return
        }
        console.log(`${range ?? defaultRage} Users generated`);
      })
}


main();