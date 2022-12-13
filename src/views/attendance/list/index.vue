<template>
  <div class="list-container">
    <h2 class="top">{{ date.year }}{{ date.month }}报表</h2>
    <el-card class="content">
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户管理" name="first">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            :cell-style="{ textAlign: 'center' }"
          >
            <el-table-column prop="name" label="姓名" width="80">
            </el-table-column>
            <el-table-column prop="workNumber" label="工号" width="70">
            </el-table-column>
            <el-table-column prop="mobile" label="手机号" width="120">
            </el-table-column>
            <el-table-column prop="department" label="部门" width="70">
            </el-table-column>
            <el-table-column prop="leaveDays" label="事假" width="70">
            </el-table-column>
            <el-table-column prop="dayOffLeaveDays" label="调休" width="70">
            </el-table-column>
            <el-table-column prop="normalDays" label="正常" width="70">
            </el-table-column>
            <el-table-column prop="laterTimes" label="迟到次数" width="70">
            </el-table-column>
            <el-table-column prop="earlyTimes" label="早退次数" width="70">
            </el-table-column>
            <el-table-column prop="hoursPerDays" label="日均时长" width="70">
            </el-table-column>
            <el-table-column prop="absenceDays" label="旷工天数" width="70">
            </el-table-column>
            <el-table-column
              prop="isFullAttendanceint"
              label="是否全勤"
              width="70"
            >
            </el-table-column>
            <el-table-column
              prop="actualAtteOfficialDays"
              label="实际出勤天数"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="workingDays"
              label="应出勤工作日"
              width="120"
            >
            </el-table-column>
            <el-table-column prop="salaryStandards" label="计薪标准" width="70">
            </el-table-column>
            <el-table-column
              prop="salaryOfficialDays"
              label="计薪天数"
              width="70"
            >
            </el-table-column>
          </el-table>
          <div class="bottom">
            <download-excel
              :data="tableData"
              :fields="json_fields"
              :header="title"
              :name="`${date.year}${date.month}月份人事报表.xls`"
            >
              <div style="text-align: right; margin-bottom: 10px">
                <el-button type="primary"
                  >归档{{ date.year }}{{ date.month }}月份报表</el-button
                >
              </div>
            </download-excel>
            <el-button type="primary">新建报表</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { getbb } from "@/api/attendance";
import exc from "vue-json-excel";
export default {
  data() {
    return {
      date: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate(),
      },
      activeName: "first",
      tableData: null,
      title:this.date.year+this.date.month+'月份人事报表',
      json_fields:{
          "姓名":"name",
          "工号":"workNumber",
          "手机号":"mobile",
          "部门":"department",
          "事假":"leaveDays",
          "调休":"dayOffLeaveDays",
          "正常":"normalDays",
          "迟到次数":"laterTimes",
          "早退次数":"earlyTimes",
          "日均时长":"hoursPerDays",
          "矿工天数":"absenceDays",
          "是否全勤":"isFullAttendanceint",
          "实际出勤天数":"actualAtteOfficialDays",
          "应出勤工作日":"workingDays",
          "计薪标准":"salaryStandards",
          "计薪天数":"salaryOfficialDays"
        },
    };
  },
  async mounted() {
    this.tableData = await getbb();
    this.tableData.forEach((v, i) => {
      if (v.isFullAttendanceint == 0) {
        v.isFullAttendanceint = "全勤";
      } else {
        v.isFullAttendanceint = "非全勤";
      }
    });
    console.log(this.tableData);
  },
};
</script>

<style lang="scss" scoped>
.list-container {
  .top {
    text-align: right;
    line-height: 100px;
    margin-right: 10%;
  }
  .content {
    width: 95%;
    margin-left: 2.5%;
  }
  .bottom {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>