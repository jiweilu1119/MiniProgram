// pages/user/user.js
var app = getApp()
Page({
  data: {
    ButgedMoney: 0,
    openid: '',
  },
  onLoad: function (options) {
    var that = this
    // 页面初始化 options为页面跳转所带来的参数
    wx.setNavigationBarTitle({
      title: '设置'
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
  


    //查询当前用户是否开启预算
    wx.getStorage({//获取当前用户openid
      key: 'openid',
      success: function (res) {
        var openid = res.data
        that.setData({ openid: openid })
        //查询当前用户好友数据
        wx.request({
          url: app.url + 'set/BudgetStart', //查询当前用户是否开启预算
          data: { openid: openid },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res.data)
            if (res.data.butged_start == 1) {
              //关闭状态
              that.setData({ ButgedMoney: res.data.butged })//赋值预算金额
            }
            else {
              that.setData({ ButgedMoney: '未开启' })//赋值预算金额
            }
          },
          fail: function () {
            wx.showToast({
              title: '数据请求失败',
              icon: 'success',
              duration: 2000
            })
          }
        })
      }
    })
  },
  onPullDownRefresh: function () {
    this.onLoad()
    wx.stopPullDownRefresh()
  },
  onShareAppMessage: function () {//转发功能
    return {
      title: '账本小精灵',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '转发成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '转发失败',
          icon: 'success',
          duration: 2000
        })
      }
    }
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})