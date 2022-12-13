<template>
  <div class="see-container">
    <div class="info">
      <div class="info-img"><img :src="apple" /></div>
      <div class="info-content">
        <span class="states">{{
          info.inServiceStatus == 1 ? "在职" : "离职"
        }}</span>
        <p>入职时间：{{ info.timeOfEntry }} 最新工资：{{ info.basicMoney }}</p>
        <p>
          当月基本工资/当月岗位工资：{{ info.currentBasicSalary }}/{{
            info.currentPostWage
          }}
        </p>
      </div>
      <div class="info-right">
        <h3>招聘日程</h3>
        <div class="right-content">
          <el-timeline :reverse="reverse">
            <el-timeline-item
              v-for="(activity, i) in activities"
              :key="i"
              :timestamp="activity.timestamp"
              :color="activity.color"
            >
              <p>{{ activity.content }}</p>
              <p class="fq">放弃</p>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </div>
    <div class="jt">
      <h3>津贴</h3>
      <table>
        <th>
          <td>津贴类型</td>
          <td>补贴金额</td>
          <td>津贴类型</td>
          <td>补贴金额</td>
        </th>
        <tr>
          <td>交通补助</td>
          <td>{{jtlist.transportationSubsidyAmount}}</td>
          <td>通讯补助</td>
          <td>{{jtlist.communicationSubsidyAmount}}</td>
        </tr>
        <tr>
          <td>午餐补助</td>
          <td>{{jtlist.lunchAllowanceAmount}}</td>
          <td>住房补助</td>
          <td>{{jtlist.housingSubsidyAmount}}</td>
        </tr>
      </table>
    </div>
    <div class="sbgjj">
      <div>社保公积金<span>企业：</span><span>个人：</span></div>
      <table>
        <th>
          <td>缴费项目</td>
          <td>基数</td>
          <td>企业缴纳</td>
          <td>个人缴纳</td>
        </th>
        <tr>
          <td>社保</td>
          <td>{{sblist.socialSecurityBase}}</td>
          <td>0</td>
          <td>0</td>
        </tr>
        <tr>
          <td>公积金</td>
          <td>{{sblist.providentFundBase}}</td>
          <td>{{sblist.enterpriseProvidentFundPayment}}</td>
          <td>{{sblist.personalProvidentFundPayment}}</td>
        </tr>
        <tr>
          <td>缴费合计</td>
          <td>{{sblist.socialSecurityBase+sblist.providentFundBase}}</td>
          <td>{{sblist.enterpriseProvidentFundPayment}}</td>
          <td>{{sblist.personalProvidentFundPayment}}</td>
        </tr>
      </table>
    </div>
    <div class="cq">
      <el-form :label-position="'left'" label-width="30%" class="cqf">
        <el-form-item label="实际出勤天数（正式）" class="cqfi">
          <el-input :disabled="true" value="0" :style="{width:'100%'}"></el-input>
        </el-form-item>
        <el-form-item label="计薪天数（正式）" class="cqfi" >
          <el-input :disabled="true" value="0" :style="{width:'100%'}"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import apple from "@/assets/common/img.jpeg";
import { getjt, getsb } from "@/api/money"
export default {
  data() {
    return {
      apple,
      info: this.$route.query.info,
      jtlist:{},
      sblist:{},
      reverse: true,
      activities: [
        {
          content: "HR专员",
          timestamp: "2018-12-3 3:30",
          color: "rgb(87,188,91)",
        },
        {
          content: "HR专员",
          timestamp: "2018-12-3 3:30",
          color: "rgb(87,188,91)",
        },
      ],
    };
  },
  async created() {
    let jt=await getjt();
    this.jtlist=jt;
    let sb=await getsb(this.info.id);
    this.sblist=sb.userSocialSecurity;
  },
  mothods:{
    
  },
};
</script>

<style lang="scss" scoped>
.see-container {
  .info {
    width: 100%;
    height: 20vh;
    display: flex;
    justify-content: start;
    align-items: center;
    .info-img {
      width: 10vw;
      height: 7vw;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info-content {
      width: 60vw;
      height: 20vh;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: flex-start;
      .states {
        background-color: rgb(245, 108, 108);
        color: white;
        padding: 5px;
        border-radius: 5px;
      }
    }
    .info-right {
      width: 30%;
      height: 20vh;
      h3 {
        width: 100%;
        height: 5vh;
        line-height: 5vh;
        border-bottom: 1px solid gainsboro;
      }
      .right-content {
        width: 100%;
        height: 15vh;
        display: flex;
        justify-content: center;
        align-items: center;
        .fq {
          position: absolute;
          width: 50px;
          top: 0;
          left: 150px;
          font-weight: 700;
        }
      }
    }
  }
  .jt {
    width: 70%;
    height: 30vh;
    h3 {
      width: 100%;
      height: 5vh;
      text-indent: 3vw;
      line-height: 5vh;
    }
    table {
      background-color: rgb(249, 249, 249);
      width: 100%;
      height: 25vh;
      th {
        width: 100%;
        height: 8vh;
        text-align: center;
        line-height: 8vh;
        td {
          width: 25vw;
          height: 8vh;
        }
      }
      tr {
        width: 100%;
        height: 8vh;
        td {
          display: inline-block;
          text-align: center;
          line-height: 8vh;
          margin: 0;
          padding: 0;
          width: 25%;
          height: 8vh;
        }
      }
    }
  }
  .sbgjj {
    width: 70%;
    height: 30vh;
    div {
      width: 100%;
      height: 5vh;
      text-indent: 3vw;
      line-height: 5vh;
      span {
        margin-left: 5vw;
      }
    }
    table {
      background-color: rgb(249, 249, 249);
      width: 100%;
      height: 25vh;
      th {
        width: 100%;
        height: 6vh;
        text-align: center;
        line-height: 6vh;
        td {
          width: 25vw;
          height: 6vh;
        }
      }
      tr {
        width: 100%;
        height: 6vh;
        td {
          display: inline-block;
          text-align: center;
          line-height: 6vh;
          margin: 0;
          padding: 0;
          width: 25%;
          height: 6vh;
        }
      }
    }
  }
  .cq {
    width: 70%;
    height: 20vh;
    .cqf {
      height: 20vh;
      position: relative;
      .cqfi {
        width: 80%;
        height: 8vh;
        margin-top: 2vh;
        margin-left: 5%;
      }
    }
  }
}
</style>
<style lang="scss">
.el-timeline-item__tail {
  top: 10px;
}
.el-timeline-item__wrapper {
  padding-left: 0;
  top: 10px;
  margin-left: -100px;
}
</style>