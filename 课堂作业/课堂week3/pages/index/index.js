

Page({

  upper(e) {
    console.log(e)
  },

  lower(e) {
    console.log(e)
  },

  scroll(e) {
    console.log(e)
  },

  scrollToTop() {
    this.setAction({
      scrollTop: 0
    })
  },

  tap() {
    for (let i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1],
          scrollTop: (i + 1) * 200
        })
        break
      }
    }
  },

  tapMove() {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
    
  },

  data: {
    StudentA: { firstName: 'San', lastName: 'Zhang' },
    StudentB: { firstName: 'Si', lastName: 'Li' },
    StudentC: { firstName: 'Mingyang', lastName: 'Liu' },

    toView: 'green',
    x: 0,
    y: 0,
    scale: 2,
    latitude: 40.000342,
    longitude: 116.352193,
    
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500
  },

  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },

  tap() {
    this.setData({
      x: 30,
      y: 30
    })
  },

  tap2() {
    this.setData({
      scale: 3
    })
  },

  onChange(e) {
    console.log(e.detail)
  },

  onScale(e) {
    console.log(e.detail)
  },
  
  
})


const order = ['demo1', 'demo2', 'demo3']

wx.setStorage({ key: 'name', data: 'LiuMingyang' });
//异步存储
wx.setStorage({
  key: 'name',
  data: 'LiuMingyang',
  success: function (res) { },
  fail: function () { },
  complete: function () { }
});
//同步存储
try {
  wx.setStorageSync('sex', 'male')
} catch (e) { }

wx.getStorage({
  key: 'name',
  success: function (res) { console.log("name=", res.data) },
  fail: function () { },
  complete: function () { }
})
//同步取出
try {
  var value = wx.getStorageSync('sex')
  console.log("sex=", value)
} catch (e) {
}

// 代码块，可以放到需要的函数体里
// wx.clearStorage()或 wx.clearStorageSync()，直接调用就成。不过调用这个方法要注意，它会清除掉所有的数据。
// 删除单个key
//异步删除
wx.removeStorage({
  key: 'name',
  success: function (res) {
    //success
  },
  fail: function () {
    //fail
  },
  complete: function () {
    //complete
  }
})
//同步删除
try {
  wx.removeStorageSync('sex')
} catch (e) {
}

