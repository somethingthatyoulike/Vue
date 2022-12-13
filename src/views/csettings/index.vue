<template>
  <div class="csettings-container">
    <el-button type="primary" @click="dialogVisible1 = true" class="neee"
      >新建角色</el-button
    >
    <el-dialog
      title="新建角色"
      :visible.sync="dialogVisible1"
      width="50%"
      :before-close="handleClose"
      @open="resetForm('ruleForm')"
    >
      <el-form
        :model="formInfo"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="formInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="formInfo.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            dialogVisible1 = false;
            submitForm('ruleForm');
          "
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-table
      style="width: 100%"
      :border="true"
      :data="tableDate"
      class="bottom-table"
    >
      <el-table-column prop="nid" label="序号" align="center">
      </el-table-column>
      <el-table-column prop="name" label="角色" align="center">
      </el-table-column>
      <el-table-column prop="description" label="描述" align="center">
      </el-table-column>
      <el-table-column
        min-height="100"
        label="操作"
        align="center"
        min-width="180"
      >
        <template slot-scope="scope">
          <el-button
            type="success"
            size="small"
            @click="
              dialogVisible3 = true;
              getthisp(scope.row.id);
            "
            >分配权限</el-button
          >
          <el-dialog
            title="分配权限"
            :visible.sync="dialogVisible3"
            width="50%"
            :before-close="handleClose"
            @close="clearnodes()"
          >
            <el-tree
              ref="tree"
              :data="tree"
              show-checkbox
              node-key="id"
              :default-expanded-keys="[
                '604f7df5f900be1850edb152',
                '604f7e79f900be1850edb158',
              ]"
              :default-checked-keys="thisidp"
              :props="defaultProps"
              @check="logthisidp"
            >
            </el-tree>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible3 = false">取 消</el-button>
              <el-button
                type="primary"
                @click="
                  dialogVisible3 = false;
                  setidp();
                "
                >确 定</el-button
              >
            </span>
          </el-dialog>
          <el-button
            type="primary"
            size="small"
            @click="
              dialogVisible2 = true;
              getiddata(scope.row.id);
            "
            >编辑</el-button
          >
          <el-dialog
            title="编辑角色"
            :visible.sync="dialogVisible2"
            width="50%"
            :before-close="handleClose"
            @open="resetForm('subForm')"
          >
            <el-form
              :model="formInfo"
              :rules="rules"
              ref="subForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="角色名称" prop="name">
                <el-input v-model="addInfo.name"></el-input>
              </el-form-item>
              <el-form-item label="角色描述" prop="description">
                <el-input v-model="addInfo.description"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible2 = false">取 消</el-button>
              <el-button
                type="primary"
                @click="
                  dialogVisible2 = false;
                  setdata();
                "
                >确 定</el-button
              >
            </span>
          </el-dialog>
          <el-button
            type="danger"
            size="small"
            @click="removedata(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      class="pager"
      :page-size="10"
      :current-page="page"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
import {
  getrole,
  getidrole,
  removerole,
  addrole,
  setrole,
  givep,
} from "@/api/csettings";
export default {
  data() {
    return {
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      page: 1,
      total: 0,
      tableDate: [],
      formInfo: {
        name: "",
        description: "",
      },
      addInfo: {
        name: "",
        description: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个汉字", trigger: "blur" },
        ],
        description: [],
      },
      thisid: "",
      thisidp: [],
      tree: [
        {
          id: "604f7df5f900be1850edb152",
          label: "员工管理",
          children: [
            {
              id: "1-1",
              label: "测试",
            },
          ],
        },
        {
          id: "604f7e07f900be1850edb153",
          label: "公司设置",
        },
        {
          id: "604f7e17f900be1850edb154",
          label: "权限管理",
        },
        {
          id: "604f7e50f900be1850edb155",
          label: "社保",
        },
        {
          id: "604f7e5bf900be1850edb156",
          label: "审批",
        },
        {
          id: "604f7e66f900be1850edb157",
          label: "考勤",
        },
        {
          id: "604f7e79f900be1850edb158",
          label: "工资",
          children: [
            {
              id: "7-1",
              label: "扣工资",
            },
          ],
        },
        {
          id: "604f7eabf900be1850edb159",
          label: "组织架构",
        },
        {
          id: "6050175b140b332e04cced02",
          label: "测试权限",
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    handleClose() {},
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await addrole(this.formInfo.name, this.formInfo.description);
          this.gettabledate();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    changePage(newPage) {
      this.page = newPage;
      this.gettabledate();
    },
    async removedata(id) {
      await removerole(id);
      this.gettabledate();
    },
    async setdata() {
      await setrole(
        this.addInfo.id,
        this.addInfo.description,
        this.addInfo.name,
        []
      );
      this.gettabledate();
    },
    async getiddata(id) {
      let res = await getidrole(id);
      this.addInfo.id = res.id;
      this.addInfo.name = res.name;
      this.addInfo.description = res.description;
    },
    async getthisp(id) {
      this.thisid = id;
      let res = await getidrole(id);
      this.thisidp = res.permIds;
    },
    clearnodes() {
      this.$refs.tree.setCheckedKeys([]);
    },
    logthisidp(data) {
      this.thisidp.push(data.id);
    },
    async setidp() {
      await givep(this.thisid, this.thisidp);
    },
  },
  mounted() {
    this.gettabledate = async function () {
      let res = await getrole(this.page, 10);
      this.total = res.total;
      this.tableDate = res.rows;
      this.tableDate.forEach((v, i) => {
        v.nid = i + 1;
      });
    };
    this.gettabledate();
  },
};
</script>

<style lang="scss" scoped>
.csettings-container {
  .neee {
    margin-left: 3vw;
  }
  .pager {
    width: 95%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>