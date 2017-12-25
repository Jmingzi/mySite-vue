export default {
  Folder: AV.Object.extend('Folder'),
  Artical: AV.Object.extend('Artical'),

  updateFolder(data) {
    let folder
    if (data.id) {
      folder = AV.Object.createWithoutData('Folder', data.id)
      // console.log(data.id)
    } else {
      folder = new this.Folder()
    }

    folder.set('name', data.name)
    return folder.save()
  },

  updateArtical(data) {
    let artical = new this.Artical()
    Object.keys(data).forEach(key => {
      artical.set(key, data[key])
    })

    return artical.save()
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
  }
}
