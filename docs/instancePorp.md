### dd.$parent

- 类型：`DD instance`

- 只读

- 描述：

  父实例，如果当前实例有的话。

### dd.$children
- 类型：`Array<DD instance>`

- 只读

- 描述：

  当前实例的直接子组件。需要注意 $children 并不保证顺序，也不是响应式的。

### dd.$options
- 类型：`Object`

- 只读

- 描述：

  用于当前 DD 实例的初始化选项。需要在选项中包含自定义属性时会有用处：
  ```js
  new DD({
    customOption: 'foo',
    created: function () {
      console.log(this.$options.customOption) // => 'foo'
    }
  })
  ```