// index.js
// 获取应用实例
// const app = getApp()

Page({
  data: {
     // 轮播图数据
    movieImgArray: [
      {"id": 1, "src": "/images/hot_movie/slideshow/baobao.png"},
      {"id": 2, "src": "/images/hot_movie/slideshow/xinling.png"},
      {"id": 3, "src": "/images/hot_movie/slideshow/xiaohong.png"},
      {"id": 4, "src": "/images/hot_movie/slideshow/caidan.png"},
      {"id": 5, "src": "/images/hot_movie/slideshow/jiuyuan.png"},
      {"id": 6, "src": "/images/hot_movie/slideshow/fengkuang.png"}
    ],
    // table 数据
    tableImgArray: [
      {"id": 1, "src": "/images/hot_movie/table/baobao_list.jpg", "name": "温暖的抱抱", "srcStar": "/images/hot_movie/table/pingfen_list.jpg"},
      {"id": 2, "src": "/images/hot_movie/table/daxiong_list.jpg", "name": "多啦A梦", "srcStar": "/images/hot_movie/table/pingfen_list.jpg"},
      {"id": 3, "src": "/images/hot_movie/table/xiaohong_list.jpg", "name": "一朵小红花", "srcStar": "/images/hot_movie/table/pingfen_list.jpg"},
      {"id": 4, "src": "/images/hot_movie/table/caidan_list.jpg", "name": "拆弹专家", "srcStar": "/images/hot_movie/table/pingfen_list.jpg"},
      {"id": 5, "src": "/images/hot_movie/table/jiuyuan_list.jpg", "name": "紧急救援", "srcStar": "/images/hot_movie/table/pingfen_list.jpg"},
      {"id": 6, "src": "/images/hot_movie/table/fengkuang_list.jpg", "name": "疯狂原始人", "srcStar": "/images/hot_movie/table/pingfen_list.jpg"},
      {"id": 7, "src": "/images/hot_movie/table/huoyan_list.jpg", "name": "海底小纵队", "srcStar": "/images/hot_movie/table/pingfen_list.jpg"},
      {"id": 8, "src": "/images/hot_movie/table/jihun_list.jpg", "name": "缉魂", "srcStar": "/images/hot_movie/table/pingfen_list.jpg"},
      {"id": 9, "src": "/images/hot_movie/table/mingtian_list.jpg", "name": "明天你是否...", "srcStar": "/images/hot_movie/table/pingfen_list.jpg"},
      {"id": 10, "src": "/images/hot_movie/table/shenlong_list.jpg", "name": "许愿神龙", "srcStar": "/images/hot_movie/table/pingfen_list.jpg"},
      {"id": 11, "src": "/images/hot_movie/table/shenqi_list.jpg", "name": "神奇女侠", "srcStar": "/images/hot_movie/table/pingfen_list.jpg"},
      {"id": 12, "src": "/images/hot_movie/table/wangwang_list.jpg", "name": "汪汪队立大功", "srcStar": "/images/hot_movie/table/pingfen_list.jpg"}
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
  onLoad() {
    // 获取table数据count
    this.setData({
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
    wx.getSystemInfo({
      success: (result) => {
        console.log(result.windowHeight)
        _this.setData({
          windowHeight: result.windowHeight
        })
      },
    })
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
  // 点击轮播图跳转至详情页
  handlerClick: function(event) {
    console.log('movie id: ', event.target.id)
  },
  // 前后翻页(暂时不做)
  previewPage: function(event) {
    wx.showToast({
      title: '功能暂未开发哦',
      icon: 'none',
      duration: 2000
    })
  },
  // 前后翻页(暂时不做)
  nextPage: function(event) {
    wx.showToast({
      title: '功能暂未开发哦',
      icon: 'none',
      duration: 2000
    })
  },
  // 点击购买触发
  handlerBuy(event) {
    let movieName = ''
    this.data.tableImgArray.forEach((item) => {
      if (item.id === parseInt(event.target.id)) {
        console.log(item.id, event.target.id)
        movieName = item.name
      }
    })
    wx.showModal({
      title: '确认要购买<' + movieName + '>?',
      content: '新用户可免费购买一次哦',
      success (res) {
        if (res.confirm) {
          wx.showToast({
            title: '票已经售罄！',
            icon: 'loading',
            duration: 2000
          })
        } else if (res.cancel) {
          wx.showToast({
            title: '总有你想看的',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
  },
  // table中点击图片跳转至详情页
  handlerMovieDetail: function(event) {
    console.log('movie id: ', event.target.id)
  }
})
