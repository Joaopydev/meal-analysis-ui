export type SignInParams = {
    email: string
    password: string
}

export type SignUpParams = {
    goal: string
    gender: string
    birthDate: string
    height: number
    weight: number
    activityLevel: number
    account: {
        name: string,
        email: string,
        password: string,
    }
}