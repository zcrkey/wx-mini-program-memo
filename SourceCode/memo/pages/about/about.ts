//about.js
Page({

  data: {
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    wx.stopPullDownRefresh({
      success() {
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    try {
      wx.setNavigationBarTitle({
        title: '备忘录 - 关于'
      })
      // 设置编辑状态
      wx.setStorageSync('isEdit', false)
    } catch (e) { }
  }
})