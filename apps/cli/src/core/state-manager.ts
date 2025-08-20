// src/core/state-manager.ts

export interface User {
  id: string;
  username: string;
  // add more user fields as needed
}

export interface Group {
  id: string;
  name: string;
  // more group details here
}

export interface MonkrState {
  isAuthenticated: boolean;
  user: User | null;
  groupList: Group[];
  currentGroup: Group | null;
  // add more fields as your app grows
}

export class StateManager {
  private state: MonkrState = {
    isAuthenticated: false,
    user: null,
    groupList: [],
    currentGroup: null,
  };

  get<K extends keyof MonkrState>(key: K): MonkrState[K] {
    return this.state[key];
  }

  set<K extends keyof MonkrState>(key: K, value: MonkrState[K]): void {
    this.state[key] = value;
  }

  patch(partial: Partial<MonkrState>): void {
    this.state = { ...this.state, ...partial };
  }

  reset(): void {
    this.state = {
      isAuthenticated: false,
      user: null,
      groupList: [],
      currentGroup: null,
    };
  }
}
