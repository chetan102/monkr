import {  IAppContext } from '../context/context';
import { EnumScreenType } from '../types/screen/screen';

export class UIManager {
    constructor(private ctx: IAppContext) { }

    start() {
        this.ctx.ui.navigate(EnumScreenType.HOME);
    }

    navigate(screenName: EnumScreenType, params?: any) {
        if (this.ctx.currentScreen) this.ctx.currentScreen.destroy();
        const ScreenClass = require(`../screens/${screenName}.ts`).default;
        this.ctx.currentScreen = new ScreenClass(this.ctx, params);
        this.ctx.currentScreen.render();
    }
}
