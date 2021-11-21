declare global{
    namespace NodeJs{
        interface ProcessEnv{
            jwt_key: string
        }
    }
}

export {}