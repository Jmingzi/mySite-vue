export default {
  alert(message, type = 'error') {
    this.$message({
      message,
      type,
      center: true
    })
  },

  getAttribute(res) {
    if (res instanceof Array) {
      return res.map(item => {
        return {
          ...item.attributes,
          id: item.id
        }
      })
    } else {
      return [
        {
          ...res.attributes,
          id: res.id,
          time: res.createdAt || res.updatedAt
        }
      ]
    }
  },

  fullZero(num) {
    return num > 9 ? num : `0${num}`
  },
}
