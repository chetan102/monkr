// import { AuthService } from '../services/AuthService';
// import { ChatService } from '../services/ChatService';
// import { StateManager } from './StateManager';
import { AuthService } from "../services";
import { AppController } from "./app-controller";

export interface AppContext {
  mode: 'ui' | 'cli';
//   state: StateManager;
  services: {
    auth: AuthService;
  };
  ui?: any;
  app?: AppController;
  currentScreen?: any;
  screen?: any;
}

export function createAppContext(mode: 'ui' | 'cli', uiInst?: any): AppContext {
  return {
    mode,
    // state: new StateManager(),
    services: {
      auth: new AuthService(), // Placeholder, will be set later
    },
    ui: uiInst,
    app: undefined,
  };
}
