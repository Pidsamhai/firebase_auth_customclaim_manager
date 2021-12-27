interface User {
    uid: string,
    email: string,
    disable: boolean,
    claims?: {
        [key: string]: any;
    },
    emailVerified: boolean
}
