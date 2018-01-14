export default {
  alert(message, type = 'error') {
    this.$message({
      message,
      type,
      center: true
    })
  }
}
