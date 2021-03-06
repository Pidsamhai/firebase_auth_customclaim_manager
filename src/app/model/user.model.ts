interface User {
    uid: string,
    email: string,
    disable: boolean,
    claims?: {
        [key: string]: any;
    },
    emailVerified: boolean
}

interface UserResponse {
    data: Array<User>
    next?: string
}

export { User, UserResponse }