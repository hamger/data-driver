type Constructor = {
  new (...args: any[]): any;
}

export interface PropOptions {
  type?: Constructor | Constructor[] | null;
  required?: boolean;
  default?: any;
}

export interface WatchOptions {
  deep?: boolean;
  immediate?: boolean;
}

export interface ComputedOptions {
  get?(): any;
  set?(v: any): void;
}
