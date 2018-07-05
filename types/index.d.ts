import {DD as _DD} from "./dd";
import * as Options from "./options";

// `DD` in `export = DD` must be a namespace
// All available types are exported via this namespace
declare namespace DD {
  export type Component = Options.Component;
  export type ComponentOptions<D extends DD> = Options.ComponentOptions<D>;
  export type PropOptions = Options.PropOptions;
  export type ComputedOptions<D extends DD> = Options.ComputedOptions<D>;
  export type WatchHandler<D extends DD> = Options.WatchHandler<D>;
  export type WatchOptions = Options.WatchOptions;
}

// TS cannot merge imported class with namespace, declare a subclass to bypass
declare class DD extends _DD {}

export = DD;
