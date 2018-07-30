import DD from '../../src'

export default DD.extend({
  render (h) {
    return (
      <div className="input-wrap">
        <input
          id="todo-input"
          className="input"
          type="text"
          placeholder={this.placeholder}
          value={this.inputValue}
          onchange={e => {
            this.inputValue = e.target.value
          }}
        />
        <div className="save" onclick={this.save.bind(this)}>
          保存
        </div>
      </div>
    )
  },
  props: ['placeholder'],
  data () {
    return {
      inputValue: ''
    }
  },
  methods: {
    save () {
      this.$emit('addTodo', this.inputValue)
      this.inputValue = ''
    }
  }
})
