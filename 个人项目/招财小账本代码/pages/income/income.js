//index.js
//获取应用实例
var expense = (wx.getStorageSync('expense') || []);
var income = {
  number: 0,
  gender: 'male'
}

var util = require("../../utils/util.js");

const app = getApp()

Page({
  data: {
    
    motto: 'Hello World',
    userInfo: {},
    buttonLoading: false,
    incomeData: [],
    incomeTotal: 0,
    enpense:'',
    display: "none",
    BillDisplay: "show",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.setData({
      expense: wx.getStorageSync('expense')

    })
    console.log('onLoad')
    var that = this;
    
    // 获取记录
    var tempIncomeData = wx.getStorageSync("incomeData") || [];
    this.caculateTotal(tempIncomeData);
    this.setData({
      incomeData: tempIncomeData
    });
    //获取用户信息
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  // 计算总额
  caculateTotal: function (data) {
    var tempTotal = 0;
    for (var x in data) {
      tempTotal += parseFloat(data[x].amount);
    }
    this.setData({
      incomeTotal:tempTotal
    });
    income.number = tempTotal;
    wx.setStorageSync('income', income);
  },


  //表单提交
  formSubmit: function (e) {
    this.setData({
      buttonLoading: true
    });

    var that = this;
    setTimeout(function () {
      var inTime = e.detail.value.inputtime;
      var inDetail = e.detail.value.inputdetail;
      var inAmount = e.detail.value.inputamount;
      if (inTime.toString().length <= 0 ||inDetail.toString().length <= 0 || inAmount.toString().length <= 0) {
        console.log("empty！");
        that.setData({
          buttonLoading: false
        });
        return false;
      }

      //新增记录
      var tempIncomeData = wx.getStorageSync("incomeData") || [];
      tempIncomeData.unshift({ time: inTime, detail: inDetail, amount: inAmount });
      wx.setStorageSync("incomeData", tempIncomeData);
      that.caculateTotal(tempIncomeData);
      that.setData({
        incomeData: tempIncomeData,
        buttonLoading: false
      });

    }, 1000);
  },
  //删除行
  deleteRow: function (e) {
    var that = this;
    var index = e.target.dataset.indexKey;
    var tempIncomeData = wx.getStorageSync("incomeData") || [];
    tempIncomeData.splice(index, 1);
    wx.setStorageSync("incomeData", tempIncomeData);
    wx.setStorageSync("income", tempIncomeData);
    that.caculateTotal(tempIncomeData);
    that.setData({
      incomeData: tempIncomeData,
    });
  }

})

