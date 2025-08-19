export interface IScreen {
  render(): void;
  destroy(): void;
}


export enum EnumScreenType {
    HOME = 'home-screen',
}