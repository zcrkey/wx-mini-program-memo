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
        memoListData: [],
        isEdit: false
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
                                memoListData: memoListData,
                                isEdit: true
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
                    memoListData: memoListData ? memoListData : [],
                    isEdit: false
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
            this.data.isEdit = false;
            wx.setTabBarItem({
                index: 1,
                text: '新建',
                iconPath: 'assets/imgs/tabBarNew.png',
                selectedIconPath: 'assets/imgs/tabBarNewSelected.png'
            });
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
        try {
            this.setData({
                id: '',
                time: '',
                title: '',
                content: '',
                memoListData: []
            });
            wx.setStorageSync('isEdit', false);
            this.data.isEdit = false;
            wx.setTabBarItem({
                index: 1,
                text: '新建',
                iconPath: 'assets/imgs/tabBarNew.png',
                selectedIconPath: 'assets/imgs/tabBarNewSelected.png'
            });
            wx.switchTab({
                url: '/pages/index/index'
            });
        }
        catch (e) { }
    },
    deleteModal: function () {
        var that = this;
        wx.showModal({
            title: '删除提示',
            content: '是否确定删除该备忘录！',
            success: function (res) {
                if (res.confirm) {
                    that.delete();
                }
                else if (res.cancel) {
                }
            }
        });
    },
    delete: function () {
        var _this = this;
        if (this.data.id != "") {
            try {
                if (this.data.memoListData != null) {
                    var index = this.data.memoListData.findIndex(function (item) { return item.id == _this.data.id; });
                    this.data.memoListData.splice(index, 1);
                    wx.setStorageSync('memoListData', this.data.memoListData);
                    if (this.data.memoListData.length == 0) {
                        wx.clearStorageSync();
                    }
                    wx.showToast({
                        title: '删除成功',
                        icon: 'success',
                        duration: 1000
                    });
                    setTimeout(function () {
                        wx.switchTab({
                            url: '/pages/index/index'
                        });
                    }, 800);
                }
            }
            catch (e) { }
        }
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
                wx.showToast({
                    title: '保存成功',
                    icon: 'success',
                    duration: 1000
                });
                setTimeout(function () {
                    wx.switchTab({
                        url: '/pages/index/index'
                    });
                }, 800);
            }
            catch (e) {
                wx.showToast({
                    title: "保存失败，请稍后再试！",
                    icon: 'none',
                    duration: 2000
                });
            }
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EseUNBQThDO0FBQzlDLHlDQUFnRDtBQUVoRCxJQUFJLENBQUM7SUFDSCxJQUFJLEVBQUU7UUFDSixFQUFFLEVBQUUsRUFBRTtRQUNOLElBQUksRUFBRSxFQUFFO1FBQ1IsS0FBSyxFQUFFLEVBQUU7UUFDVCxPQUFPLEVBQUUsRUFBRTtRQUNYLFlBQVksRUFBRSxFQUFTO1FBQ3ZCLE1BQU0sRUFBRSxLQUFLO0tBQ2Q7SUFFRCxNQUFNO1FBRUosSUFBSSxDQUFDLE9BQVEsQ0FBQztZQUNaLElBQUksRUFBRSxpQkFBVSxDQUFDLElBQUksSUFBSSxFQUFFLEVBQUUsR0FBRyxDQUFDO1NBQ2xDLENBQUMsQ0FBQztRQUVILElBQUk7WUFDRixJQUFJLFlBQVksR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFBO1lBQ3BELElBQUksWUFBWSxFQUFFO2dCQUNoQixJQUFJLENBQUMsT0FBUSxDQUFDO29CQUNaLFlBQVksRUFBRSxZQUFZO2lCQUMzQixDQUFDLENBQUM7YUFDSjtTQUNGO1FBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRztJQUNqQixDQUFDO0lBS0QsTUFBTTtRQUVKLElBQUk7WUFDRixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3pDLElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDckQsSUFBSSxNQUFNLEVBQUU7Z0JBQ1YsRUFBRSxDQUFDLHFCQUFxQixDQUFDO29CQUN2QixLQUFLLEVBQUUsVUFBVTtpQkFDbEIsQ0FBQyxDQUFDO2dCQUNILElBQUksWUFBWSxFQUFFO29CQUNoQixJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNqQyxLQUFLLElBQUksQ0FBQyxHQUFH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RUFBRSxJQUFJO2lCQUNmLENBQUMsQ0FBQztnQkFHSCxVQUFVLENBQUM7b0JBQ1QsRUFBRSxDQUFDLFNBQVMsQ0FBQzt3QkFDWCxHQUFHLEVBQUUsb0JBQW9CO3FCQUMxQixDQUFDLENBQUE7Z0JBQ0osQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBRVQ7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixFQUFFLENBQUMsU0FBUyxDQUFDO29CQUNYLEtBQUssRUFBRSxhQUFhO29CQUNwQixJQUFJLEVBQUUsTUFBTTtvQkFDWixRQUFRLEVBQUUsSUFBSTtpQkFDZixDQUFDLENBQUE7YUFDSDtTQUVGO0lBQ0gsQ0FBQztDQUVGLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vbmV3LmpzXHJcbmltcG9ydCB7IGZvcm1hdFRpbWUgfSBmcm9tICcuLi8uLi91dGlscy91dGlsJztcclxuaW1wb3J0IHsgcmFuZG9tTnVtYmVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvdXRpbCc7XHJcblxyXG5QYWdlKHtcclxuICBkYXRhOiB7XHJcbiAgICBpZDogJycsXHJcbiAgICB0aW1lOiAnJyxcclxuICAgIHRpdGxlOiAnJyxcclxuICAgIGNvbnRlbnQ6ICcnLFxyXG4gICAgbWVtb0xpc3REYXRhOiBbXSBhcyBhbnksXHJcbiAgICBpc0VkaXQ6IGZhbHNlXHJcbiAgfSxcclxuXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgLy8g6K6+572u5pel5pyfXHJcbiAgICB0aGlzLnNldERhdGEhKHtcclxuICAgICAgdGltZTogZm9ybWF0VGltZShuZXcgRGF0ZSgpLCBcIi1cIilcclxuICAgIH0pO1xyXG4gICAgLy8g6I635Y+W5pys5Zyw57yT5a2Y5aSH5b+Y5b2V5YiX6KGo5pWw5o2uXHJcbiAgICB0cnkge1xyXG4gICAgICBsZXQgbWVtb0xpc3REYXRhID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbW9MaXN0RGF0YScpXHJcbiAgICAgIGlmIChtZW1vTGlzdERhdGEpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEhKHtcclxuICAgICAgICAgIG1lbW9MaXN0RGF0YTogbWVtb0xpc3REYXRhXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGUpIHsgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5pi+56S6XHJcbiAgICovXHJcbiAgb25TaG93KCkge1xyXG4gICAgLy8g6I635Y+W57yW6L6R54q25oCBXHJcbiAgICB0cnkge1xyXG4gICAgICBsZXQgaXNFZGl0ID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2lzRWRpdCcpO1xyXG4gICAgICBsZXQgbWVtb0xpc3REYXRhID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbW9MaXN0RGF0YScpO1xyXG4gICAgICBpZiAoaXNFZGl0KSB7XHJcbiAgICAgICAgd3guc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcclxuICAgICAgICAgIHRpdGxlOiAn5aSH5b+Y5b2VIC0g57yW6L6RJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChtZW1vTGlzdERhdGEpIHtcclxuICAgICAgICAgIGxldCBpZCA9IHd4LmdldFN0b3JhZ2VTeW5jKCdpZCcpO1xyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZW1vTGlzdERhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKG1lbW9MaXN0RGF0YVtpXS5pZCA9PSBpZCkge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibWVtb0xpc3REYXRhW2ldLnRpdGxlXCIgKyBtZW1vTGlzdERhdGFbaV0udGl0bGUpO1xyXG4gICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSEoe1xyXG4gICAgICAgICAgICAgICAgaWQ6IGlkLFxyXG4gICAgICAgICAgICAgICAgdGltZTogZm9ybWF0VGltZShuZXcgRGF0ZSgpLCBcIi1cIiksXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogbWVtb0xpc3REYXRhW2ldLnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogbWVtb0xpc3REYXRhW2ldLmNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICBtZW1vTGlzdERhdGE6IG1lbW9MaXN0RGF0YSxcclxuICAgICAgICAgICAgICAgIGlzRWRpdDogdHJ1ZVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB3eC5zZXRUYWJCYXJJdGVtKHtcclxuICAgICAgICAgIGluZGV4OiAxLFxyXG4gICAgICAgICAgdGV4dDogJ+e8lui+kScsXHJcbiAgICAgICAgICBpY29uUGF0aDogJ2Fzc2V0cy9pbWdzL3RhYkJhckVkaXQucG5nJyxcclxuICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdhc3NldHMvaW1ncy90YWJCYXJFZGl0U2VsZWN0ZWQucG5nJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XHJcbiAgICAgICAgICB0aXRsZTogJ+Wkh+W/mOW9lSAtIOaWsOW7uidcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuc2V0RGF0YSEoe1xyXG4gICAgICAgICAgaWQ6ICcnLFxyXG4gICAgICAgICAgdGltZTogZm9ybWF0VGltZShuZXcgRGF0ZSgpLCBcIi1cIiksXHJcbiAgICAgICAgICB0aXRsZTogJycsXHJcbiAgICAgICAgICBjb250ZW50OiAnJyxcclxuICAgICAgICAgIG1lbW9MaXN0RGF0YTogbWVtb0xpc3REYXRhID8gbWVtb0xpc3REYXRhIDogW10sXHJcbiAgICAgICAgICBpc0VkaXQ6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgd3guc2V0VGFiQmFySXRlbSh7XHJcbiAgICAgICAgICBpbmRleDogMSxcclxuICAgICAgICAgIHRleHQ6ICfmlrDlu7onLFxyXG4gICAgICAgICAgaWNvblBhdGg6ICdhc3NldHMvaW1ncy90YWJCYXJOZXcucG5nJyxcclxuICAgICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdhc3NldHMvaW1ncy90YWJCYXJOZXdTZWxlY3RlZC5wbmcnXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGUpIHsgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i6ZqQ6JePXHJcbiAgICovXHJcbiAgb25IaWRlKCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgLy8g6K6+572u57yW6L6R54q25oCBXHJcbiAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdpc0VkaXQnLCBmYWxzZSk7XHJcbiAgICAgIHRoaXMuZGF0YS5pc0VkaXQgPSBmYWxzZTtcclxuICAgICAgd3guc2V0VGFiQmFySXRlbSh7XHJcbiAgICAgICAgaW5kZXg6IDEsXHJcbiAgICAgICAgdGV4dDogJ+aWsOW7uicsXHJcbiAgICAgICAgaWNvblBhdGg6ICdhc3NldHMvaW1ncy90YWJCYXJOZXcucG5nJyxcclxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnYXNzZXRzL2ltZ3MvdGFiQmFyTmV3U2VsZWN0ZWQucG5nJ1xyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGUpIHsgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIOiOt+WPluWkh+W/mOW9leagh+mimFxyXG4gICAqL1xyXG4gIG1lbW9UaXRsZShlOiBhbnkpIHtcclxuICAgIHRoaXMuc2V0RGF0YSEoe1xyXG4gICAgICB0aXRsZTogZS5kZXRhaWwudmFsdWVcclxuICAgIH0pXHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICog6I635Y+W5aSH5b+Y5b2V5YaF5a65XHJcbiAgICovXHJcbiAgbWVtb0NvbnRlbnQoZTogYW55KSB7XHJcbiAgICB0aGlzLnNldERhdGEhKHtcclxuICAgICAgY29udGVudDogZS5kZXRhaWwudmFsdWVcclxuICAgIH0pXHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICog5Y+W5raIXHJcbiAgICovXHJcbiAgY2FuY2VsKCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgdGhpcy5zZXREYXRhISh7XHJcbiAgICAgICAgaWQ6ICcnLFxyXG4gICAgICAgIHRpbWU6ICcnLFxyXG4gICAgICAgIHRpdGxlOiAnJyxcclxuICAgICAgICBjb250ZW50OiAnJyxcclxuICAgICAgICBtZW1vTGlzdERhdGE6IFtdXHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyDorr7nva7nvJbovpHnirbmgIFcclxuICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ2lzRWRpdCcsIGZhbHNlKTtcclxuICAgICAgdGhpcy5kYXRhLmlzRWRpdCA9IGZhbHNlO1xyXG4gICAgICB3eC5zZXRUYWJCYXJJdGVtKHtcclxuICAgICAgICBpbmRleDogMSxcclxuICAgICAgICB0ZXh0OiAn5paw5bu6JyxcclxuICAgICAgICBpY29uUGF0aDogJ2Fzc2V0cy9pbWdzL3RhYkJhck5ldy5wbmcnLFxyXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdhc3NldHMvaW1ncy90YWJCYXJOZXdTZWxlY3RlZC5wbmcnXHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyDliIfmjaLliLDpppbpobVcclxuICAgICAgd3guc3dpdGNoVGFiKHtcclxuICAgICAgICB1cmw6ICcvcGFnZXMvaW5kZXgvaW5kZXgnXHJcbiAgICAgIH0pXHJcbiAgICB9IGNhdGNoIChlKSB7IH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDliKDpmaTmj5DnpLpcclxuICAgKi9cclxuICBkZWxldGVNb2RhbCgpIHtcclxuICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgIHd4LnNob3dNb2RhbCh7XHJcbiAgICAgIHRpdGxlOiAn5Yig6Zmk5o+Q56S6JyxcclxuICAgICAgY29udGVudDogJ+aYr+WQpuehruWumuWIoOmZpOivpeWkh+W/mOW9le+8gScsXHJcbiAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XHJcbiAgICAgICAgICB0aGF0LmRlbGV0ZSgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDliKDpmaRcclxuICAgKi9cclxuICBkZWxldGUoKSB7XHJcbiAgICBpZiAodGhpcy5kYXRhLmlkICE9IFwiXCIpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBpZiAodGhpcy5kYXRhLm1lbW9MaXN0RGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICBsZXQgaW5kZXg6IG51bWJlciA9IHRoaXMuZGF0YS5tZW1vTGlzdERhdGEuZmluZEluZGV4KChpdGVtOiBhbnkpID0+IGl0ZW0uaWQgPT0gdGhpcy5kYXRhLmlkKTtcclxuICAgICAgICAgIC8v5Yig6Zmk5oyH5a6a5LiL5qCH55qE5YC8XHJcbiAgICAgICAgICB0aGlzLmRhdGEubWVtb0xpc3REYXRhLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAvL+W8guatpeabtOaWsOWIl+ihqOe8k+WtmFxyXG4gICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ21lbW9MaXN0RGF0YScsIHRoaXMuZGF0YS5tZW1vTGlzdERhdGEpO1xyXG4gICAgICAgICAgaWYgKHRoaXMuZGF0YS5tZW1vTGlzdERhdGEubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgd3guY2xlYXJTdG9yYWdlU3luYygpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgdGl0bGU6ICfliKDpmaTmiJDlip8nLFxyXG4gICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIC8vIOWIoOmZpOWQjuWIt+aWsOmhtemdolxyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHd4LnN3aXRjaFRhYih7XHJcbiAgICAgICAgICAgICAgdXJsOiAnL3BhZ2VzL2luZGV4L2luZGV4J1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfSwgODAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9IGNhdGNoIChlKSB7IH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDkv53lrZhcclxuICAgKi9cclxuICBzYXZlKCkge1xyXG4gICAgbGV0IGlkID0gdGhpcy5kYXRhLmlkID8gdGhpcy5kYXRhLmlkIDogcmFuZG9tTnVtYmVyKCk7XHJcbiAgICBsZXQgdGltZSA9IHRoaXMuZGF0YS50aW1lO1xyXG4gICAgbGV0IHRpdGxlID0gdGhpcy5kYXRhLnRpdGxlO1xyXG4gICAgbGV0IGNvbnRlbnQgPSB0aGlzLmRhdGEuY29udGVudDtcclxuICAgIGlmICh0aXRsZSA9PSAnJykge1xyXG4gICAgICAvLyDmj5DnpLrovpPlhaXmoIfpophcclxuICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICB0aXRsZTogJ+ivt+i+k+WFpeagh+mimCcsXHJcbiAgICAgICAgaWNvbjogJ25vbmUnLFxyXG4gICAgICAgIGR1cmF0aW9uOiAxMDAwXHJcbiAgICAgIH0pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5kYXRhLmlkICE9ICcnKSB7XHJcbiAgICAgICAgLy8g5L+u5pS55aSH5b+Y5b2V5YiX6KGo5pWw5o2uXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRhdGEubWVtb0xpc3REYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5kYXRhLm1lbW9MaXN0RGF0YVtpXS5pZCA9PSBpZCkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEubWVtb0xpc3REYXRhW2ldLmlkID0gaWQ7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5tZW1vTGlzdERhdGFbaV0udGltZSA9IHRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5tZW1vTGlzdERhdGFbaV0udGl0bGUgPSB0aXRsZTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLm1lbW9MaXN0RGF0YVtpXS5jb250ZW50ID0gY29udGVudDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIOi/veWKoOWkh+W/mOW9leWIl+ihqOaVsOaNrlxyXG4gICAgICAgIHRoaXMuZGF0YS5tZW1vTGlzdERhdGEudW5zaGlmdCh7XHJcbiAgICAgICAgICAnaWQnOiBpZCxcclxuICAgICAgICAgIFwidGltZVwiOiB0aW1lLFxyXG4gICAgICAgICAgXCJ0aXRsZVwiOiB0aXRsZSxcclxuICAgICAgICAgIFwiY29udGVudFwiOiBjb250ZW50XHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIC8vIOiuvue9ruacrOWcsOe8k+WtmOWkh+W/mOW9leWIl+ihqOaVsOaNrlxyXG4gICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdtZW1vTGlzdERhdGEnLCB0aGlzLmRhdGEubWVtb0xpc3REYXRhKTtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6ICfkv53lrZjmiJDlip8nLFxyXG4gICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgICAgZHVyYXRpb246IDEwMDBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g5YiH5o2i5Yiw6aaW6aG1XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICB3eC5zd2l0Y2hUYWIoe1xyXG4gICAgICAgICAgICB1cmw6ICcvcGFnZXMvaW5kZXgvaW5kZXgnXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sIDgwMCk7XHJcblxyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiBcIuS/neWtmOWksei0pe+8jOivt+eojeWQjuWGjeivle+8gVwiLFxyXG4gICAgICAgICAgaWNvbjogJ25vbmUnLFxyXG4gICAgICAgICAgZHVyYXRpb246IDIwMDBcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG4gIH1cclxuXHJcbn0pO1xyXG4iXX0=