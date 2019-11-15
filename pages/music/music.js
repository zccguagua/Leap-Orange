// pages/music/music.js
var util = require('./util.js'); //引用外部的js文件
const my_audio = wx.createInnerAudioContext();
var second = 0; //时间参考
var currentMusicId = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay: false,
    poster: '../image/another/music_bg_11.png',
    name: '日光倾城',
    author: '卡奇社',
    src: 'http://image.zcc.ac.cn/my_music_%E6%97%A5%E5%85%89%E5%80%BE%E5%9F%8E.mp3',
    currentTime: '00:00', //当前播放时间（00：03）
    duration: '00:00', //音乐时长（05：25）
    slider_max: 100, //音乐进度条时长（秒）
    slider_value: 0, //音乐进度条进度（秒）
    voice_value: 10, //音量控制（0-10）
    music_list: util.music_list,
    isSilence: false, //是否静音
    singleCycle: false, //是否单曲循环
    spread: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    my_audio.onPlay(() => {
      console.log('开始播放');
      this.setData({
        "isPlay": true
      });
      var dura = this.secondToTime(my_audio.duration);
      setTimeout(function() {
        that.setData({
          "duration": dura,
          "slider_max": parseInt(my_audio.duration)
        });
      }, 1000);

    });
    my_audio.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    });

    my_audio.onPause(() => {
      console.log('暂停播放');
      this.setData({
        "isPlay": false
      });
    });
    my_audio.onStop((res) => {
      console.log('音频停止');
      this.setData({
        "isPlay": false,
        "slider_max": 100
      });
    });
    my_audio.onEnded((res) => {
      console.log('自然播放至结束位置');
      var dura = this.secondToTime(my_audio.duration);
      console.log("时长：" + dura);
      this.setData({
        "currentTime": dura,
        "slider_max": 100
      });
      this.switchMusic();
    });
    my_audio.onCanplay((res) => {
      console.log("监听音频进入可以播放状态的事件");

    });
    my_audio.onTimeUpdate((res) => {
      var time = my_audio.currentTime;
      //刷新音频时长
      if (this.data.slider_max < 150) {
        var dura = this.secondToTime(my_audio.duration);
        // console.log("时长：" + dura);
        this.setData({
          "duration": dura,
          "slider_max": parseInt(my_audio.duration)
        });
      }

      if (time - second >= 1) {
        // console.log(second);
        second = parseInt(time);
        // console.log("当前时长：" + second);
        var cuTime = this.secondToTime(second);
        this.setData({
          "currentTime": cuTime,
          "slider_value": second
        });
      }
    });

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    my_audio.autoplay = false;
    my_audio.src = this.data.src;
    // my_audio.loop = true;//循环播放
    my_audio.play();
    my_audio.pause();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**切换歌曲 */
  select_music: function(e) {
    second = 0;
    // my_audio.stop();
    // my_audio.offTimeUpdate();
    var name = e.currentTarget.dataset['name'];
    var author = e.currentTarget.dataset['author'];
    var src = e.currentTarget.dataset['src'];
    var cover = e.currentTarget.dataset['cover'];
    var index = e.currentTarget.dataset['index'];
    currentMusicId = index;
    console.log(name);
    this.setData({
      "poster": cover,
      "name": name,
      "author": author,
      "src": src,
      "slider_max": 100
    });
    my_audio.src = this.data.src;
    my_audio.play();

  },
  playMusic: function() {
    console.log("playMusic");
    my_audio.play();
  },
  pauseMusic: function() {
    console.log("pauseMusic");
    my_audio.pause();
  },
  /**秒==> '00:00' */
  secondToTime: function(result) {
    var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
    var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
    return result = m + ":" + s;
  },
  /**进度条拖动 */
  slider_change: function(result) {
    var step = result.detail.value;
    second = step;
    // var dura = this.secondToTime(my_audio.duration);
    // console.log("时长：" + dura);
    // this.setData({
    //   "slider_max": parseInt(my_audio.duration),
    //   "duration": dura
    // });
    my_audio.pause();
    my_audio.seek(step);
    setTimeout(function() {
      my_audio.play();
    }, 1000);
  },
  /**调整音量 */
  voice_change: function(result) {
    var step = result.detail.value;
    // console.log("拖动：" + step);
    var curVoice = parseFloat(step / 10);
    // console.log(curVoice);
    my_audio.volume = curVoice;
    if (step > 0) {
      this.setData({
        "isSilence": false,
      })
    } else if (step == 0) {
      this.setData({
        "isSilence": true,
      })
    }
  },
  /**设置静音 */
  setVoiceSilence: function() {
    my_audio.volume = 0;
    this.setData({
      "isSilence": true,
      "voice_value": 0
    })
  },
  setVoiceMax: function() {
    my_audio.volume = 1;
    this.setData({
      "isSilence": false,
      "voice_value": 10
    })
  },
  /**自动播放下一首 */
  switchMusic: function() {
    var musicSize = util.music_list.length;
    console.log("数量:" + musicSize);
    second = 0;
    if (this.data.singleCycle) {
      var itemMusic = util.music_list[currentMusicId];
      console.log(itemMusic.name);
      this.setData({
        "poster": itemMusic.cover,
        "name": itemMusic.name,
        "author": itemMusic.author,
        "src": itemMusic.src,
        "slider_value": 0
      });
      my_audio.src = this.data.src;
      my_audio.play();

    } else {
      if (currentMusicId >= (musicSize - 1)) {
        //列表最后一首,播放第一首
        var itemMusic = util.music_list[0];
        console.log(itemMusic.name);
        currentMusicId = 0;
        this.setData({
          "poster": itemMusic.cover,
          "name": itemMusic.name,
          "author": itemMusic.author,
          "src": itemMusic.src,
          "slider_value": 0
        });
        my_audio.src = this.data.src;
        my_audio.play();
      } else {
        //播放下一首
        var itemMusic = util.music_list[currentMusicId + 1];
        console.log(itemMusic.name);
        currentMusicId++;
        this.setData({
          "poster": itemMusic.cover,
          "name": itemMusic.name,
          "author": itemMusic.author,
          "src": itemMusic.src,
          "slider_value": 0
        });
        my_audio.src = this.data.src;
        my_audio.play();
      }
    }
  },
  playWay: function() {
    if (this.data.singleCycle == true) {
      this.setData({
        "singleCycle": false
      });
    } else {
      this.setData({
        "singleCycle": true
      });
    }
  },
  spreadList: function() {
    if (this.data.spread == true) {
      this.setData({
        "spread": false
      });
    } else {
      this.setData({
        "spread": true
      });
    }
  },
})