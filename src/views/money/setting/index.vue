<template>
  <div class="setting-container">
    <el-tabs v-model="activeName">
      <!-- 计薪设置 -->
      <el-tab-pane label="计薪设置" name="first">
        <el-form ref="form" :model="form" label-width="150px">
          <el-form-item label="对应社保自然月" style="margin-top: 50px">
            <el-select
              v-model="form.region"
              style="width: 300px; margin-right: 10px"
            >
              <el-option label="当月" :value="1"></el-option>
              <el-option label="次月" :value="2"></el-option>
            </el-select>
            <el-tooltip
              class="item"
              effect="dark"
              content="对应社保自然月"
              placement="top"
            >
              <i class="el-icon-bell"></i>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="社保数据来源" style="margin-top: 50px">
            <el-input
              v-model="form.sbForm"
              style="width: 300px; margin-right: 10px"
              :disabled="true"
            ></el-input>
            <el-tooltip
              class="item"
              effect="dark"
              content="社保数据来源"
              placement="top"
            >
              <i class="el-icon-bell"></i>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="考勤数据来源" style="margin-top: 50px">
            <el-input
              v-model="form.kqForm"
              style="width: 300px; margin-right: 10px"
              :disabled="true"
            ></el-input>
            <el-tooltip
              class="item"
              effect="dark"
              content="考勤数据来源"
              placement="top"
            >
              <i class="el-icon-bell"></i>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="" style="margin-top: 50px">
            <el-button type="primary" @click="submit">提交</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <!-- 津贴设置 -->
      <el-tab-pane label="津贴设置" name="second">
        <el-form ref="form" :model="form1" label-width="150px">
          <el-form-item label="通用方案" style="margin-top: 50px">
            <el-input
              v-model="subsidyName"
              style="width: 500px; margin-right: 10px"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              v-model="subsidyRemark"
              style="width: 500px; margin-right: 10px"
            ></el-input>
          </el-form-item>
          <el-form-item label="津贴名称">
            <!-- 第一行 -->
            <el-input
              v-model="name1"
              style="width: 200px; margin-right: 10px"
            ></el-input>
            <el-select
              v-model="form1.transportationSubsidyScheme"
              style="width: 200px; margin-right: 10px"
            >
              <el-option label="每出勤日" :value="1"></el-option>
              <el-option label="每月固定" :value="3"></el-option>
            </el-select>
            <el-tooltip
              class="item"
              effect="dark"
              content="每出勤日:金额“实际出勤天数 每计薪日:金额计薪天数 每月固定: 固定金额 每月(按出勤日]) 金额实际出勤天数/应出工作日: 每月(计薪日) :金额计薪天数计薪标准 (如21.75)"
              placement="top"
            >
              <i class="el-icon-bell"></i>
            </el-tooltip>
            <el-input
              v-model="form1.transportationSubsidyAmount"
              style="width: 200px; margin-right: 10px"
            ></el-input>
            <br />
            <!-- 第二行 -->
            <el-input
              v-model="name2"
              style="width: 200px; margin-right: 10px; margin-top: 22px"
            ></el-input>
            <el-select
              v-model="form1.communicationSubsidyScheme"
              style="width: 200px; margin-right: 10px"
            >
              <el-option label="每出勤日" :value="1"></el-option>
              <el-option label="每月固定" :value="3"></el-option>
            </el-select>
            <el-tooltip
              class="item"
              effect="dark"
              content="每出勤日:金额“实际出勤天数 每计薪日:金额计薪天数 每月固定: 固定金额 每月(按出勤日]) 金额实际出勤天数/应出工作日: 每月(计薪日) :金额计薪天数计薪标准 (如21.75)"
              placement="top"
            >
              <i class="el-icon-bell"></i>
            </el-tooltip>
            <el-input
              v-model="form1.communicationSubsidyAmount"
              style="width: 200px; margin-right: 10px"
            ></el-input>
            <br />
            <!-- 第三行 -->
            <el-input
              v-model="name3"
              style="width: 200px; margin-right: 10px; margin-top: 22px"
              :disabled="true"
            ></el-input>
            <el-select
              v-model="form1.lunchAllowanceScheme"
              style="width: 200px; margin-right: 10px"
            >
              <el-option label="每出勤日" :value="1"></el-option>
              <el-option label="每月固定" :value="3"></el-option>
            </el-select>
            <el-tooltip
              class="item"
              effect="dark"
              content="每出勤日:金额“实际出勤天数 每计薪日:金额计薪天数 每月固定: 固定金额 每月(按出勤日]) 金额实际出勤天数/应出工作日: 每月(计薪日) :金额计薪天数计薪标准 (如21.75)"
              placement="top"
            >
              <i class="el-icon-bell"></i>
            </el-tooltip>
            <el-input
              v-model="form1.lunchAllowanceAmount"
              style="width: 200px; margin-right: 10px"
            ></el-input>
            <br />
            <!-- 第四行 -->
            <el-input
              v-model="name4"
              style="width: 200px; margin-right: 10px; margin-top: 22px"
              :disabled="true"
            ></el-input>
            <el-select
              v-model="form1.housingSubsidyScheme"
              style="width: 200px; margin-right: 10px"
            >
              <el-option label="每出勤日" :value="1"></el-option>
              <el-option label="每月固定" :value="3"></el-option>
            </el-select>
            <el-tooltip
              class="item"
              effect="dark"
              content="每出勤日:金额“实际出勤天数 每计薪日:金额计薪天数 每月固定: 固定金额 每月(按出勤日]) 金额实际出勤天数/应出工作日: 每月(计薪日) :金额计薪天数计薪标准 (如21.75)"
              placement="top"
            >
              <i class="el-icon-bell"></i>
            </el-tooltip>
            <el-input
              v-model="form1.housingSubsidyAmount"
              style="width: 200px; margin-right: 10px"
            ></el-input>
          </el-form-item>
          <el-form-item label="适用计税方式">
            <el-radio-group v-model="form1.taxCalculationType">
              <el-radio :label="1">税前</el-radio>
              <el-radio :label="2">税后</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="" style="margin-top: 50px">
            <el-button type="primary" @click="submit1">提交</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { saveSet } from "@/api/saveset.js";
