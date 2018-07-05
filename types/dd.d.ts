import {
  Component,
  ComponentOptions,
  WatchOptions,
  WatchHandler,
} from "./options.d";

export declare class DD {

  constructor(options?: ComponentOptions<DD>);

  $data: Object;
  readonly $options: ComponentOptions<this>;
  readonly $parent: DD;
  readonly $root: DD;
  readonly $children: DD[];

  $watch(
    expOrFn: string | Function,
    callback: WatchHandler<this>,
    options?: WatchOptions
  ): (() => void);
  $on(event: string, callback: Function): this;
  $once(event: string, callback: Function): this;
  $off(event?: string, callback?: Function): this;
  $emit(event: string, ...args: any[]): this;

  static extend(options: ComponentOptions<DD>): typeof DD;
  static component(id: string, definition?: Component): typeof DD;

  static mixin(mixin: typeof DD | ComponentOptions<DD>): void;
}
