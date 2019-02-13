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
    onPullDownRefresh: function () {
        wx.stopPullDownRefresh({
            success: function () {
            }
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EseUNBQThDO0FBQzlDLHlDQUFnRDtBQUVoRCxJQUFJLENBQUM7SUFDSCxJQUFJLEVBQUU7UUFDSixFQUFFLEVBQUUsRUFBRTtRQUNOLElBQUksRUFBRSxFQUFFO1FBQ1IsS0FBSyxFQUFFLEVBQUU7UUFDVCxPQUFPLEVBQUUsRUFBRTtRQUNYLFlBQVksRUFBRSxFQUFTO1FBQ3ZCLE1BQU0sRUFBRSxLQUFLO0tBQ2Q7SUFFRCxNQUFNO1FBRUosSUFBSSxDQUFDLE9BQVEsQ0FBQztZQUNaLElBQUksRUFBRSxpQkFBVSxDQUFDLElBQUksSUFBSSxFQUFFLEVBQUUsR0FBRyxDQUFDO1NBQ2xDLENBQUMsQ0FBQztRQUVILElBQUk7WUFDRixJQUFJLFlBQVksR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFBO1lBQ3BELElBQUksWUFBWSxFQUFFO2dCQUNoQixJQUFJLENBQUMsT0FBUSxDQUFDO29CQUNaLFlBQVksRUFBRSxZQUFZO2lCQUMzQixDQUFDLENBQUM7YUFDSjtTQUNGO1FBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRztJQUNqQixDQUFDO0lBS0QsaUJBQWlCO1FBQ2YsRUFBRSxDQUFDLG1CQUFtQixDQUFDO1lBQ3JCLE9BQU87WUFDUCxDQUFDO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUtELE1BQU07UUFFSixJQUFJO1lBQ0YsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6QyxJQUFJLFlBQVksR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3JELElBQUksTUFBTSxFQUFFO2dCQUNWLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztvQkFDdkIsS0FBSyxFQUFFLFVBQVU7aUJBQ2xCLENBQUMsQ0FBQztnQkFDSCxJQUFJLFlBQVksRUFB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LFFBQVEsRUFBRSxJQUFJO2lCQUNmLENBQUMsQ0FBQztnQkFHSCxVQUFVLENBQUM7b0JBQ1QsRUFBRSxDQUFDLFNBQVMsQ0FBQzt3QkFDWCxHQUFHLEVBQUUsb0JBQW9CO3FCQUMxQixDQUFDLENBQUE7Z0JBQ0osQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBRVQ7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixFQUFFLENBQUMsU0FBUyxDQUFDO29CQUNYLEtBQUssRUFBRSxhQUFhO29CQUNwQixJQUFJLEVBQUUsTUFBTTtvQkFDWixRQUFRLEVBQUUsSUFBSTtpQkFDZixDQUFDLENBQUE7YUFDSDtTQUVGO0lBQ0gsQ0FBQztDQUVGLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vbmV3LmpzXHJcbmltcG9ydCB7IGZvcm1hdFRpbWUgfSBmcm9tICcuLi8uLi91dGlscy91dGlsJztcclxuaW1wb3J0IHsgcmFuZG9tTnVtYmVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvdXRpbCc7XHJcblxyXG5QYWdlKHtcclxuICBkYXRhOiB7XHJcbiAgICBpZDogJycsXHJcbiAgICB0aW1lOiAnJyxcclxuICAgIHRpdGxlOiAnJyxcclxuICAgIGNvbnRlbnQ6ICcnLFxyXG4gICAgbWVtb0xpc3REYXRhOiBbXSBhcyBhbnksXHJcbiAgICBpc0VkaXQ6IGZhbHNlXHJcbiAgfSxcclxuXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgLy8g6K6+572u5pel5pyfXHJcbiAgICB0aGlzLnNldERhdGEhKHtcclxuICAgICAgdGltZTogZm9ybWF0VGltZShuZXcgRGF0ZSgpLCBcIi1cIilcclxuICAgIH0pO1xyXG4gICAgLy8g6I635Y+W5pys5Zyw57yT5a2Y5aSH5b+Y5b2V5YiX6KGo5pWw5o2uXHJcbiAgICB0cnkge1xyXG4gICAgICBsZXQgbWVtb0xpc3REYXRhID0gd3guZ2V0U3RvcmFnZVN5bmMoJ21lbW9MaXN0RGF0YScpXHJcbiAgICAgIGlmIChtZW1vTGlzdERhdGEpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEhKHtcclxuICAgICAgICAgIG1lbW9MaXN0RGF0YTogbWVtb0xpc3REYXRhXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGUpIHsgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXHJcbiAgICovXHJcbiAgb25QdWxsRG93blJlZnJlc2goKSB7XHJcbiAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKHtcclxuICAgICAgc3VjY2VzcygpIHtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLmmL7npLpcclxuICAgKi9cclxuICBvblNob3coKSB7XHJcbiAgICAvLyDojrflj5bnvJbovpHnirbmgIFcclxuICAgIHRyeSB7XHJcbiAgICAgIGxldCBpc0VkaXQgPSB3eC5nZXRTdG9yYWdlU3luYygnaXNFZGl0Jyk7XHJcbiAgICAgIGxldCBtZW1vTGlzdERhdGEgPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtb0xpc3REYXRhJyk7XHJcbiAgICAgIGlmIChpc0VkaXQpIHtcclxuICAgICAgICB3eC5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoe1xyXG4gICAgICAgICAgdGl0bGU6ICflpIflv5jlvZUgLSDnvJbovpEnXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKG1lbW9MaXN0RGF0YSkge1xyXG4gICAgICAgICAgbGV0IGlkID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2lkJyk7XHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1lbW9MaXN0RGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAobWVtb0xpc3REYXRhW2ldLmlkID09IGlkKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5zZXREYXRhISh7XHJcbiAgICAgICAgICAgICAgICBpZDogaWQsXHJcbiAgICAgICAgICAgICAgICB0aW1lOiBmb3JtYXRUaW1lKG5ldyBEYXRlKCksIFwiLVwiKSxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBtZW1vTGlzdERhdGFbaV0udGl0bGUsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiBtZW1vTGlzdERhdGFbaV0uY29udGVudCxcclxuICAgICAgICAgICAgICAgIG1lbW9MaXN0RGF0YTogbWVtb0xpc3REYXRhLFxyXG4gICAgICAgICAgICAgICAgaXNFZGl0OiB0cnVlXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHd4LnNldFRhYkJhckl0ZW0oe1xyXG4gICAgICAgICAgaW5kZXg6IDEsXHJcbiAgICAgICAgICB0ZXh0OiAn57yW6L6RJyxcclxuICAgICAgICAgIGljb25QYXRoOiAnYXNzZXRzL2ltZ3MvdGFiQmFyRWRpdC5wbmcnLFxyXG4gICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2Fzc2V0cy9pbWdzL3RhYkJhckVkaXRTZWxlY3RlZC5wbmcnXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgd3guc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcclxuICAgICAgICAgIHRpdGxlOiAn5aSH5b+Y5b2VIC0g5paw5bu6J1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5zZXREYXRhISh7XHJcbiAgICAgICAgICBpZDogJycsXHJcbiAgICAgICAgICB0aW1lOiBmb3JtYXRUaW1lKG5ldyBEYXRlKCksIFwiLVwiKSxcclxuICAgICAgICAgIHRpdGxlOiAnJyxcclxuICAgICAgICAgIGNvbnRlbnQ6ICcnLFxyXG4gICAgICAgICAgbWVtb0xpc3REYXRhOiBtZW1vTGlzdERhdGEgPyBtZW1vTGlzdERhdGEgOiBbXSxcclxuICAgICAgICAgIGlzRWRpdDogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgICAgICB3eC5zZXRUYWJCYXJJdGVtKHtcclxuICAgICAgICAgIGluZGV4OiAxLFxyXG4gICAgICAgICAgdGV4dDogJ+aWsOW7uicsXHJcbiAgICAgICAgICBpY29uUGF0aDogJ2Fzc2V0cy9pbWdzL3RhYkJhck5ldy5wbmcnLFxyXG4gICAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2Fzc2V0cy9pbWdzL3RhYkJhck5ld1NlbGVjdGVkLnBuZydcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZSkgeyB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLpmpDol49cclxuICAgKi9cclxuICBvbkhpZGUoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAvLyDorr7nva7nvJbovpHnirbmgIFcclxuICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ2lzRWRpdCcsIGZhbHNlKTtcclxuICAgICAgdGhpcy5kYXRhLmlzRWRpdCA9IGZhbHNlO1xyXG4gICAgICB3eC5zZXRUYWJCYXJJdGVtKHtcclxuICAgICAgICBpbmRleDogMSxcclxuICAgICAgICB0ZXh0OiAn5paw5bu6JyxcclxuICAgICAgICBpY29uUGF0aDogJ2Fzc2V0cy9pbWdzL3RhYkJhck5ldy5wbmcnLFxyXG4gICAgICAgIHNlbGVjdGVkSWNvblBhdGg6ICdhc3NldHMvaW1ncy90YWJCYXJOZXdTZWxlY3RlZC5wbmcnXHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZSkgeyB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICog6I635Y+W5aSH5b+Y5b2V5qCH6aKYXHJcbiAgICovXHJcbiAgbWVtb1RpdGxlKGU6IGFueSkge1xyXG4gICAgdGhpcy5zZXREYXRhISh7XHJcbiAgICAgIHRpdGxlOiBlLmRldGFpbC52YWx1ZVxyXG4gICAgfSlcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDojrflj5blpIflv5jlvZXlhoXlrrlcclxuICAgKi9cclxuICBtZW1vQ29udGVudChlOiBhbnkpIHtcclxuICAgIHRoaXMuc2V0RGF0YSEoe1xyXG4gICAgICBjb250ZW50OiBlLmRldGFpbC52YWx1ZVxyXG4gICAgfSlcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDlj5bmtohcclxuICAgKi9cclxuICBjYW5jZWwoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICB0aGlzLnNldERhdGEhKHtcclxuICAgICAgICBpZDogJycsXHJcbiAgICAgICAgdGltZTogJycsXHJcbiAgICAgICAgdGl0bGU6ICcnLFxyXG4gICAgICAgIGNvbnRlbnQ6ICcnLFxyXG4gICAgICAgIG1lbW9MaXN0RGF0YTogW11cclxuICAgICAgfSk7XHJcbiAgICAgIC8vIOiuvue9rue8lui+keeKtuaAgVxyXG4gICAgICB3eC5zZXRTdG9yYWdlU3luYygnaXNFZGl0JywgZmFsc2UpO1xyXG4gICAgICB0aGlzLmRhdGEuaXNFZGl0ID0gZmFsc2U7XHJcbiAgICAgIHd4LnNldFRhYkJhckl0ZW0oe1xyXG4gICAgICAgIGluZGV4OiAxLFxyXG4gICAgICAgIHRleHQ6ICfmlrDlu7onLFxyXG4gICAgICAgIGljb25QYXRoOiAnYXNzZXRzL2ltZ3MvdGFiQmFyTmV3LnBuZycsXHJcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2Fzc2V0cy9pbWdzL3RhYkJhck5ld1NlbGVjdGVkLnBuZydcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIOWIh+aNouWIsOmmlumhtVxyXG4gICAgICB3eC5zd2l0Y2hUYWIoe1xyXG4gICAgICAgIHVybDogJy9wYWdlcy9pbmRleC9pbmRleCdcclxuICAgICAgfSlcclxuICAgIH0gY2F0Y2ggKGUpIHsgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIOWIoOmZpOaPkOekulxyXG4gICAqL1xyXG4gIGRlbGV0ZU1vZGFsKCkge1xyXG4gICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgd3guc2hvd01vZGFsKHtcclxuICAgICAgdGl0bGU6ICfliKDpmaTmj5DnpLonLFxyXG4gICAgICBjb250ZW50OiAn5piv5ZCm56Gu5a6a5Yig6Zmk6K+l5aSH5b+Y5b2V77yBJyxcclxuICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcclxuICAgICAgICAgIHRoYXQuZGVsZXRlKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIOWIoOmZpFxyXG4gICAqL1xyXG4gIGRlbGV0ZSgpIHtcclxuICAgIGlmICh0aGlzLmRhdGEuaWQgIT0gXCJcIikge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGlmICh0aGlzLmRhdGEubWVtb0xpc3REYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgIGxldCBpbmRleDogbnVtYmVyID0gdGhpcy5kYXRhLm1lbW9MaXN0RGF0YS5maW5kSW5kZXgoKGl0ZW06IGFueSkgPT4gaXRlbS5pZCA9PSB0aGlzLmRhdGEuaWQpO1xyXG4gICAgICAgICAgLy/liKDpmaTmjIflrprkuIvmoIfnmoTlgLxcclxuICAgICAgICAgIHRoaXMuZGF0YS5tZW1vTGlzdERhdGEuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgIC8v5byC5q2l5pu05paw5YiX6KGo57yT5a2YXHJcbiAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnbWVtb0xpc3REYXRhJywgdGhpcy5kYXRhLm1lbW9MaXN0RGF0YSk7XHJcbiAgICAgICAgICBpZiAodGhpcy5kYXRhLm1lbW9MaXN0RGF0YS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICB3eC5jbGVhclN0b3JhZ2VTeW5jKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ+WIoOmZpOaIkOWKnycsXHJcbiAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcclxuICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgLy8g5Yig6Zmk5ZCO5Yi35paw6aG16Z2iXHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgd3guc3dpdGNoVGFiKHtcclxuICAgICAgICAgICAgICB1cmw6ICcvcGFnZXMvaW5kZXgvaW5kZXgnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9LCA4MDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH0gY2F0Y2ggKGUpIHsgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIOS/neWtmFxyXG4gICAqL1xyXG4gIHNhdmUoKSB7XHJcbiAgICBsZXQgaWQgPSB0aGlzLmRhdGEuaWQgPyB0aGlzLmRhdGEuaWQgOiByYW5kb21OdW1iZXIoKTtcclxuICAgIGxldCB0aW1lID0gdGhpcy5kYXRhLnRpbWU7XHJcbiAgICBsZXQgdGl0bGUgPSB0aGlzLmRhdGEudGl0bGU7XHJcbiAgICBsZXQgY29udGVudCA9IHRoaXMuZGF0YS5jb250ZW50O1xyXG4gICAgaWYgKHRpdGxlID09ICcnKSB7XHJcbiAgICAgIC8vIOaPkOekuui+k+WFpeagh+mimFxyXG4gICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgIHRpdGxlOiAn6K+36L6T5YWl5qCH6aKYJyxcclxuICAgICAgICBpY29uOiAnbm9uZScsXHJcbiAgICAgICAgZHVyYXRpb246IDEwMDBcclxuICAgICAgfSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0aGlzLmRhdGEuaWQgIT0gJycpIHtcclxuICAgICAgICAvLyDkv67mlLnlpIflv5jlvZXliJfooajmlbDmja5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZGF0YS5tZW1vTGlzdERhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIGlmICh0aGlzLmRhdGEubWVtb0xpc3REYXRhW2ldLmlkID09IGlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5tZW1vTGlzdERhdGFbaV0uaWQgPSBpZDtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLm1lbW9MaXN0RGF0YVtpXS50aW1lID0gdGltZTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLm1lbW9MaXN0RGF0YVtpXS50aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEubWVtb0xpc3REYXRhW2ldLmNvbnRlbnQgPSBjb250ZW50O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8g6L+95Yqg5aSH5b+Y5b2V5YiX6KGo5pWw5o2uXHJcbiAgICAgICAgdGhpcy5kYXRhLm1lbW9MaXN0RGF0YS51bnNoaWZ0KHtcclxuICAgICAgICAgICdpZCc6IGlkLFxyXG4gICAgICAgICAgXCJ0aW1lXCI6IHRpbWUsXHJcbiAgICAgICAgICBcInRpdGxlXCI6IHRpdGxlLFxyXG4gICAgICAgICAgXCJjb250ZW50XCI6IGNvbnRlbnRcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgLy8g6K6+572u5pys5Zyw57yT5a2Y5aSH5b+Y5b2V5YiX6KGo5pWw5o2uXHJcbiAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ21lbW9MaXN0RGF0YScsIHRoaXMuZGF0YS5tZW1vTGlzdERhdGEpO1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogJ+S/neWtmOaIkOWKnycsXHJcbiAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXHJcbiAgICAgICAgICBkdXJhdGlvbjogMTAwMFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyDliIfmjaLliLDpppbpobVcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHd4LnN3aXRjaFRhYih7XHJcbiAgICAgICAgICAgIHVybDogJy9wYWdlcy9pbmRleC9pbmRleCdcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSwgODAwKTtcclxuXHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgdGl0bGU6IFwi5L+d5a2Y5aSx6LSl77yM6K+356iN5ZCO5YaN6K+V77yBXCIsXHJcbiAgICAgICAgICBpY29uOiAnbm9uZScsXHJcbiAgICAgICAgICBkdXJhdGlvbjogMjAwMFxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgfVxyXG5cclxufSk7XHJcbiJdfQ==