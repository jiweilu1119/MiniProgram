//index.js
//获取应用实例
var income = (wx.getStorageSync('income') || []);
var expense = {
  number: 0,
  gender: 'male'
};
var util = require("../../utils/util.js");
const app = getApp()

Page({
  data: {
    userInfo: {},
    buttonLoading: false,
    accountData: [],
    accountTotal: 0,
    income:'',
    display: "none",
    BillDisplay: "show",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    this.setData({

      income: wx.getStorageSync('income')

    })
    
    console.log('onLoad')
    var that = this;

// 获取记录
    var tempAccountData = wx.getStorageSync("accountData") || [];
    this.caculateTotal(tempAccountData);
    this.setData({
      accountData: tempAccountData,
    });

//获取用户信息
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
  getUserInfo: function(e) {
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
      accountTotal: tempTotal
    });
    expense.number = tempTotal;
    wx.setStorageSync('expense', expense);

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
      if (inTime.toString().length <= 0 || inDetail.toString().length <= 0 || inAmount.toString().length <= 0) {
        console.log("empty!");
        that.setData({
          buttonLoading: false
        });
        return false;
      }

      //新增记录
      var tempAccountData = wx.getStorageSync("accountData") || [];
      tempAccountData.unshift({ time: inTime, detail: inDetail, amount: inAmount });
      wx.setStorageSync("accountData", tempAccountData);
      that.caculateTotal(tempAccountData);
      that.setData({
        accountData: tempAccountData,
        
        buttonLoading: false
      });

    }, 1000);
  },
  //删除行
  deleteRow: function (e) {
    var that = this;
    var index = e.target.dataset.indexKey;
    var tempAccountData = wx.getStorageSync("accountData") || [];
    tempAccountData.splice(index, 1);
    wx.setStorageSync("accountData", tempAccountData);
    that.caculateTotal(tempAccountData);
    that.setData({
      accountData: tempAccountData,
    });
  }

})

