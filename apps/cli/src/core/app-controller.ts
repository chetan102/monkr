import { AppContext } from "./context";


export class AppController {
    private ctx: AppContext;

    constructor(ctx: AppContext) {
        this.ctx = ctx;
    }

    public getContext(): AppContext {
        return this.ctx;
    }
}
