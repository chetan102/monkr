import { AuthService } from '../services';
import { StateManager } from '../core/state-manager';
import { UIManager } from '../core/ui-manager';
import { AppController } from '../controllers/app-controller';

export interface IAppContext {
    mode: 'ui' | 'cli';
    services?: {
        auth: AuthService;
        // add other services here
    };
    state: StateManager;
    ui?: any;
    app?: AppController;
    currentScreen?: any;
    screen?: any;
}

export function createAppContext(mode: 'ui' | 'cli'): IAppContext {
    const ctx = {
        mode,
        state: new StateManager(),
        currentScreen: undefined,
        screen: undefined,
    } as IAppContext;


    // SERVICES
    ctx.services = {
        auth: new AuthService(ctx),
        // add other services here as needed
    };

    // CORE
    ctx.ui = new UIManager(ctx);
    ctx.app = new AppController(ctx);

    return ctx;
}
