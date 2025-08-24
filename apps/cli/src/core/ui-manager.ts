import { IAppContext } from '../context/context';
import { EnumScreenType } from '../types/screen/screen';
import blessed from 'blessed';

export class UIManager {
    constructor(private ctx: IAppContext) { }

    start() {
        const screen = blessed.screen({
            smartCSR: true,
            title: 'Monkr CLI',
        });
        this.ctx.screen = screen;

        this.ctx.ui.navigate(EnumScreenType.HOME);
    }

    navigate(screenName: EnumScreenType, params?: any) {
        if (this.ctx.currentScreen) this.ctx.currentScreen.destroy();
        const ScreenClass = require(`../screens/${screenName}.ts`).default;
        this.ctx.currentScreen = new ScreenClass(this.ctx, params);
        this.ctx.currentScreen.render();
    }
}
