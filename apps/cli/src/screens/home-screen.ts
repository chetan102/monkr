import blessed from 'blessed';
import { IScreen } from '../types/screen/screen';
import { AppContext } from '../core/context';

export default class HomeScreen implements IScreen {
  constructor(private ctx: AppContext, private params? : any) {}

  render() {
    console.log('Rendering Home Screen');

    // const box = blessed.box({
    //   label: 'Monkr CLI',
    //   content: 'Welcome to Monkr!\n[Select Group with arrows, press Enter]',
    //   width: '70%',
    //   height: '40%',
    //   top: 'center',
    //   left: 'center',
    //   border: 'line',
    // });
    // // Example: Select between groups
    // const groupList = blessed.list({
    //   items: ['SAAS', 'Javascript Mastery', 'DevOps'],
    //   top: 5,
    //   left: 3,
    //   width: '50%',
    //   height: 5,
    //   border: 'line',
    // });
    // groupList.on('select', async (item, idx) => {
    //   const groupName = groupList.getItem(idx).content.trim();
    //   await this.ctx.app.joinGroup(groupName); // Call central logic!
    // });
    // box.append(groupList);
    // this.ctx.screen.append(box);

    // this.ctx.currentScreen = this;
    // this.ctx.screen.render();
  }

  destroy() {
    // Remove blessed components if needed
  }
}
