import { AppContext } from "../../core/context";

export class AuthService {
    // constructor(private ctx: AppContext) {}
    
    async login(username: string, password: string): Promise<void> {
        console.log(`Logging in user: ${username}`);
        // Implement login logic here
        // For example, call an API to authenticate the user
        // If successful, store user info in context
        // this.ctx.user = { username };
    }
    
    async logout(): Promise<void> {
        console.log('Logging out user');
        // Implement logout logic here
        // Clear user info from context
        // this.ctx.user = null;
    }
    
    isAuthenticated() {
        // return !!this.ctx.user;
    }
    }