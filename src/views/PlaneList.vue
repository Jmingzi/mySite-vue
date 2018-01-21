<template>
  <div
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.3)"
    class="plane-list w650 margin-auto bd-gray-lighter">
    <plane-item
      :planeList="planeList">
    </plane-item>
  </div>
</template>

<script>
  import DB from '../assets/db'
  import PlaneItem from "../components/PlaneItem";
  import utils from '../assets/utils'

  export default {
    components: {PlaneItem},
    name: "plane-list",

    data() {
      return {
        loading: false,
        planeList: []
      }
    },

    created() {
      DB.getList('Plane').then(res=> {
        this.loading = false
        if (res) {
          this.planeList = utils.getAttribute(res)
        }
      })
    }
  }
</script>

<style scoped>

</style>
