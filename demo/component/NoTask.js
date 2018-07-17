import DD from '../../src/index'

let NoTask = DD.extend({
  render (h) {
    return <div className="no-task">{this.noTaskInfo}</div>
  },
  props: ['noTaskInfo']
})

export default NoTask
