//index.js

Page({
  data: {
    isNullData: true,
    memoListData: [] as any[],
    //开始坐标
    startX: 0 as number,
    startY: 0 as number
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    console.log("监听用户下拉动作");
    this.getMemoListData();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getMemoListData();
  },

  onLoad() {
    try {
      // 设置编辑状态
      wx.setStorageSync('isEdit', false)
    } catch (e) { }
    this.getMemoListData();
  },

  /**
   * 获取备忘录数据源
   */
  getMemoListData() {
    // 获取本地缓存备忘录列表数据
    try {
      let memoListData = wx.getStorageSync('memoListData');
      if (memoListData) {

        memoListData.forEach((item: any) => {
          //默认隐藏删除
          item.isTouchMove = false;
        });
        this.setData!({
          memoListData: memoListData,
          isNullData: false
        })
      } else {
        this.setData!({
          memoListData: [] as any,
          isNullData: true
        })
      }
    } catch (e) {
      wx.showToast({
        title: '获取备忘录数据失败，请稍后再试！',
        icon: 'none',
        duration: 1500
      })
    }
  },

  /**
   * 点击新建
   */
  onClickNew() {
    console.log("点击新建");
    try {
      // 设置编辑状态
      wx.setStorageSync('isEdit', false)
      // 切换到新建
      wx.switchTab({
        url: '/pages/new/new'
      })
    } catch (e) { }
  },

  /**
   * 点击编辑
   */
  onClickEdit(event: any) {
    console.log("点击编辑");
    try {
      // 设置编辑状态
      wx.setStorageSync('isEdit', true)
      let id = event.currentTarget.dataset.item.id;
      // 设置编辑状态
      wx.setStorageSync('id', id)
      // 切换到新建
      wx.switchTab({
        url: '/pages/new/new'
      })
    } catch (e) { }
  },

  /**
   * 删除提示
   */
  onClickdeleteModal(event: any) {
    let that = this;
    wx.showModal({
      title: '删除提示',
      content: '是否确定删除该备忘录！',
      success(res) {
        if (res.confirm) {
          that.onClickdelete(event);
        } else if (res.cancel) {
        }
      }
    })
  },

  /**
   * 点击删除
   */
  onClickdelete(event: any) {
    try {
      let index: number = event.currentTarget.dataset.index;
      if (index != null && this.data.memoListData != null) {
        this.data.memoListData.splice(event.currentTarget.dataset.index, 1);
        this.setData!({
          memoListData: this.data.memoListData
        })
        //异步更新列表缓存
        wx.setStorageSync('memoListData', this.data.memoListData);
        if (this.data.memoListData.length == 0) {
          wx.clearStorageSync();
        }
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 1000
        });
      }
    } catch (e) { }
  },

  /**
   * 手指触摸动作开始 记录起点X坐标
   */
  touchstart(event: any) {
    console.log("touchstart");
    //开始触摸时 重置所有删除
    this.data.memoListData.forEach((item: any) => {
      //只操作为true的
      if (item.isTouchMove)
        item.isTouchMove = false;
    });
    //更新数据
    this.setData!({
      memoListData: this.data.memoListData,
      startX: event.changedTouches[0].clientX,
      startY: event.changedTouches[0].clientY
    })
  },

  /**
   * 滑动事件处理
   */
  touchmove(event: any) {
    console.log("touchmove");
    let that = this,
      index = event.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = event.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = event.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });

    that.data.memoListData.forEach((v: any, i: number) => {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    });
    //更新数据
    that.setData!({
      memoListData: that.data.memoListData
    })
  },

  /**
   * 计算滑动角度
   */
  angle(start: any, end: any) {
    let _X = end.X - start.X, _Y = end.Y - start.Y
    //返回角度 Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  }

})
