import { AuthService } from '../services';
import { AppController } from './app-controller';
import { StateManager } from './state-manager';

export interface AppContext {
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

export function createAppContext(mode: 'ui' | 'cli', uiInst?: any): AppContext {
  const ctx = {
    mode,
    ui: uiInst,
    state: new StateManager(),
    app: undefined,
    currentScreen: undefined,
    screen: undefined,
  } as AppContext;

  ctx.services = {
    auth: new AuthService(ctx),
    // add other services here as needed
  };

  return ctx;
}
