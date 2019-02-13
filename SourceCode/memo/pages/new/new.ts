//new.js
import { formatTime } from '../../utils/util';
import { randomNumber } from '../../utils/util';

Page({
  data: {
    id: '',
    time: '',
    title: '',
    content: '',
    memoListData: [] as any
  },

  onLoad() {
    // 设置日期
    this.setData!({
      time: formatTime(new Date(), "-")
    });
    // 获取本地缓存备忘录列表数据
    try {
      let memoListData = wx.getStorageSync('memoListData')
      if (memoListData) {
        this.setData!({
          memoListData: memoListData
        });
      }
    } catch (e) { }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 获取编辑状态
    try {
      let isEdit = wx.getStorageSync('isEdit');
      let memoListData = wx.getStorageSync('memoListData');
      if (isEdit) {
        wx.setNavigationBarTitle({
          title: '备忘录 - 编辑'
        });
        if (memoListData) {
          let id = wx.getStorageSync('id');
          for (let i = 0; i < memoListData.length; i++) {
            if (memoListData[i].id == id) {
              console.log("memoListData[i].title" + memoListData[i].title);
              this.setData!({
                id: id,
                time: formatTime(new Date(), "-"),
                title: memoListData[i].title,
                content: memoListData[i].content,
                memoListData: memoListData
              });
              break;
            }
          }
        };
        wx.setTabBarItem({
          index: 1,
          text: '编辑',
          iconPath: 'assets/imgs/tabBarEdit.png',
          selectedIconPath: 'assets/imgs/tabBarEditSelected.png'
        });
      } else {
        wx.setNavigationBarTitle({
          title: '备忘录 - 新建'
        })
        this.setData!({
          id: '',
          time: formatTime(new Date(), "-"),
          title: '',
          content: '',
          memoListData: memoListData ? memoListData : []
        });
        wx.setTabBarItem({
          index: 1,
          text: '新建',
          iconPath: 'assets/imgs/tabBarNew.png',
          selectedIconPath: 'assets/imgs/tabBarNewSelected.png'
        });
      }
    } catch (e) { }
    /*
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#ff0000',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
    */
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    try {
      // 设置编辑状态
      wx.setStorageSync('isEdit', false)
    } catch (e) { }
  },

  /**
   * 获取备忘录标题
   */
  memoTitle(e: any) {
    this.setData!({
      title: e.detail.value
    })
  },

  /**
   * 获取备忘录内容
   */
  memoContent(e: any) {
    this.setData!({
      content: e.detail.value
    })
  },

  /**
   * 取消
   */
  cancel() {
    this.setData!({
      id: '',
      time: '',
      title: '',
      content: '',
      memoListData: []
    });
    // 切换到首页
    wx.switchTab({
      url: '/pages/index/index'
    })
  },

  /**
   * 保存
   */
  save() {
    let id = this.data.id ? this.data.id : randomNumber();
    let time = this.data.time;
    let title = this.data.title;
    let content = this.data.content;
    if (title == '') {
      // 提示输入标题
      wx.showToast({
        title: '请输入标题',
        icon: 'none',
        duration: 1000
      })
    } else {
      if (this.data.id != '') {
        // 修改备忘录列表数据
        for (let i = 0; i < this.data.memoListData.length; i++) {
          if (this.data.memoListData[i].id == id) {
            this.data.memoListData[i].id = id;
            this.data.memoListData[i].time = time;
            this.data.memoListData[i].title = title;
            this.data.memoListData[i].content = content;
            break;
          }
        }
      } else {
        // 追加备忘录列表数据
        this.data.memoListData.unshift({
          'id': id,
          "time": time,
          "title": title,
          "content": content
        })
      }
      try {
        // 设置本地缓存备忘录列表数据
        wx.setStorageSync('memoListData', this.data.memoListData)
      } catch (e) {
        wx.showToast({
          title: "保存失败，请稍后再试！",
          icon: 'none',
          duration: 2000
        })
      }
      // 切换到首页
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
  }

});
