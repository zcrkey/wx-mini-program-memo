"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../../utils/util");
var util_2 = require("../../utils/util");
Page({
    data: {
        id: '',
        time: '',
        title: '',
        content: '',
        memoListData: []
    },
    onLoad: function () {
        this.setData({
            time: util_1.formatTime(new Date(), "-")
        });
        try {
            var memoListData = wx.getStorageSync('memoListData');
            if (memoListData) {
                this.setData({
                    memoListData: memoListData
                });
            }
        }
        catch (e) { }
    },
    onShow: function () {
        try {
            var isEdit = wx.getStorageSync('isEdit');
            var memoListData = wx.getStorageSync('memoListData');
            if (isEdit) {
                wx.setNavigationBarTitle({
                    title: '备忘录 - 编辑'
                });
                if (memoListData) {
                    var id = wx.getStorageSync('id');
                    for (var i = 0; i < memoListData.length; i++) {
                        if (memoListData[i].id == id) {
                            console.log("memoListData[i].title" + memoListData[i].title);
                            this.setData({
                                id: id,
                                time: util_1.formatTime(new Date(), "-"),
                                title: memoListData[i].title,
                                content: memoListData[i].content,
                                memoListData: memoListData
                            });
                            break;
                        }
                    }
                }
                ;
                wx.setTabBarItem({
                    index: 1,
                    text: '编辑',
                    iconPath: 'assets/imgs/tabBarEdit.png',
                    selectedIconPath: 'assets/imgs/tabBarEditSelected.png'
                });
            }
            else {
                wx.setNavigationBarTitle({
                    title: '备忘录 - 新建'
                });
                this.setData({
                    id: '',
                    time: util_1.formatTime(new Date(), "-"),
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
        }
        catch (e) { }
    },
    onHide: function () {
        try {
            wx.setStorageSync('isEdit', false);
        }
        catch (e) { }
    },
    memoTitle: function (e) {
        this.setData({
            title: e.detail.value
        });
    },
    memoContent: function (e) {
        this.setData({
            content: e.detail.value
        });
    },
    cancel: function () {
        this.setData({
            id: '',
            time: '',
            title: '',
            content: '',
            memoListData: []
        });
        wx.switchTab({
            url: '/pages/index/index'
        });
    },
    save: function () {
        var id = this.data.id ? this.data.id : util_2.randomNumber();
        var time = this.data.time;
        var title = this.data.title;
        var content = this.data.content;
        if (title == '') {
            wx.showToast({
                title: '请输入标题',
                icon: 'none',
                duration: 1000
            });
        }
        else {
            if (this.data.id != '') {
                for (var i = 0; i < this.data.memoListData.length; i++) {
                    if (this.data.memoListData[i].id == id) {
                        this.data.memoListData[i].id = id;
                        this.data.memoListData[i].time = time;
                        this.data.memoListData[i].title = title;
                        this.data.memoListData[i].content = content;
                        break;
                    }
                }
            }
            else {
                this.data.memoListData.unshift({
                    'id': id,
                    "time": time,
                    "title": title,
                    "content": content
                });
            }
            try {
                wx.setStorageSync('memoListData', this.data.memoListData);
            }
            catch (e) {
                wx.showToast({
                    title: "保存失败，请稍后再试！",
                    icon: 'none',
                    duration: 2000
                });
            }
            wx.switchTab({
                url: '/pages/index/index'
            });
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EseUNBQThDO0FBQzlDLHlDQUFnRDtBQUVoRCxJQUFJLENBQUM7SUFDSCxJQUFJLEVBQUU7UUFDSixFQUFFLEVBQUUsRUFBRTtRQUNOLElBQUksRUFBRSxFQUFFO1FBQ1IsS0FBSyxFQUFFLEVBQUU7UUFDVCxPQUFPLEVBQUUsRUFBRTtRQUNYLFlBQVksRUFBRSxFQUFTO0tBQ3hCO0lBRUQsTUFBTTtRQUVKLElBQUksQ0FBQyxPQUFRLENBQUM7WUFDWixJQUFJLEVBQUUsaUJBQVUsQ0FBQyxJQUFJLElBQUksRUFBRSxFQUFFLEdBQUcsQ0FBQztTQUNsQyxDQUFDLENBQUM7UUFFSCxJQUFJO1lBQ0YsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQTtZQUNwRCxJQUFJLFlBQVksRUFBRTtnQkFDaEIsSUFBSSxDQUFDLE9BQVEsQ0FBQztvQkFDWixZQUFZLEVBQUUsWUFBWTtpQkFDM0IsQ0FBQyxDQUFDO2FBQ0o7U0FDRjtRQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUc7SUFDakIsQ0FBQztJQUtELE1BQU07UUFFSixJQUFJO1lBQ0YsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6QyxJQUFJLFlBQVksR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3JELElBQUksTUFBTSxFQUFFO2dCQUNWLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztvQkFDdkIsS0FBSyxFQUFFLFVBQVU7aUJBQ2xCLENBQUMsQ0FBQztnQkFDSCxJQUFJLFlBQVksRUFBRTtvQkFDaEIsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDakMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFH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LEVBQUUsS0FBSztvQkFDZCxTQUFTLEVBQUUsT0FBTztpQkFDbkIsQ0FBQyxDQUFBO2FBQ0g7WUFDRCxJQUFJO2dCQUVGLEVBQUUsQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7YUFDMUQ7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixFQUFFLENBQUMsU0FBUyxDQUFDO29CQUNYLEtBQUssRUFBRSxhQUFhO29CQUNwQixJQUFJLEVBQUUsTUFBTTtvQkFDWixRQUFRLEVBQUUsSUFBSTtpQkFDZixDQUFDLENBQUE7YUFDSDtZQUVELEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0JBQ1gsR0FBRyxFQUFFLG9CQUFvQjthQUMxQixDQUFDLENBQUE7U0FDSDtJQUNILENBQUM7Q0FFRixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvL25ldy5qc1xyXG5pbXBvcnQgeyBmb3JtYXRUaW1lIH0gZnJvbSAnLi4vLi4vdXRpbHMvdXRpbCc7XHJcbmltcG9ydCB7IHJhbmRvbU51bWJlciB9IGZyb20gJy4uLy4uL3V0aWxzL3V0aWwnO1xyXG5cclxuUGFnZSh7XHJcbiAgZGF0YToge1xyXG4gICAgaWQ6ICcnLFxyXG4gICAgdGltZTogJycsXHJcbiAgICB0aXRsZTogJycsXHJcbiAgICBjb250ZW50OiAnJyxcclxuICAgIG1lbW9MaXN0RGF0YTogW10gYXMgYW55XHJcbiAgfSxcclxuXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgLy8g6K6+572u5pel5pyfXHJcbiAgICB0aGlzLnNldERhdGEhKHtcclxuICAgICAgdGltZTogZm9ybWF0VGltZShuZXcgRGF0ZSgpLCBcIi1cIilcclxuICAgIH0pO1xyXG4gICAgLy8g6I635Y+W5pys5Zyw57yT5a2Y5aSH5b+Y5b2V5YiX6KGo5pWw5o2uXHJcbiAgICB0cnkge1xyXG4gICAgICBsZXQgbWVtb0xpc3REYXRhID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbW9MaXN0RGF0YScpXHJcbiAgICAgIGlmIChtZW1vTGlzdERhdGEpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEhKHtcclxuICAgICAgICAgIG1lbW9MaXN0RGF0YTogbWVtb0xpc3REYXRhXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGUpIHsgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5pi+56S6XHJcbiAgICovXHJcbiAgb25TaG93KCkge1xyXG4gICAgLy8g6I635Y+W57yW6L6R54q25oCBXHJcbiAgICB0cnkge1xyXG4gICAgICBsZXQgaXNFZGl0ID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2lzRWRpdCcpO1xyXG4gICAgICBsZXQgbWVtb0xpc3REYXRhID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbW9MaXN0RGF0YScpO1xyXG4gICAgICBpZiAoaXNFZGl0KSB7XHJcbiAgICAgICAgd3guc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcclxuICAgICAgICAgIHRpdGxlOiAn5aSH5b+Y5b2VIC0g57yW6L6RJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChtZW1vTGlzdERhdGEpIHtcclxuICAgICAgICAgIGxldCBpZCA9IHd4LmdldFN0b3JhZ2VTeW5jKCdpZCcpO1xyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZW1vTGlzdERhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKG1lbW9MaXN0RGF0YVtpXS5pZCA9PSBpZCkge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibWVtb0xpc3REYXRhW2ldLnRpdGxlXCIgKyBtZW1vTGlzdERhdGFbaV0udGl0bGUpO1xyXG4gICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSEoe1xyXG4gICAgICAgICAgICAgICAgaWQ6IGlkLFxyXG4gICAgICAgICAgICAgICAgdGltZTogZm9ybWF0VGltZShuZXcgRGF0ZSgpLCBcIi1cIiksXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogbWVtb0xpc3REYXRhW2ldLnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogbWVtb0xpc3REYXRhW2ldLmNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICBtZW1vTGlzdERhdGE6IG1lbW9MaXN0RGF0YVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB3eC5zZXRUYWJCYXJJdGVtKHtcclxuICAgICAgICAgIGluZGV4OiAxLFxyXG4gICAgICAgICAgdGV4dDogJ+e8lui+kScsXHJcbiAgICAgICAgICBpY29uUGF0aDogJ2Fzc2V0cy9pbWdzL3RhYkJhckVkaXQucG5nJyxcclxuICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdhc3NldHMvaW1ncy90YWJCYXJFZGl0U2VsZWN0ZWQucG5nJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XHJcbiAgICAgICAgICB0aXRsZTogJ+Wkh+W/mOW9lSAtIOaWsOW7uidcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuc2V0RGF0YSEoe1xyXG4gICAgICAgICAgaWQ6ICcnLFxyXG4gICAgICAgICAgdGltZTogZm9ybWF0VGltZShuZXcgRGF0ZSgpLCBcIi1cIiksXHJcbiAgICAgICAgICB0aXRsZTogJycsXHJcbiAgICAgICAgICBjb250ZW50OiAnJyxcclxuICAgICAgICAgIG1lbW9MaXN0RGF0YTogbWVtb0xpc3REYXRhID8gbWVtb0xpc3REYXRhIDogW11cclxuICAgICAgICB9KTtcclxuICAgICAgICB3eC5zZXRUYWJCYXJJdGVtKHtcclxuICAgICAgICAgIGluZGV4OiAxLFxyXG4gICAgICAgICAgdGV4dDogJ+aWsOW7uicsXHJcbiAgICAgICAgICBpY29uUGF0aDogJ2Fzc2V0cy9pbWdzL3RhYkJhck5ldy5wbmcnLFxyXG4gICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2Fzc2V0cy9pbWdzL3RhYkJhck5ld1NlbGVjdGVkLnBuZydcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZSkgeyB9XHJcbiAgICAvKlxyXG4gICAgd3guc2V0TmF2aWdhdGlvbkJhckNvbG9yKHtcclxuICAgICAgZnJvbnRDb2xvcjogJyNmZmZmZmYnLFxyXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZmYwMDAwJyxcclxuICAgICAgYW5pbWF0aW9uOiB7XHJcbiAgICAgICAgZHVyYXRpb246IDQwMCxcclxuICAgICAgICB0aW1pbmdGdW5jOiAnZWFzZUluJ1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgKi9cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdoumakOiXj1xyXG4gICAqL1xyXG4gIG9uSGlkZSgpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIC8vIOiuvue9rue8lui+keeKtuaAgVxyXG4gICAgICB3eC5zZXRTdG9yYWdlU3luYygnaXNFZGl0JywgZmFsc2UpXHJcbiAgICB9IGNhdGNoIChlKSB7IH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDojrflj5blpIflv5jlvZXmoIfpophcclxuICAgKi9cclxuICBtZW1vVGl0bGUoZTogYW55KSB7XHJcbiAgICB0aGlzLnNldERhdGEhKHtcclxuICAgICAgdGl0bGU6IGUuZGV0YWlsLnZhbHVlXHJcbiAgICB9KVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIOiOt+WPluWkh+W/mOW9leWGheWuuVxyXG4gICAqL1xyXG4gIG1lbW9Db250ZW50KGU6IGFueSkge1xyXG4gICAgdGhpcy5zZXREYXRhISh7XHJcbiAgICAgIGNvbnRlbnQ6IGUuZGV0YWlsLnZhbHVlXHJcbiAgICB9KVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIOWPlua2iFxyXG4gICAqL1xyXG4gIGNhbmNlbCgpIHtcclxuICAgIHRoaXMuc2V0RGF0YSEoe1xyXG4gICAgICBpZDogJycsXHJcbiAgICAgIHRpbWU6ICcnLFxyXG4gICAgICB0aXRsZTogJycsXHJcbiAgICAgIGNvbnRlbnQ6ICcnLFxyXG4gICAgICBtZW1vTGlzdERhdGE6IFtdXHJcbiAgICB9KTtcclxuICAgIC8vIOWIh+aNouWIsOmmlumhtVxyXG4gICAgd3guc3dpdGNoVGFiKHtcclxuICAgICAgdXJsOiAnL3BhZ2VzL2luZGV4L2luZGV4J1xyXG4gICAgfSlcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDkv53lrZhcclxuICAgKi9cclxuICBzYXZlKCkge1xyXG4gICAgbGV0IGlkID0gdGhpcy5kYXRhLmlkID8gdGhpcy5kYXRhLmlkIDogcmFuZG9tTnVtYmVyKCk7XHJcbiAgICBsZXQgdGltZSA9IHRoaXMuZGF0YS50aW1lO1xyXG4gICAgbGV0IHRpdGxlID0gdGhpcy5kYXRhLnRpdGxlO1xyXG4gICAgbGV0IGNvbnRlbnQgPSB0aGlzLmRhdGEuY29udGVudDtcclxuICAgIGlmICh0aXRsZSA9PSAnJykge1xyXG4gICAgICAvLyDmj5DnpLrovpPlhaXmoIfpophcclxuICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICB0aXRsZTogJ+ivt+i+k+WFpeagh+mimCcsXHJcbiAgICAgICAgaWNvbjogJ25vbmUnLFxyXG4gICAgICAgIGR1cmF0aW9uOiAxMDAwXHJcbiAgICAgIH0pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5kYXRhLmlkICE9ICcnKSB7XHJcbiAgICAgICAgLy8g5L+u5pS55aSH5b+Y5b2V5YiX6KGo5pWw5o2uXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRhdGEubWVtb0xpc3REYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5kYXRhLm1lbW9MaXN0RGF0YVtpXS5pZCA9PSBpZCkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEubWVtb0xpc3REYXRhW2ldLmlkID0gaWQ7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5tZW1vTGlzdERhdGFbaV0udGltZSA9IHRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5tZW1vTGlzdERhdGFbaV0udGl0bGUgPSB0aXRsZTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLm1lbW9MaXN0RGF0YVtpXS5jb250ZW50ID0gY29udGVudDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIOi/veWKoOWkh+W/mOW9leWIl+ihqOaVsOaNrlxyXG4gICAgICAgIHRoaXMuZGF0YS5tZW1vTGlzdERhdGEudW5zaGlmdCh7XHJcbiAgICAgICAgICAnaWQnOiBpZCxcclxuICAgICAgICAgIFwidGltZVwiOiB0aW1lLFxyXG4gICAgICAgICAgXCJ0aXRsZVwiOiB0aXRsZSxcclxuICAgICAgICAgIFwiY29udGVudFwiOiBjb250ZW50XHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIC8vIOiuvue9ruacrOWcsOe8k+WtmOWkh+W/mOW9leWIl+ihqOaVsOaNrlxyXG4gICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdtZW1vTGlzdERhdGEnLCB0aGlzLmRhdGEubWVtb0xpc3REYXRhKVxyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiBcIuS/neWtmOWksei0pe+8jOivt+eojeWQjuWGjeivle+8gVwiLFxyXG4gICAgICAgICAgaWNvbjogJ25vbmUnLFxyXG4gICAgICAgICAgZHVyYXRpb246IDIwMDBcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICAgIC8vIOWIh+aNouWIsOmmlumhtVxyXG4gICAgICB3eC5zd2l0Y2hUYWIoe1xyXG4gICAgICAgIHVybDogJy9wYWdlcy9pbmRleC9pbmRleCdcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcblxyXG59KTtcclxuIl19