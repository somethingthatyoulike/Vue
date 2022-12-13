<template>
  <div class="attendance-container">
    <el-card
      class="top"
      :body-style="{
        padding: '0',
        width: '100%',
        height: '10vh',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }"
    >
      <div class="t-l">
        <i class="el-icon-info" :style="{ color: 'blue' }"></i
        >有0条考勤审批尚未处理
      </div>
      <div class="t-r">
        <el-button type="danger" size="small">导入</el-button>
        <el-button type="warning" size="small">提醒</el-button>
        <el-button type="primary" size="small">设置</el-button>
        <el-button size="small">历史归档</el-button>
        <el-button type="primary" size="small"
          ><router-link to="/attendance/list"><span>{{ date.year }}{{ date.month }}</span
          >报表</router-link></el-button
        >
      </div>
    </el-card>
    <el-card class="center">
      <div>
        部门：<el-checkbox-group v-model="checkList1" @change="nlist">
          <el-checkbox v-for="v in bmlist" :key="v.id" :label="v.id"
            >{{ v.name }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div>
        考勤状态：<el-checkbox-group v-model="checkList2" @change="nlist">
          <el-checkbox v-for="v in kqlist" :key="v.state" :label="v.state"
            >{{ v.name }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </el-card>
    <el-card class="bottom">
      <el-table
        style="width: 100%"
        :border="true"
        :data="tablealldata"
        class="bottom-table"
      >
        <el-table-column prop="nid" label="序号" align="center">
        </el-table-column>
        <el-table-column prop="username" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="workNumber" label="工号" align="center">
        </el-table-column>
        <el-table-column prop="mobile" label="部门" align="center">
        </el-table-column>
        <el-table-column prop="mobile" label="手机号" align="center">
        </el-table-column>
        <el-table-column
          align="center"
          min-width="50"
          v-for="(v, i) in tabledays"
          :key="v"
          :label="tabledays[i]"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              class="cz"
              @click="setdata(scope.row, v, i + 1)"
            >
              <span v-if="scope.row.attendanceRecord[i].adtStatu == 1">正常</span>
              <span v-if="scope.row.attendanceRecord[i].adtStatu == 2">旷工</span>
              <span v-if="scope.row.attendanceRecord[i].adtStatu == 3">迟到</span>
              <span v-if="scope.row.attendanceRecord[i].adtStatu == 4">早退</span>
              <span v-if="scope.row.attendanceRecord[i].adtStatu == 5">外出</span>
              <span v-if="scope.row.attendanceRecord[i].adtStatu == 6">出差</span>
              <span v-if="scope.row.attendanceRecord[i].adtStatu == 7">年假</span>
              <span v-if="scope.row.attendanceRecord[i].adtStatu == 8">事假</span>
              <span v-if="scope.row.attendanceRecord[i].adtStatu == 9">病假</span>
              <span v-if="scope.row.attendanceRecord[i].adtStatu == 10">婚假</span>
              <span v-if="scope.row.attendanceRecord[i].adtStatu == 11">丧假</span>
              <span v-if="scope.row.attendanceRecord[i].adtStatu == 12">产假</span>
              <span v-if="scope.row.attendanceRecord[i].adtStatu == 13">奖励产假</span>
              <span v-if="scope.row.attendanceRecord[i].adtStatu == 14">陪产假</span>
              <span v-if="scope.row.attendanceRecord[i].adtStatu == 15">探亲假</span>
              <span v-if="scope.row.attendanceRecord[i].adtStatu == 16">工伤假</span>
              <span v-if="scope.row.attendanceRecord[i].adtStatu == 17">调休</span>
              <span v-if="scope.row.attendanceRecord[i].adtStatu == 18">产检假</span>
              <span v-if="scope.row.attendanceRecord[i].adtStatu == 19">流产假</span>
              <span v-if="scope.row.attendanceRecord[i].adtStatu == 20">长期病假</span>
              <span v-if="scope.row.attendanceRecord[i].adtStatu == 21">测试假</span>
              <span v-if="scope.row.attendanceRecord[i].adtStatu == 22">补签</span>
            </el-button>
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
import { getBm } from "@/api/table";
import { getkq } from "@/api/attendance";
export default {
  data() {
    return {
      date: {
        year: null,
        month: null,
        day: null,
      },
      tabledays: [],
      tablealldata: null,
      checkList1: [], //筛选列表1
      checkList2: [], //筛选列表1
      bmlist: [], //部门列表
      kqlist: [
        //考勤列表
        { state: 1, name: "正常" },
        { state: 2, name: "旷工" },
        { state: 3, name: "迟到" },
        { state: 4, name: "早退" },
        { state: 5, name: "外出" },
        { state: 6, name: "出差" },
        { state: 7, name: "年假" },
        { state: 8, name: "事假" },
        { state: 9, name: "病假" },
        { state: 10, name: "婚假" },
        { state: 11, name: "丧假" },
        { state: 12, name: "产假" },
        { state: 13, name: "奖励产假" },
        { state: 14, name: "陪产假" },
        { state: 15, name: "探亲假" },
        { state: 16, name: "工伤假" },
        { state: 17, name: "调休" },
        { state: 18, name: "产检假" },
        { state: 19, name: "流产假" },
        { state: 20, name: "长期病假" },
        { state: 21, name: "测试假" },
        { state: 22, name: "补签" },
      ],
      page: 1,
      total: 0,
    };
  },
  methods: {
    async nlist() {
      // await getinfo({
      //   page:this.page,
      //   pageSize:10,
      //   departmentChecks:this.checkList1,
      // });
    },
    changePage(newPage) {
      this.page = newPage;
      this.gettablealldata();
    },
    setdata(data, day, i) {
      data.attendanceRecord[i].adtStatu;
    },
  },
  async mounted() {
    this.bmlist = (await getBm()).depts;
    this.gettablealldata = async function () {
      let kq = await getkq({
        page: this.page,
        pagesize: 5,
      });
      this.tablealldata = kq.data.rows;
      this.total = kq.data.total;
      this.tablealldata.forEach((v, i) => {
        v.nid = i + 1;
      });
      this.tablealldata[0].attendanceRecord.forEach((v, i) => {
        this.tabledays[i] = +v.day.slice(4, 6) + "/" + +v.day.slice(6);
      });
      console.log(this.tablealldata);
    };
    this.gettablealldata();
    let date = new Date();
    this.date.year = date.getFullYear();
    this.date.month = date.getMonth() + 1;
    this.date.day = date.getDate();
  },
};
</script>

<style lang="scss" scoped>
.attendance-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  .top {
    margin-top: 2vh;
    margin-bottom: 2vh;
    width: 95%;
    height: 10vh;
    position: relative;
    .t-l {
      width: 25%;
      margin-left: 5vw;
      height: 5vh;
      text-align: center;
      line-height: 5vh;
      border: 1px solid skyblue;
      background-color: rgb(230, 247, 255);
    }
    .t-r {
      width: 45%;
      height: 5vh;
    }
  }
  .center {
    margin-top: 2vh;
    margin-bottom: 2vh;
    width: 95%;
    height: 30vh;
    position: relative;
  }
  .bottom {
    margin-top: 2vh;
    margin-bottom: 2vh;
    width: 95%;
    position: relative;
  }
}
</style>