import { DD } from "./dd";

type Constructor = {
  new (...args: any[]): any;
}

export type Component = typeof DD | ComponentOptions<DD>;
export interface ComponentOptions<D extends DD> {
  data?: Object | ((this: D) => Object);
  props?: string[] | { [key: string]: PropOptions | Constructor | Constructor[] };
  propsData?: Object;
  computed?: { [key: string]: ((this: D) => any) | ComputedOptions };
  methods?: { [key: string]: Function };
  watch?: { [key: string]: ({ handler: WatchHandler<D> } & WatchOptions) | WatchHandler<D> | string };

  el?: Element | String;
  template?: string;

  beforeCreate?(this: D): void;
  created?(this: D): void;
  beforeDestroy?(this: D): void;
  destroyed?(this: D): void;

  components?: { [key: string]: Component };

  parent?: DD;
  mixins?: (ComponentOptions<DD> | typeof DD)[];
  name?: string;
  extends?: ComponentOptions<DD> | typeof DD;
}

export interface PropOptions {
  type?: Constructor | Constructor[] | null;
  required?: boolean;
  default?: any;
}

export type WatchHandler<D> = (this: D, val: any, oldVal: any) => void;

export interface WatchOptions {
  deep?: boolean;
  immediate?: boolean;
}

export interface ComputedOptions {
  get?(): any;
  set?(v: any): void;
}
