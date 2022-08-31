<template>
  <div class="dashboard-container">
    <div class="app-container">
      <h2>
        <el-card class="tree-card">
          <treeTools :tree-node="company" :is-root="true" @addDepts="addDepts" @editDepts="editDepts" />
          <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
            <treeTools slot-scope="{data}" :tree-node="data" @delDepts="getDepartments" @addDepts="addDepts" />
          </el-tree>
          <addDept ref="addDept" :show-dialog="showDialog" :tree-node="node" @addDepts="getDepartments" @changedialog="closeDialog" />
        </el-card>
      </h2>
    </div>
  </div>
</template>

<script>
import treeTools from '@/views/departments/components/tree-tools'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils/index'
import addDept from '@/views/departments/components/add-dept'
export default {
  components: {
    treeTools,
    addDept
  },
  data() {
    return {
      departs: [],
      company: { },
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      showDialog: false,
      node: null
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const result = await getDepartments()
      console.log(result, '康康')
      this.departs = tranListToTreeData(result.depts, '')
      this.company = { name: result.companyName, manager: '负责人', id: '' }
    },
    addDepts(node) {
      this.showDialog = true
      this.node = node
    },
    closeDialog(val) {
      this.showDialog = val
    },
    editDepts(node) {
      this.showDialog = true
      this.node = node
      this.$refs.addDept.getDepartDetail(node.id)
    }
  }
}
</script>
<style scoped>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}
</style>
