// pages/video/video.js
var util = require('./data.js'); //引用外部的js文件



Page({

  /**
   * 页面的初始数据
   */
  data: {
    poster: '../image/another/music_bg_11.png',
    name: '日光倾城',
    info: '卡奇社',
    src: 'https://zccguagua.oss-cn-hangzhou.aliyuncs.com/videos/funny/doujianwu3.mp4',
    currentTime: '00:00', //当前播放时间（00：03）
    duration: '00:00', //音乐时长（05：25）
    slider_max: 100, //音乐进度条时长（秒）
    slider_value: 0, //音乐进度条进度（秒）
    voice_value: 10, //音量控制（0-10）
    video_list: util.video_list,
    isSilence: false, //是否静音
    singleCycle: false, //是否单曲循环
    spread: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoContext = wx.createVideoContext('myVideo')
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

  },
  /**切换视频 */
  select_video: function (e) {
    this.videoContext.stop();
    var name = e.currentTarget.dataset['name'];
    var info = e.currentTarget.dataset['info'];
    var src = e.currentTarget.dataset['src'];
    var index = e.currentTarget.dataset['index'];
    // currentMusicId = index;
    console.log(name);
    this.setData({
      "name": name,
      "info": info,
      "src": src,
    });
    this.videoContext.src = this.data.src;
    this.videoContext.play();

  }
})