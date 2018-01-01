export default {
  Folder: AV.Object.extend('Folder'),
  Artical: AV.Object.extend('Artical'),

  updateFolder(data) {
    let folder
    if (data.id) {
      folder = AV.Object.createWithoutData('Folder', data.id)
    } else {
      folder = new this.Folder()
    }

    if (data.del) {
      return folder.destroy()
    } else {
      folder.set('name', data.name)
      return folder.save()
    }
  },

  updateArtical(data) {
    let artical

    if (data.id) {
      // edit
      artical = AV.Object.createWithoutData('Artical', data.id)
    } else {
      // add
      artical = new this.Artical()
    }

    if (data.status === -1) {
      // del
      return artical.destroy()
    } else {
      Object.keys(data).forEach(key => {
        if (key !== 'id') {
          artical.set(key, data[key])
        }
      })
      return artical.save()
    }
  },

  getList(table, condition) {
    let ins = new AV.Query(table)

    if (condition) {
      Object.keys(condition).forEach(key => {
        ins.equalTo(key, condition[key])
      })
    }
    ins.descending('createdAt')

    return ins.find()
  },

  // 手动注册用户 后门
  signUp() {
    // 新建 AVUser 对象实例
    let user = new AV.User()
    // 设置用户名
    user.setUsername('jmingzi')
    // 设置密码
    user.setPassword('ck.123456')
    // 设置邮箱
    user.setEmail('472102644@qq.com')
    user.signUp().then((loginedUser)=> {
      console.log(loginedUser)
    },  (error)=> {
    })
  },

  currentUser() {
    return AV.User.current()
  },

  logOut() {
    return AV.User.logOut()
  },

  login(name, pwd) {
    return AV.User.logIn(name, pwd)
  }
}
