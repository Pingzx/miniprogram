Page({
  data: {
    // 文本框的数据模型
    input: '',
    // 任务清单的数据模型
    todos: [
      { name: 'Learning WEAPP', complete: false },
      { name: 'Learning JavaScript', complete: true },
      { name: 'Learning CSS', complete: false },
    ],
    leftCount: 2,
    allCompleted: false
  },

  // 拿到input输入的值
  inputChangeHandle: function (e) {
    this.setData({
      input: e.detail.value
    })
  },

  // 点击按钮添加任务
  addTodoHandle: function () {
    // 如果没有输入任何数据，就不执行添加操作
    if (!this.data.input) return
    let todos = this.data.todos
    todos.push({
      name: this.data.input,
      complete: false
    })
    this.setData({ 
      todos:todos ,
      input:'',
      leftCount:this.data.leftCount + 1 })
  },

  // 切换任务状态
  toggleTodoHandle (e) {
    // console.log(e.currentTarget)
    let item = this.data.todos[e.currentTarget.dataset.index]
    item.complete = !item.complete
    // 根据当前任务完成状态决定加一还是减一
    let leftCount = this.data.leftCount + (item.complete ? -1 : 1)
    this.setData({
      todos: this.data.todos,
      leftCount:leftCount
    })
  },

  // 删除任务
  removeTodoHandle (e) {
    let todos = this.data.todos
    let index = e.currentTarget.dataset.index
    // 根据删除任务的完成状态判断计数器是否加减
    let item = todos.splice(index,1)[0]
    let leftCount = this.data.leftCount + (item.complete ? 0 : -1)
    this.setData({
      todos: todos,
      leftCount:leftCount
    })
  },

  // 全选/全不选 切换
  toggleAllHandle () {
    this.data.allCompleted = !this.data.allCompleted
    let todos = this.data.todos
    todos.forEach(item => {
      item.complete = this.data.allCompleted
    })
    this.setData({
      todos:todos,
      leftCount: this.data.allCompleted ? 0 : todos.length
    })
  },

  // 清空已完成任务
  clearHandle () {
    // let todos = []
    // this.data.todos.forEach(function (item) {
    //   if (!item.complete) {
    //     todos.push(item)
    //   }
    // })
    // 优化以上代码
    let todos = this.data.todos.filter(function(item) {
      return !item.complete
    })

    this.setData({
      todos:todos
    })
  }

})