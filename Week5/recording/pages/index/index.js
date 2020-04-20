//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    picId: 1,//图片初始ID
    isSpeaking: false,//是否开始说话
    voices: [],//音频数组
  },
  onLoad: function () {
    this.readFileList()
  },

  //按钮按下事件
  touchDown: function () {
    console.log("按钮按下-开始录音...")

    var that = this;
    speaking.call(this);
    this.setData({
      isSpeaking: true
    })

    //开始录音
    wx.startRecord({
      success: function (res) {

        //临时路径,下次进入小程序时无法正常使用
        var tempFilePath = res.tempFilePath
        console.log("tempFilePath: " + tempFilePath)

        //持久保存
        wx.saveFile({
          tempFilePath: tempFilePath,
          success: function (res) {
            //持久路径 本地文件存储的大小限制为 100M
            var savedFilePath = res.savedFilePath
            console.log("savedFilePath: " + savedFilePath)
          }
        })
        wx.showToast({
          title: '录音成功',
          icon: 'success',
          duration: 1000
        })

        //重新读取列表
        that.readFileList()
      },
      fail: function (res) {
        //录音失败
        wx.showModal({
          title: '提示',
          content: '录音错误!',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('点击确定')
            }
          }
        })
      }
    })
  },

  //抬起手指
  touchUp: function () {
    console.log("释放录音功能...")
    this.setData({
      isSpeaking: false,
    })
    clearInterval(this.timer)
    wx.stopRecord()
  },

  //点击播放录音
  playAudio: function (e) {
    var filePath = e.currentTarget.dataset.key;

    //点击开始播放
    wx.showToast({
      title: '开始播放',
      icon: 'success',
      duration: 1000
    })

    //播放录音文件
    wx.playVoice({
      filePath: filePath,
      success: function () {
        wx.showToast({
          title: '播放结束',
          icon: 'success',
          duration: 1000
        })
      }
    })
  },

  //获取音频列表
  readFileList: function (e) {

    var that = this;
    //获取录音音频列表
    wx.getSavedFileList({
      success: function (res) {
        var voices = [];
        for (var i = 0; i < res.fileList.length; i++) {

          //格式化时间
          var createTime = new Date(res.fileList[i].createTime)

          //将音频大小B转为KB
          var size = (res.fileList[i].size / 1024).toFixed(2);
          var voice = { filePath: res.fileList[i].filePath, createTime: createTime, size: size };
          console.log("文件路径: " + res.fileList[i].filePath)
          console.log("文件时间: " + createTime)
          console.log("文件大小: " + size)
          voices = voices.concat(voice);
        }
        that.setData({
          voices: voices
        })
      }
    })
  }
})

//麦克风帧动画
function speaking() {
  var that = this;
  //话筒帧动画
  var i = 1;
  this.timer = setInterval(function () {
    i++;
    i = i % 5;
    //console.log("==============:" + i);
    that.setData({
      picId: i
    })
  }, 200);
}