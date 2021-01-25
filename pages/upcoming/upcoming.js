// pages/upcoming/upcoming.js
Page({ 

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数据
    movieImgArray: [
      {"id": 1, "src": "/images/upcoming_movie/slideshow/cisha.png"},
      {"id": 2, "src": "/images/upcoming_movie/slideshow/nezha.png"},
      {"id": 3, "src": "/images/upcoming_movie/slideshow/shishen.png"},
      {"id": 4, "src": "/images/upcoming_movie/slideshow/tanan.png"},
      {"id": 5, "src": "/images/upcoming_movie/slideshow/xiong.png"},
      {"id": 6, "src": "/images/upcoming_movie/slideshow/zhihui.png"}
    ],
    // table 数据
    tableImgArray: [
      {"id": 1, "src": "/images/upcoming_movie/table/cisha_list.jpg", "name": "刺杀小说家", "srcStar": "/images/upcoming_movie/table/wufen_list.jpg"},
      {"id": 2, "src": "/images/upcoming_movie/table/dianti_list.jpg", "name": "幸运电梯", "srcStar": "/images/upcoming_movie/table/wufen_list.jpg"},
      {"id": 3, "src": "/images/upcoming_movie/table/fengniao_list.jpg", "name": "蜂鸟计划", "srcStar": "/images/upcoming_movie/table/wufen_list.jpg"},
      {"id": 4, "src": "/images/upcoming_movie/table/nezha_list.jpg", "name": "哪吒重生", "srcStar": "/images/upcoming_movie/table/wufen_list.jpg"},
      {"id": 5, "src": "/images/upcoming_movie/table/shishen_list.jpg", "name": "侍神令", "srcStar": "/images/upcoming_movie/table/wufen_list.jpg"},
      {"id": 6, "src": "/images/upcoming_movie/table/tanan_list.jpg", "name": "唐人街探案3", "srcStar": "/images/upcoming_movie/table/wufen_list.jpg"},
      {"id": 7, "src": "/images/upcoming_movie/table/tiaowu_list.jpg", "name": "与我跳舞", "srcStar": "/images/upcoming_movie/table/wufen_list.jpg"},
      {"id": 8, "src": "/images/upcoming_movie/table/xiong_list.jpg", "name": "熊出没狂野", "srcStar": "/images/upcoming_movie/table/wufen_list.jpg"},
      {"id": 9, "src": "/images/upcoming_movie/table/zhihui_list.jpg", "name": "指挥家", "srcStar": "/images/upcoming_movie/table/wufen_list.jpg"},
      {"id": 10, "src": "/images/upcoming_movie/table/wuhan_list.jpg", "name": "武汉日夜", "srcStar": "/images/upcoming_movie/table/wufen_list.jpg"},
      {"id": 11, "src": "/images/upcoming_movie/table/mofa_list.jpg", "name": "魔法鼠乐园", "srcStar": "/images/upcoming_movie/table/wufen_list.jpg"},
      {"id": 12, "src": "/images/upcoming_movie/table/fuyao_list.jpg", "name": "长安伏妖", "srcStar": "/images/upcoming_movie/table/wufen_list.jpg"},
      {"id": 13, "src": "/images/upcoming_movie/table/xingguang_list.jpg", "name": "点点星光", "srcStar": "/images/upcoming_movie/table/wufen_list.jpg"},
      {"id": 14, "src": "/images/upcoming_movie/table/fengyun_list.jpg", "name": "叱咤风云", "srcStar": "/images/upcoming_movie/table/wufen_list.jpg"}
    ],
    // table movie count
    totalCount: 0,
    // 轮播图各参数
    swiperCurrent: 0,
    indicatorDots: true,
    isAutoplay: true,
    interval: 3000,
    duration: 500,
    // 计算高度(使table内容占据剩余高度,只让scoll-view垂直滚动,整个页面不滚动)
    windowHeight: 0,
    swipHeight: 0,
    lineOneHeight: 0,
    titleHeight: 0,
    scrollViewHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      // 获取table数据count
      totalCount: this.data.tableImgArray.length
    })
    // 获取位置信息
    wx.getLocation({
      altitude: true,
      type: 'wgs84',
      // 成功回调
      success (res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        const altitude = res.altitude
        const verticalAccuracy = res.verticalAccuracy
        const horizontalAccuracy = res.horizontalAccuracy
        console.log('获取当前位置纬度和经度: ', latitude, longitude)
      },
      // 失败回调
      fail (error) {
        console.log('获取当前位置失败: ', error)
      },
      // 完成回调
      complete () {
      }
    })
    const _this = this
    // 获取整个页面的高宽(除去header,footer)
    wx.getSystemInfo({
      success: (result) => {
        console.log(result.windowHeight)
        _this.setData({
          windowHeight: result.windowHeight
        })
      },
    })
    // 创建一个query对象获取各个(id)属性的view的高宽(页面最好用padding不用margin,动态获取页面剩余高度较好处理)
    const query = wx.createSelectorQuery()
      query.select('#swip').boundingClientRect()
      query.select('#line1').boundingClientRect()
      query.select('#titleHead').boundingClientRect()
      query.select('#line2').boundingClientRect()
      query.exec((res) => {
        const scrollViewHeight = this.data.windowHeight - res[0].height -res[1].height - res[2].height - res[3].height - 11
        console.log('剩余给scoll-view的高度: ', scrollViewHeight)
        this.setData({
          scrollViewHeight: scrollViewHeight
        })
      })
  },
  onPullDownRefresh: function() {
  },
  // 轮播图获取当前图片
  changeImage: function(event) {
    this.setData({swiperCurrent: event.detail.current})
  },
  // 当点击轮播图时跳转至详情
  handlerClick: function(event) {
    console.log('movie id: ', event.target.id)
  },
  // 前后翻页(暂时不做,没想好)
  previewPage: function(event) {
    wx.showToast({
      title: '功能暂未开发哦',
      icon: 'none',
      duration: 2000
    })
  },
  // 前后翻页(暂时不做,没想好)
  nextPage: function(event) {
    wx.showToast({
      title: '功能暂未开发哦',
      icon: 'none',
      duration: 2000
    })
  },
  // 点击预约购票时
  handlerBuy(event) {
    let movieName = ''
    this.data.tableImgArray.forEach((item) => {
      if (item.id === parseInt(event.target.id)) {
        console.log(item.id, event.target.id)
        movieName = item.name
      }
    })
    wx.showModal({
      title: '确认要预约<' + movieName + '>?',
      content: '新用户可免费预约一次哦',
      success (res) {
        if (res.confirm) {
          wx.showToast({
            title: '预约已截止！',
            icon: 'loading',
            duration: 2000
          })
        } else if (res.cancel) {
          wx.showToast({
            title: '总有你期待的',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
  },
  // table 点击图片跳转至详情
  handlerMovieDetail: function (event) {
    console.log('movie id（str type）: ', event.target.id)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})