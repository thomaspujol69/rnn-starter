import { makeAutoObservable } from 'mobx';
import { hydrateStore, makePersistable } from 'mobx-persist-store';

export class Counter implements IStore {
  value = 0;
  inc = (): void => {
    this.value += 1;
  };
  dec = (): void => {
    this.value -= 1;
  };
  reset = (): void => {
    this.value = 0;
  };

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: 'Counter',
      properties: ['value'],
    });
  }

  hydrate = async (): PVoid => {
    await hydrateStore(this);
  };
}
