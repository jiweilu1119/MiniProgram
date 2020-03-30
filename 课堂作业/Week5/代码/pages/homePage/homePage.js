Page({

  /**
   * 页面的初始数据
   */
  data: {
    tArry: [
      {
        cid: 1,
        category: "hot",
        name: "热点"
      },
      {
        cid: 2,
        category: "entertainment",
        name: "娱乐"
      },
      {
        cid: 3,
        category: "education",
        name: "教育"
      },
      {
        cid: 4,
        category: "economy",
        name: "经济"
      },
      {
        cid: 5,
        category: "tech",
        name: "科技"
      },

    ], //新闻类型数组


    fontcolor: "white",
    loading: true, //是否显示加载
    ishidden: true,
    curpage: 0, //新闻列表坐标
    listpage: 0, //列表当前页码
    detaildata: [
      {
        category: "entertainment",
        content: "古巨基当爸",
        comment_count: "4w",
        publish_time: "2020/03/16",
        has_image: true,
        image_list: [
          { url: "../../images/gu.jpg" },
          { url: "../../images/gu2.jpg" }

        ],
      },
      {
        category: "education",
        content: "上网课时的作业量",
        comment_count: "2w",
        publish_time: "2020/03/16",
        has_image: true,
        image_list: [
          { url: "../../images/ke.jpg" },
          { url: "../../images/ke2.jpg" }
        ],
      },   
      {
        category: "tech",
        content: "华为新旗舰P40系列全家福首曝：7种配色，Premium版配后置五摄[思考]",
        comment_count: 251,
        publish_time: "2020/03/11",
        has_image: true,
        image_list: [
          { url: "../../images/huawei.jpg" }
        ],
      },
      {
        category: "economy",
        content: "LV母公司宣布生产洗手液",
        comment_count: 4000,
        publish_time: "2020/03/16",
        has_image: true,
        image_list: [
          { url: "../../images/lv.jpg" }

        ],
      },
    ], //新闻列表
    category: "hot", //当前分类
    viewHeight: 500 //scroll-view 高度
  },
  onReady: function () {
    //创建动画实例
    this.animation = wx.createAnimation({
      //动画持续时间
      duration: 2000,
      //linear 动画一直较为均匀
      //ease 从匀速到加速再到匀速
      //ease-in 缓慢到匀速
      //ease-in-out 从缓慢到匀速再到缓慢
      timingFunction: "ease",
    })
    //读取屏幕高度
    var res = wx.getSystemInfoSync();
    var width = res.screenHeight - 40 - 50;
    //设置scroll-view高度
    this.setData({
      viewHeight: width
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

    //定义this代理，处理网络返回数据，不能直接使用this
    var that = this;
    //请求网络，获取type



    //初始化页码从0开始
    this.setData({
      listpage: 0
    });
    //默认显示所以新闻
    //this.readList("all")
  },
  //类型单击事件
  typeClick(e) {
    var ctgr = e.currentTarget.dataset.idx;
    var cpg = e.currentTarget.dataset.cur;
    console.log(ctgr);
    var that = this;
    that.setData({

      category: ctgr

    });
    that.setData({
      curpage: cpg
    });
    console.log("category==", this.data.category);
    console.log("curpage==", this.data.curpage);

  },
  //加载更多scroll-view bindscrolltolower事件
  addMoreData(e) {
    //页码加1，继续获取新闻
    var that = this;
    var pageTemp = (this.data.listpage + 1)
    that.setData({
      listpage: pageTemp
    });
    //获取新闻
    //this.readList()
  },
  //获取新闻列表

})