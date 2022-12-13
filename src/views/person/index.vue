<template>
  <div class="person-container">
    <el-card
      class="top"
      :body-style="{
        height: '100%',
        marginRight: '3vh',
        padding: '0',
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
      }"
    >
      <el-button type="primary">导入</el-button>
      <el-button type="primary" @click="dialogVisible = true;kk()"
        >+新增员工</el-button
      >
      <el-dialog
        title="新增员工"
        :visible.sync="dialogVisible"
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
          <el-form-item label="姓名" prop="username">
            <el-input v-model="formInfo.username"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="formInfo.mobile"></el-input>
          </el-form-item>
          <el-form-item label="入职时间" prop="timeOfEntry">
            <el-date-picker
              type="date"
              placeholder="请选择日期"
              v-model="formInfo.timeOfEntry"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="聘用形式" prop="formOfEmployment">
            <el-select v-model="formInfo.formOfEmployment" placeholder="请选择">
              <el-option label="正式" value="1"></el-option>
              <el-option label="非正式" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工号" prop="workNumber">
            <el-input v-model="formInfo.workNumber"></el-input>
          </el-form-item>
          <el-form-item label="部门" prop="departmentName">
            <el-select v-model="formInfo.departmentName" placeholder="请选择">
              <el-option
                v-for="v in bm"
                :key="v.name"
                :label="v.name"
                :value="v.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="转正时间" prop="date">
            <el-date-picker
              type="date"
              placeholder="请选择日期"
              v-model="formInfo.date"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="
              dialogVisible = false;
              submitForm('ruleForm');
            "
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </el-card>
    <el-card class="bottom">
      <el-table
        style="width: 100%"
        :row-style="{height:'57px'}"
        :default-sort="{ prop: 'id', order: 'descending' }"
        :border="true"
        :data="tableAllDate"
        class="bottom-table"
      >
        <el-table-column prop="nid" label="" align="center"> </el-table-column>
        <el-table-column prop="username" label="姓名" sortable align="center">
        </el-table-column>
        <el-table-column prop="mobile" label="手机号" sortable align="center">
        </el-table-column>
        <el-table-column prop="workNumber" label="工号" sortable align="center">
        </el-table-column>
        <el-table-column
          prop="formOfEmployment"
          label="聘用形式"
          sortable
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="departmentName"
          label="部门"
          sortable
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="timeOfEntry"
          label="入职时间"
          sortable
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="inServiceStatus"
          label="账户状态"
          sortable
          align="center"
        >
        </el-table-column>
        <el-table-column
          min-height="100"
          prop="telphone"
          label="操作"
          align="center"
          min-width="180"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" class="cz" v-show="scope.row.nid!=undefined">查看</el-button>
            <el-button type="text" size="small" class="cz" v-show="scope.row.nid!=undefined">转正</el-button>
            <el-button type="text" size="small" class="cz" v-show="scope.row.nid!=undefined">调岗</el-button>
            <el-button type="text" size="small" class="cz" v-show="scope.row.nid!=undefined">离职</el-button>
            <el-button type="text" size="small" class="cz" v-show="scope.row.nid!=undefined">角色</el-button>
            <el-button
              type="text"
              size="small"
              class="cz"
              @click="removethis(scope.row)"
              v-show="scope.row.nid!=undefined"
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
    </el-card>
  </div>
</template>

<script>
import {
  getTableList,
  removeTableDate,
  addTableDate,
  getBm,
} from "@/api/table";
export default {
  data() {
    return {
      bm: [],
      dialogVisible: false,
      formInfo: {
        username: "",
        mobile: "",
        timeOfEntry: "",
        formOfEmployment: "",
        workNumber: "",
        departmentName: "",
        date: "",
        inServiceStatus: "",
      },
      addInfo: {
        username: "",
        mobile: "",
        timeOfEntry: "",
        formOfEmployment: "",
        workNumber: "",
        departmentName: "",
        date: "",
        inServiceStatus: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个汉字", trigger: "blur" },
        ],
        mobile: [],
        timeOfEntry: [],
        formOfEmployment: [],
        workNumber: [],
        departmentName: [],
        date: [],
      },
      page: 1,
      total: 0,
      infoId: JSON.parse(sessionStorage.getItem("userinfo")).userId,
      tableAllDate: [],
    };
  },
  methods: {
    async kk() {
      let t = await getBm();
      this.bm = t.depts;
    },
    handleClose() {},
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.addInfo = this.formInfo;
          this.addInfo.inServiceStatus = this.addInfo.formOfEmployment;
          await addTableDate(this.infoId, this.addInfo);
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
    async removethis(row) {
      await removeTableDate(row.id);
      this.gettabledate();
    },
  },
  mounted() {
    this.gettabledate = async function () {
      let res = await getTableList(this.page, 10);
      this.tableAllDate = res.rows;
      this.tableAllDate.forEach((v, i) => {
        v.nid = i;
        if (v.formOfEmployment == 1) {
          v.formOfEmployment = "正式";
        } else {
          v.formOfEmployment = "非正式";
        }
        if (v.inServiceStatus == 1) {
          v.inServiceStatus = "正式";
        } else {
          v.inServiceStatus = "非正式";
        }
        if (v.timeOfEntry) {
          v.timeOfEntry = `${v.timeOfEntry.slice(0, 10)}\n${v.timeOfEntry
            .slice(10, 19)
            .replace("T", "")}`;
        }
      });
      for (let i = 0; i < 10; i++) {
        if (this.tableAllDate[i] == undefined) {
          this.tableAllDate[i] = {
            username: "",
            mobile: "",
            timeOfEntry: "",
            formOfEmployment: "",
            workNumber: "",
            departmentName: "",
            date: "",
            inServiceStatus: "",
          };
        }
      }
      this.total = res.total;
    };
    this.gettabledate();
  },
};
</script>

<style lang="scss" scoped>
.person-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .top {
    width: 95%;
    height: 10vh;
    margin-top: 2vh;
  }
  .bottom {
    width: 95%;
    margin-top: 3vh;
    .bottom-table {
      .yc {
        display: none;
        .cz {
          margin: 1px;
        }
      }
    }
    .pager {
      width: 95%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>