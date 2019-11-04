// pages/map/map.js
var _animation;
var _animationIndex = 1;
var app = getApp();
var param = {
  data: {
    animation: '',
    latitude: "",
    longitude: "",
    scale: 14,
    circles: [],
    markers: [{
      latitude: "",
      longitude: "",
    }],
    Positions: [{
      id: 1001,
      latitude: 31.9464,
      longitude: 117.3966,
      name: '安中医',
      infomation: ""
    }, {
      id: 1002,
      latitude: 30.122,
      longitude: 118.175,
      name: '黄山',
      infomation: ""
    }, {
      id: 1003,
      latitude: 39.915035,
      longitude: 116.403936,
      name: '天安门',
      infomation: ""
    }, {
      id: 1004,
      latitude: 29.9782,
      longitude: 86.9222,
      name: '珠穆朗玛峰',
      infomation: ""
    }, {
      id: 1005,
      latitude: 29.653,
      longitude: 91.118,
      name: '布达拉宫',
      infomation: ""
    }, {
      id: 1006,
      latitude: 35.358,
      longitude: 138.731,
      name: '富士山',
      infomation: ""
    }, {
      id: 1007,
      latitude: 38.891,
      longitude: -77.019,
      name: '美国白宫',
      infomation: ""
    }, {
      id: 1008,
      latitude: 48.8587,
      longitude: 2.2934,
      name: '埃菲尔铁塔',
      infomation: ""
    }, {
      id: 1009,
      latitude: 0,
      longitude: 0,
      name: '北极',
      infomation: ""
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        console.log("纬度：" + latitude + ",经度:" + longitude);
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
        that.setData({
          'markers[0].longitude': res.longitude,
          'markers[0].latitude': res.latitude
        })
        that.setData({
          circles: [{
            latitude: res.latitude,
            longitude: res.longitude,
            color: '#7cb5eccc',
            fillColor: '#7cb5ec88',
            radius: 400,
            strokeWidth: 0.2
          }]
        })


        var datas = that.data.Positions;
        console.log(datas.length);
        for (var i = 0; i < datas.length; i++) {
          var po = datas[i];
          var tt = that.getDistance(latitude, longitude, po.latitude, po.longitude, po.name);
          // console.log(tt);
          po["infomation"] = tt;
        }
        that.setData({
          Positions: datas
        });

        // console.log(datas);

      }
    }, true, 4000)





  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },


  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },
  getDistance: function(lat1, lng1, lat2, lng2, position) {

    lat1 = lat1 || 0;

    lng1 = lng1 || 0;

    lat2 = lat2 || 0;

    lng2 = lng2 || 0;

    var rad1 = lat1 * Math.PI / 180.0;

    var rad2 = lat2 * Math.PI / 180.0;

    var a = rad1 - rad2;

    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;

    var r = 6378137;

    var ss = (r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))).toFixed(0);
    if ((ss / 1000) < 0.5) {
      console.log(position + "就在您的附近");


      return position + "就在您的附近";

    } else {
      console.log("您距离" + position + ":" + (ss / 1000) + "公里");
      return "您距离" + position + ":" + (ss / 1000) + "公里";

    }

  },
  Refresh: function() {
    _animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'linear', // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
      delay: 0,
      transformOrigin: '50% 50% 0'
    });
    _animation.rotate(360 * _animationIndex).step();
    _animationIndex++;
    this.setData({
      animation: _animation.export()
    });
    this.onLoad();
  },
  Magnify: function() {
    var th_scale = this.data.scale;
    if (th_scale <= 18) {
      th_scale++;
    }
    this.setData({
      scale: th_scale
    });
  },
  Reduce: function() {
    var th_scale = this.data.scale;
    if (th_scale >= 5) {
      th_scale--;
    }
    this.setData({
      scale: th_scale
    });
  }


};
Page(param);