export default {
  data() {
    return {
      activeName: "first",
      //计薪设置数据
      form: {
        region: 2, //社保自然月
        sbForm: "社保模块",
        kqForm: "考勤模块",
      },
      name1: "交通补贴",
      name2: "通讯补贴",
      name3: "午餐补贴",
      name4: "住房补贴",
      subsidyName: "通用方案", //通用方案
      subsidyRemark: "福利薪资发放规则", //备注
      //津贴设置数据
      form1: {
        transportationSubsidyScheme: 3, //交通补贴计算类型
        transportationSubsidyAmount: 100, //交通补贴金额
        communicationSubsidyScheme: 3, //通讯补贴计算类型
        communicationSubsidyAmount: 100, //通讯补贴金额
        lunchAllowanceScheme: 3, //午餐补贴计算类型
        lunchAllowanceAmount: 100, //午餐补贴金额
        housingSubsidyScheme: 3, //住房补贴计算类型
        housingSubsidyAmount: 100, //住房补贴金额
        taxCalculationType: 2, //适用计税方式
      },
    };
  },
  methods: {
    //计薪设置提交
    async submit() {
      const res = await saveSet({ socialSecurityType: this.form.region });
      if (res == null) {
        this.$message.success("提交成功");
      } else {
        this.$message.error("提交失败");
      }
    },
    //津贴设置提交
    async submit1() {
      const res = await saveSet(this.form1);
      if (res == null) {
        this.$message.success("提交成功");
      } else {
        this.$message.error("提交失败");
      }
      console.log(res);
    },
    //重置
    reset() {
      this.form.region = 2;
      this.form1.name1 = "交通补贴";
      this.form1.name2 = "通讯补贴";
      this.form1.name3 = "午餐补贴";
      this.form1.name4 = "住房补贴";
      this.form1.subsidyName = "通用方案";
      this.form1.subsidyRemark = "福利薪资发放规则";
      this.form1.transportationSubsidyScheme = 3;
      this.form1.transportationSubsidyAmount = 100;
      this.form1.communicationSubsidyScheme = 3;
      this.form1.communicationSubsidyAmount = 100;
      this.form1.lunchAllowanceScheme = 3;
      this.form1.lunchAllowanceAmount = 100;
      this.form1.housingSubsidyScheme = 3;
      this.form1.housingSubsidyAmount = 100;
    },
  },
};
</script>

<style lang="scss" scoped>
.setting-container {
  padding: 50px;
  .item {
    padding: 4px;
    margin-right: 10px;
  }
}
</style>
