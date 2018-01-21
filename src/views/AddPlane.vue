<template>
  <div class="w650 margin-auto px-padding-t100">
    <h1 class="px-padding-b30" v-if="this.isAdd">添加计划</h1>
    <h1 class="px-padding-b30" v-else>编辑计划进度</h1>

    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="计划名称" prop="name">
        <el-input v-model="form.name" :disabled="!isAdd"></el-input>
      </el-form-item>
      <el-form-item label="进度标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="进度日期" prop="date">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="进度" prop="progress" v-if="!isAdd">
        <el-slider type="number" v-model="form.progress"></el-slider>
      </el-form-item>
      <el-form-item label="进度内容">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="是否置顶">
        <el-switch v-model="form.top"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import DB from '../assets/db'
  import utils from '../assets/utils'
  import ElForm from 'element-ui/lib/form'
  import ElFormItem from 'element-ui/lib/form-item'
  import ElDatePicker from 'element-ui/lib/date-picker'
  import ElInput from 'element-ui/lib/input'
  import ElSlider from 'element-ui/lib/slider'
  import ElButton from 'element-ui/lib/button'
  import ElSwitch from 'element-ui/lib/switch'
  import 'element-ui/lib/theme-chalk/form-item.css'
  import 'element-ui/lib/theme-chalk/form.css'
  import 'element-ui/lib/theme-chalk/date-picker.css'
  import 'element-ui/lib/theme-chalk/slider.css'
  import 'element-ui/lib/theme-chalk/button.css'
  import 'element-ui/lib/theme-chalk/switch.css'


  export default {
    name: 'add-plane',

    data() {
      return {
        form: {
          name: '',
          title: '',
          date: new Date(),
          desc: '',
          progress: 0,
          top: false
        },
        rules: {
          name: [
            { required: true, message: '请输入计划名称', trigger: 'blur' },
            { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
          ],
          title: [
            { required: true, message: '进度标题', trigger: 'blur' },
          ],
          date: [
            { required: true, message: '请选择进度日期', trigger: 'blur' },
          ],
          progress: [
            { type: 'number', required: true, message: '请选择进度', trigger: 'blur' },
            { type: 'number', min: this.lastProgress, max: 100, message: '最小值', trigger: 'change' }
          ]
        },
        editPlaneDetail: null
      }
    },

    computed: {
      isAdd() {
        return Boolean(this.$route.query.id) === false
      },

      lastProgress() {
        return !this.isAdd && this.editPlaneDetail ? this.editPlaneDetail.lastProgress : 0
      }
    },

    created() {
      if (!this.isAdd) {
        this.editPlaneDetail = JSON.parse(localStorage.getItem('planeItem'))
        this.form.name = this.editPlaneDetail.name
        this.form.progress = this.editPlaneDetail.lastProgress
        this.form.top = this.editPlaneDetail.top
      }
    },

    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let form = { ...this.form }
            let reqData = {
              name: this.form.name,
              lastProgress: this.form.progress,
              top: this.form.top,
              progress: [form]
            }

            if (this.form.progress <= this.editPlaneDetail.lastProgress) {
              utils.alert.call(this, '进度值必须大于当前进度' + this.editPlaneDetail.lastProgress + '%')
              return
            }

            delete form.name
            delete form.top

            if (!this.isAdd) {
              reqData.progress = [].concat(this.editPlaneDetail.progress, reqData.progress)
              reqData.id = this.$route.query.id
            }

            DB.updatePlane(reqData).then(res=> {
              if (res.id) {
                utils.alert.call(this, this.isAdd ? '添加计划成功' : '编辑成功', 'success')
                history.back()
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    },

    components: {
      ElForm,
      ElFormItem,
      ElDatePicker,
      ElInput,
      ElSlider,
      ElButton,
      ElSwitch
    }
  }
</script>

<style scoped>

</style>
