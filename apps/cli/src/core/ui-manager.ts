import { createAppContext, AppContext } from './context';
import { AppController } from './app-controller';
import { EnumScreenType } from '../types/screen/screen';

export class UIManager {
  private ctx!: AppContext;

  start() {
    this.ctx = createAppContext('ui', this);
    this.ctx.app = new AppController(this.ctx);
  }

  navigate(screenName: EnumScreenType, params?: any) {
    if (this.ctx.currentScreen) this.ctx.currentScreen.destroy();
    const ScreenClass = require(`../screens/${screenName}`).default;
    this.ctx.currentScreen = new ScreenClass(this.ctx, params);
    this.ctx.currentScreen.render();
  }
}
