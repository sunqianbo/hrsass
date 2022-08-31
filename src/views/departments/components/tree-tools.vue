<template>
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px; width: 100%">
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>负责人</el-col>
        <el-col>
          <el-dropdown @command="handleCommand">
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from '@/api/departments'
export default {

  props: {
    treeNode: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean
    }

  },
  methods: {
    handleCommand(val) {
      if (val === 'add') {
        this.$emit('addDepts', this.treeNode)
      } else if (val === 'edit') {
        this.$emit('editDepts', this.treeNode)
      } else {
        this.$confirm('确定要删除该部门吗?').then(() => {
          return delDepartments(this.treeNode.id) // 后端已经删除,要通知前端更新页面
        }).then(() => {
          this.$emit('delDepts')
          this.$message.success('删除部门成功')
        })
      }
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
