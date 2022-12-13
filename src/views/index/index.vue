<template>
  <div class="index-container">
    <el-row :class="'top'">
      <el-col :style="'height:100%'">
        <el-card class="box-card" :body-style="{ padding: 0 }">
          <div class="top-img">
            <img :src="avt" />
          </div>
          <div class="top-text">
            <h3>早安，管理员，祝你开心每一天!</h3>
            <p>早安，管理员，祝你开心每一天!</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :class="'bottom'">
      <el-col :class="'bc'">
        <div class="left">
          <el-card class="box-card" :body-style="{ padding: 0 }">
            <div slot="header" class="clearfix">
              <span>工作日历</span>
            </div>
            <div>
              <el-calendar v-model="value">
                <template slot="dateCell" slot-scope="{ date, data }">
                  <span>
                    {{ data.day.split("-").slice(2).join('') }}
                  </span>
                  <span
                    class="xxx"
                    v-if="date.getDay() == 0 || date.getDay() == 6"
                  >
                    休
                  </span>
                  <p :class="data.isSelected ? 'is-selected' : ''">
                    {{ data.isSelected ? "✔️" : "" }}
                  </p>
                </template>
              </el-calendar>
            </div>
          </el-card>
          <el-card class="box-card" :body-style="{ padding: 0 }">
            <div slot="header" class="clearfix">
              <span>公告</span>
            </div>
            <div class="gg">
              <div v-for="v in fb" :key="v.id" :class="'gg-container'">
                <div class="left"><img :src="apple" /></div>
                <div class="right">
                  <p>
                    <span class="who">{{ v.who }}</span
                    >发布了<span>{{ v.text }}</span>
                  </p>
                  <p>{{ value }}</p>
                </div>
              </div>
            </div>
          </el-card>
        </div>
        <div class="right">
          <el-card class="box-card" :body-style="{ padding: 0 }">
            <div slot="header" class="clearfix">
              <span>流程申请</span>
            </div>
            <div class="req">
              <el-row>
                <el-button plain>加班离职</el-button>
                <el-button plain>请假调休</el-button>
                <el-button plain>审批列表</el-button>
                <el-button plain>我的信息</el-button>
              </el-row>
            </div>
          </el-card>
          <el-card class="box-card" :body-style="{ padding: 0 }">
            <div slot="header" class="clearfix">
              <span>绩效指数</span>
            </div>
            <div class="ldt"></div>
          </el-card>
          <el-card class="box-card" :body-style="{ padding: 0 }">
            <div slot="header" class="clearfix">
              <span>帮助链接</span>
            </div>
            <div class="help-link">
              <div>
                <p>入门指南</p>
              </div>
              <div>
                <p>在线帮助手册</p>
              </div>
              <div>
                <p>联系技术支持</p>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import avt from "@/assets/common/head.jpg";
import apple from "@/assets/common/img.jpeg";
import * as echarts from "echarts";
export default {
  data() {
    return {
      avt,
      apple,
      value: new Date(),
      fb: {
        fb1: { id: 1, who: "人1", text: "第一期....." },
        fb2: { id: 2, who: "人2", text: "第二期....." },
        fb3: { id: 3, who: "人3", text: "第三期....." },
      },
    };
  },
  mounted() {
    var myChart = echarts.init(document.querySelector(".ldt"));
    myChart.setOption({
      title: {
    text: '基础雷达图'
  },
  legend: {
    data: ['吕宝', '小菜']
  },
  radar: {
    // shape: 'circle',
    indicator: [
      { name: '考勤', max: 6500 },
      { name: '积极性', max: 16000 },
      { name: '管理', max: 30000 },
      { name: '正确率', max: 38000 },
      { name: '态度', max: 52000 },
      { name: '贡献', max: 25000 }
    ]
  },
  series: [
    {
      name: '吕宝 vs 小菜',
      type: 'radar',
      data: [
        {
          value: [4200, 3000, 20000, 35000, 50000, 18000],
          name: '吕宝'
        },
        {
          value: [5000, 14000, 28000, 26000, 42000, 21000],
          name: '小菜'
        }
      ]
    }
  ]
    });
  },
};
</script>

<style lang="scss" scoped>
.index-container {
  .top {
    margin: 5vh;
    width: 90%;
    height: 15vh;
    .box-card {
      width: 100%;
      height: 100%;
      .top-img {
        width: 10vh;
        height: 10vh;
        margin: 2.5vh;
        float: left;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .top-text {
        float: left;
        margin: 2.5vh;
        h3 {
          font-size: 3vh;
          line-height: 7vh;
        }
        p {
          font-size: 2vh;
          color: gainsboro;
        }
      }
    }
  }
  .bottom {
    margin-left: 5vh;
    width: 90%;
    position: relative;
    .bc {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      .left {
        width: 55%;
        .box-card {
          margin-top: 5vh;
          margin-bottom: 5vh;
          .xxx {
            display: inline-block;
            width: 24px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            font-size: 16px;
            background-color: #e65d6e;
            border-radius: 12px;
          }
        }
        .gg {
          width: 100%;
          .gg-container {
            display: flex;
            justify-content: start;
            align-items: center;
            border-bottom: 1px solid gainsboro;
            .left {
              width: 10vh;
              height: 10vh;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .right {
              flex: 1;
              height: 10vh;
              p {
                .who {
                  color: blue;
                  margin-left: 0;
                  margin-right: 1vw;
                }
                span {
                  margin-left: 1vw;
                }
                &:nth-child(1) {
                  line-height: 7vh;
                }
              }
            }
          }
        }
      }
    }
    .right {
      width: 40%;
      .box-card {
        margin-top: 5vh;
        margin-bottom: 5vh;
        .clearfix {
          span {
            border-bottom: 0.5vh solid skyblue;
          }
        }
        .req {
          height: 10vh;
          display: flex;
          justify-content: start;
          align-items: center;
          padding-left: 1vw;
        }
        .ldt {
          width: 100%;
          height: 50vh;
        }
        .help-link {
          display: flex;
          justify-content: center;
          align-items: center;
          div {
            width: 110px;
            height: 10vh;
            cursor: pointer;
            margin: 2vh;
            background: url("~@/assets/common/icon.png") no-repeat;

            display: flex;
            justify-content: center;
            align-items: flex-end;
            &:nth-child(1) {
              background-size: 500px;
              background-position: 24px 0;
            }
            &:nth-child(2) {
              background-size: 500px;
              background-position: -180px 2px;
            }
            &:nth-child(3) {
              background-size: 500px;
              background-position: -400px 4px;
            }
          }
        }
        &:nth-child(2) {
          .clearfix {
            span {
              border-bottom: none;
            }
          }
        }
      }
    }
  }
}
</style>