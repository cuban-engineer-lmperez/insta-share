export interface IFirebaseError {
    code: string,
    customData: {
        appName: string,
        _tokenResponse: {
            error: {
                code: number,
                errors: []
                message: string
            }
        }
    },
    name: string,
}