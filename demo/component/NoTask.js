import RD from '../../src/index'

let NoTask = RD.extend({
  render(h) {
    return (
      <div className="no-task">{this.noTaskInfo}</div>
    )
  },
  props: ['noTaskInfo']
})

export default NoTask