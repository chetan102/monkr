import { IAppContext } from "../../context/context";

export class AuthController {
    constructor(private ctx: IAppContext) {}

    async login(username: string, password: string): Promise<void> {
       console.log(`Logging in user: ${username}`);
    }

    async logout(): Promise<void> {
        console.log('Logging out user');
    }

    isAuthenticated(): boolean {
        return true;
    }
}