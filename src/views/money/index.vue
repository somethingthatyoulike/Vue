<template>
  <div class="money-container">
    <el-card
      class="top"
      :body-style="{
        height: '100%',
        marginRight: '3vh',
        padding: '0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }"
    >
      <div class="top-left">
        <i class="el-icon-info" :style="{ color: 'blue' }"></i>
        本月0: 入职0 离职0 调薪0 未定薪0
      </div>
      <div>
        <el-button type="danger" @click="tosetting()">设置</el-button>
        <el-button type="primary">202212报表</el-button>
      </div>
    </el-card>
    <el-card class="center">
      <div>
        聘用形式：<el-checkbox-group v-model="checkList1" @change="nlist">
          <el-checkbox  :label="1"
            >正式
          </el-checkbox>
          <el-checkbox  :label="2"
            >非正式
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div>
        员工状态：<el-checkbox-group v-model="checkList2" @change="nlist">
          <el-checkbox  :label="1"
            >在职
          </el-checkbox>
          <el-checkbox  :label="2"
            >离职
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div>
        部门：<el-checkbox-group v-model="checkList3" @change="nlist">
          <el-checkbox v-for="v in bmlist" :key="v.id" :label="v.id"
            >{{ v.name }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </el-card>
    <el-card class="bottom">
      <el-table
        style="width: 100%"
        :border="true"
        :data="tableData"
        class="bottom-table"
      >
        <el-table-column prop="nid" label="序号" align="center">
        </el-table-column>
        <el-table-column prop="username" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="mobile" label="手机号" align="center">
        </el-table-column>
        <el-table-column prop="workNumber" label="工号" align="center">
        </el-table-column>
        <el-table-column
          prop="formOfEmployment"
          label="聘用形式"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="departmentName" label="部门" align="center">
        </el-table-column>
        <el-table-column prop="timeOfEntry" label="入职时间" align="center">
        </el-table-column>
        <el-table-column prop="basicMoney" label="工资基数" align="center">
        </el-table-column>
        <el-table-column label="津贴方案" align="center">
          <span>通用方案</span>
        </el-table-column>
        <el-table-column
          min-height="100"
          label="操作"
          align="center"
          min-width="180"
        >
          <template slot-scope="scope">
            <el-button
              :type="scope.row.basicMoney > 0 ? 'primary' : 'danger'"
              size="small"
              class="cz"
              @click="
                which(scope.row.basicMoney);
                getinfo(scope.row);
                getforminfo(scope.row);
              "
              >{{ scope.row.basicMoney > 0 ? "调薪" : "定薪" }}</el-button
            >
            <el-dialog
              title="调薪"
              :visible.sync="dialogVisible1"
              width="50%"
              :before-close="handleClose"
            >
              <div class="cm-top">
                <div class="cmt-left"><img :src="apple" /></div>
                <div class="cmt-right">
                  <p>{{ info.username }}</p>
                  <p>部门：{{ info.departmentName }}</p>
                  <p>入职时间：{{ info.timeOfEntry }}</p>
                </div>
              </div>
              <div
                class="cm-bottom"
                :style="{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'start',
                  flexWrap: 'wrap',
                }"
              >
                <el-form
                  label-position="right"
                  label-width="20%"
                  :model="formdata"
                  :style="{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'start',
                    flexWrap: 'wrap',
                  }"
                >
                  <el-form-item label="调整基本工资" :style="{ width: '100%' }">
                    <el-input
                      v-model="formdata.currentBasicSalary"
                      :disabled="true"
                      :style="{ width: '45%' }"
                    ></el-input>
                    <span>-></span>
                    <el-input
                      placeholder="请输入调整后基本工资"
                      v-model="formdata.newcurrentBasicSalary"
                      :style="{ width: '45%' }"
                      @input="changeforminfo"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="调整岗位工资" :style="{ width: '100%' }">
                    <el-input
                      v-model="formdata.currentPostWage"
                      :disabled="true"
                      :style="{ width: '45%' }"
                    ></el-input>
                    <span>-></span>
                    <el-input
                      placeholder="请输入调整后岗位工资"
                      v-model="formdata.newcurrentPostWage"
                      :style="{ width: '45%' }"
                      @input="changeforminfo"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="工资合计" :style="{ width: '100%' }">
                    <el-input
                      v-model="formdata.basicMoney"
                      :disabled="true"
                      :style="{ width: '45%' }"
                    ></el-input>
                    <span>-></span>
                    <el-input
                      :disabled="true"
                      v-model="formdata.newbasicMoney"
                      :style="{ width: '45%' }"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="调整幅度" :style="{ width: '100%' }">
                    <el-input
                      v-model="formdata.changemoney"
                      :disabled="true"
                      :style="{ width: '45%' }"
                    ></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible1 = false">取 消</el-button>
                <el-button
                  type="primary"
                  @click="
                    dialogVisible1 = false;
                    subforminfo();
                    resetpage();
                  "
                  >确 定</el-button
                >
              </span>
            </el-dialog>
            <el-dialog
              title="定薪"
              :visible.sync="dialogVisible2"
              width="50%"
              :before-close="handleClose"
            >
              <el-form
                label-position="right"
                label-width="20%"
                :model="adddata"
                :style="{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'start',
                  flexWrap: 'wrap',
                }"
              >
                <el-form-item label="当前基本工资" :style="{ width: '100%' }">
                  <el-input
                    v-model="adddata.currentBasicSalary"
                    placeholder="当前基本工资"
                    @input="changeaddinfo"
                  ></el-input>
                </el-form-item>
                <el-form-item label="当前岗位工资" :style="{ width: '100%' }">
                  <el-input
                    v-model="adddata.currentPostWage"
                    placeholder="当前岗位工资"
                    @input="changeaddinfo"
                  ></el-input>
                </el-form-item>
                <el-form-item label="当前工资合计" :style="{ width: '100%' }">
                  <el-input v-model="adddata.dqall" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="转正基本工资" :style="{ width: '100%' }">
                  <el-input
                    v-model="adddata.correctionOfBasicWages"
                    placeholder="转正基本工资"
                    @input="changeaddinfo"
                  ></el-input>
                </el-form-item>
                <el-form-item label="转正岗位工资" :style="{ width: '100%' }">
                  <el-input
                    v-model="adddata.turnToPostWages"
                    placeholder="转正岗位工资"
                    @input="changeaddinfo"
                  ></el-input>
                </el-form-item>
                <el-form-item label="转正工资合计" :style="{ width: '100%' }">
                  <el-input v-model="adddata.zzall" :disabled="true"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button
                  type="primary"
                  @click="
                    dialogVisible2 = false;
                    subaddinfo();
                  "
                  >确 定</el-button
                >
              </span>
            </el-dialog>
            <router-link :to="`/money/see/${scope.row.id}`">查看</router-link>
            <el-button type="text" size="small" class="cz" @click="tosee(scope.row)">查看</el-button>
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
import { getinfo, setinfo, addinfo } from "@/api/money";
import { getBm } from "@/api/table";
import apple from "@/assets/common/img.jpeg";
export default {
  data() {
    return {
      apple,
      info: "",
      radio1: 3,
      radio2: 3,
      checkList1: [],
      checkList2: [],
      checkList3: [],
      bmlist: [],
      nmoney: [],
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      adddata: {
        currentBasicSalary: null,
        currentPostWage: null,
        dqall: 0,
        correctionOfBasicWages: null,
        turnToPostWages: null,
        zzall: 0,
      },
      formdata: {
        username: "",
        mobile: "",
        workNumber: "",
        formOfEmployment: "",
        departmentName: "",
        timeOfEntry: "",
        basicMoney: 0,
        newcurrentBasicSalary: 0,
        newcurrentPostWage: 0,
        newbasicMoney: 0,
        changemoney: 0,
      },
      tableData: [
        {
          username: "",
          mobile: "",
          workNumber: "",
          formOfEmployment: "",
          departmentName: "",
          timeOfEntry: "",
          basicMoney: "",
        },
      ],
      page: 1,
      total: 0,
    };
  },
  methods: {
    handleClose() {},
    resetpage() {
      this.gettableData();
    },
    tosee(info){
      this.$router.push({
        path:'/money/see',
        query:{
          info,
        },
      })
    },
    tosetting(){
      this.$router.push({
        path:'/money/set',
      })
    },
    async nlist(){
      await getinfo({
        page:this.page,
        pageSize:10,
        approvalsStateChecks:this.checkList1,
        approvalsTypeChecks:this.checkList2,
        departmentChecks:this.checkList3,
      });
    },
    changePage(newPage) {
      this.page = newPage;
      this.gettableData();
    },
    which(m) {
      if (m > 0) {
        this.dialogVisible1 = true;
      } else {
        this.dialogVisible2 = true;
      }
    },
    getinfo(info) {
      this.info = info;
    },
    getforminfo(data) {
      this.formdata = data;
    },
    clearforminfo() {
      this.formdata.newcurrentBasicSalary = null;
      this.formdata.newcurrentPostWage = null;
      this.formdata.newbasicMoney = null;
      this.formdata.changemoney = null;
    },
    changeforminfo() {
      if (this.formdata.newcurrentBasicSalary === undefined) {
        this.formdata.newbasicMoney = 0 + +this.formdata.newcurrentPostWage;
      } else if (this.formdata.newcurrentPostWage === undefined) {
        this.formdata.newbasicMoney = +this.formdata.newcurrentBasicSalary + 0;
      } else {
        this.formdata.newbasicMoney =
          +this.formdata.newcurrentBasicSalary +
          +this.formdata.newcurrentPostWage;
      }
      this.formdata.changemoney =
        this.formdata.newbasicMoney - this.formdata.basicMoney;
    },
    changeaddinfo() {
      if (this.adddata.currentBasicSalary === undefined) {
        this.adddata.dqall = 0 + +this.adddata.currentPostWage;
      } else if (this.adddata.currentPostWage === undefined) {
        this.adddata.dqall = +this.adddata.currentBasicSalary + 0;
      } else {
        this.adddata.dqall =
          +this.adddata.currentBasicSalary + +this.adddata.currentPostWage;
      }
      if (this.adddata.correctionOfBasicWages === undefined) {
        this.adddata.zzall = 0 + +this.adddata.turnToPostWages;
      } else if (this.adddata.turnToPostWages === undefined) {
        this.adddata.zzall = +this.adddata.correctionOfBasicWages + 0;
      } else {
        this.adddata.zzall =
          +this.adddata.correctionOfBasicWages + +this.adddata.turnToPostWages;
      }
    },
    async subforminfo() {
      await setinfo(
        this.formdata.id,
        +this.formdata.newcurrentBasicSalary,
        +this.formdata.newcurrentPostWage
      );
    },
    async subaddinfo() {
      await addinfo(
        this.info.id,
        +this.adddata.currentBasicSalary,
        +this.adddata.currentPostWage,
        +this.adddata.correctionOfBasicWages,
        +this.adddata.turnToPostWages
      );
    },
  },
  async mounted() {
    this.bmlist = (await getBm()).depts;
    this.gettableData = async function () {
      let x = await getinfo({ page: this.page, pageSize: 10 });
      this.total = x.total;
      this.tableData = x.rows;
      this.tableData.forEach((v, i) => {
        v.basicMoney = x.rows[i].currentBasicSalary + x.rows[i].currentPostWage;
        v.nid = i + 1;
        if (v.formOfEmployment == 1) {
          v.formOfEmployment = "正式";
        } else {
          v.formOfEmployment = "非正式";
        }
        if (v.timeOfEntry) {
          v.timeOfEntry = `${v.timeOfEntry.slice(0, 10)}`;
        }
      });
    };
    this.gettableData();
  },
};
</script>

<style lang="scss" scoped>
.money-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .top {
    width: 95%;
    height: 10vh;
    margin-top: 2vh;
    .top-left {
      background-color: rgb(230, 247, 255);
      border: 1px solid skyblue;
      padding: 5px;
      margin-left: 10px;
    }
  }
  .center {
    width: 95%;
    margin-top: 2vh;
  }
  .bottom {
    width: 95%;
    margin-top: 3vh;
    .bottom-table {
      .cz {
        margin: 1px;
      }
      .cm-top {
        width: 100%;
        height: 20vh;
        display: flex;
        justify-content: start;
        align-items: center;
        border-bottom: 1px solid gainsboro;
        .cmt-left {
          width: 15%;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .cmt-right {
          width: 30%;
          display: flex;
          justify-content: start;
          align-items: center;
          flex-wrap: wrap;
          p {
            width: 100%;
          }
        }
      }
      .cm-bottom {
        width: 100%;
        height: 40vh;
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