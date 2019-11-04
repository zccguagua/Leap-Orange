// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['../image/mainpage/bg_2.jpg', '../image/mainpage/bg_3.jpg', '../image/mainpage/bg_1.jpg'],

     /** 此处为日历自定义配置字段*/
    calendarConfig: {
      multi: true, /**  是否开启多选,*/
      theme: 'default', /**  日历主题，目前共两款可选择，默认 default 及 elegant，自定义主题在 theme 文件夹扩展*/
      showLunar: true, /**  是否显示农历，此配置会导致 setTodoLabels 中 showLabelAlways 配置失效*/
      inverse: true, /**  单选模式下是否支持取消选中,*/
      highlightToday: true, /**  是否高亮显示当天，区别于选中样式（初始化时当天高亮并不代表已选中当天）*/
      takeoverTap: true, /**  是否完全接管日期点击事件（日期不会选中），配合 onTapDay() 使用*/
      disablePastDay: true, /**  是否禁选当天之前的日期*/
      firstDayOfWeek: 'Sun', /**  每周第一天为周一还是周日，默认按周日开始*/
      showHandlerOnWeekMode: true /**  周视图模式是否显示日历头部操作栏，hideHeadOnWeekMode 优先级高于此配置*/
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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

  /**
   * 选择日期后执行的事件
   * currentSelect 当前点击的日期
   * allSelectedDays 选择的所有日期（当mulit为true时，allSelectedDays有值）
   */
  afterTapDay(e) {
    console.log('afterTapDay', e.detail); // => { currentSelect: {}, allSelectedDays: [] }
  },
  /**
   * 当日历滑动时触发(适用于周/月视图)
   * 可在滑动时按需在该方法内获取当前日历的一些数据
   */
  onSwipe(e) {
    console.log('onSwipe', e.detail);
    const dates = this.calendar.getCalendarDates();
  },
  /**
   * 当改变月份时触发
   * => current 当前年月 / next 切换后的年月
   */
  whenChangeMonth(e) {
    console.log('whenChangeMonth', e.detail);
    // => { current: { month: 3, ... }, next: { month: 4, ... }}
  },
  /**
   * 周视图下当改变周时触发
   * => current 当前周信息 / next 切换后周信息
   */
  whenChangeWeek(e) {
    console.log('whenChangeWeek', e.detail);
    // {
    //    current: { currentYM: {year: 2019, month: 1 }, dates: [{}] },
    //    next: { currentYM: {year: 2019, month: 1}, dates: [{}] },
    //    directionType: 'next_week'
    // }
  },
  /**
   * 日期点击事件（此事件会完全接管点击事件），需自定义配置 takeoverTap 值为真才能生效
   * currentSelect 当前点击的日期
   */
  onTapDay(e) {
    console.log('onTapDay', e.detail); // => { year: 2019, month: 12, day: 3, ...}
  },
  /**
   * 日历初次渲染完成后触发事件，如设置事件标记
   */
  afterCalendarRender(e) {
    console.log('afterCalendarRender', e);
  }


})