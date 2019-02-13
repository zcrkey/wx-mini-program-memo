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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EseUNBQThDO0FBQzlDLHlDQUFnRDtBQUVoRCxJQUFJLENBQUM7SUFDSCxJQUFJLEVBQUU7UUFDSixFQUFFLEVBQUUsRUFBRTtRQUNOLElBQUksRUFBRSxFQUFFO1FBQ1IsS0FBSyxFQUFFLEVBQUU7UUFDVCxPQUFPLEVBQUUsRUFBRTtRQUNYLFlBQVksRUFBRSxFQUFTO1FBQ3ZCLE1BQU0sRUFBRSxLQUFLO0tBQ2Q7SUFFRCxNQUFNO1FBRUosSUFBSSxDQUFDLE9BQVEsQ0FBQztZQUNaLElBQUksRUFBRSxpQkFBVSxDQUFDLElBQUksSUFBSSxFQUFFLEVBQUUsR0FBRyxDQUFDO1NBQ2xDLENBQUMsQ0FBQztRQUVILElBQUk7WUFDRixJQUFJLFlBQVksR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFBO1lBQ3BELElBQUksWUFBWSxFQUFFO2dCQUNoQixJQUFJLENBQUMsT0FBUSxDQUFDO29CQUNaLFlBQVksRUFBRSxZQUFZO2lCQUMzQixDQUFDLENBQUM7YUFDSjtTQUNGO1FBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRztJQUNqQixDQUFDO0lBS0QsaUJBQWlCO1FBQ2YsRUFBRSxDQUFDLG1CQUFtQixDQUFDO1lBQ3JCLE9BQU87WUFDUCxDQUFDO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUtELE1BQU07UUFFSixJQUFJO1lBQ0YsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6QyxJQUFJLFlBQVksR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3JELElBQUksTUFBTSxFQUFFO2dCQUNWLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztvQkFDdkIsS0FBSyxFQUFFLFVBQVU7aUJBQ2xCLENBQUMsQ0FBQztnQkFDSCxJQUFJLFlBQVksRUFB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cUJBQzFCLENBQUMsQ0FBQTtnQkFDSixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFFVDtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNWLEVBQUUsQ0FBQyxTQUFTLENBQUM7b0JBQ1gsS0FBSyxFQUFFLGFBQWE7b0JBQ3BCLElBQUksRUFBRSxNQUFNO29CQUNaLFFBQVEsRUFBRSxJQUFJO2lCQUNmLENBQUMsQ0FBQTthQUNIO1NBRUY7SUFDSCxDQUFDO0NBRUYsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy9uZXcuanNcclxuaW1wb3J0IHsgZm9ybWF0VGltZSB9IGZyb20gJy4uLy4uL3V0aWxzL3V0aWwnO1xyXG5pbXBvcnQgeyByYW5kb21OdW1iZXIgfSBmcm9tICcuLi8uLi91dGlscy91dGlsJztcclxuXHJcblBhZ2Uoe1xyXG4gIGRhdGE6IHtcclxuICAgIGlkOiAnJyxcclxuICAgIHRpbWU6ICcnLFxyXG4gICAgdGl0bGU6ICcnLFxyXG4gICAgY29udGVudDogJycsXHJcbiAgICBtZW1vTGlzdERhdGE6IFtdIGFzIGFueSxcclxuICAgIGlzRWRpdDogZmFsc2VcclxuICB9LFxyXG5cclxuICBvbkxvYWQoKSB7XHJcbiAgICAvLyDorr7nva7ml6XmnJ9cclxuICAgIHRoaXMuc2V0RGF0YSEoe1xyXG4gICAgICB0aW1lOiBmb3JtYXRUaW1lKG5ldyBEYXRlKCksIFwiLVwiKVxyXG4gICAgfSk7XHJcbiAgICAvLyDojrflj5bmnKzlnLDnvJPlrZjlpIflv5jlvZXliJfooajmlbDmja5cclxuICAgIHRyeSB7XHJcbiAgICAgIGxldCBtZW1vTGlzdERhdGEgPSB3eC5nZXRTdG9yYWdlU3luYygnbWVtb0xpc3REYXRhJylcclxuICAgICAgaWYgKG1lbW9MaXN0RGF0YSkge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSEoe1xyXG4gICAgICAgICAgbWVtb0xpc3REYXRhOiBtZW1vTGlzdERhdGFcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZSkgeyB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICog6aG16Z2i55u45YWz5LqL5Lu25aSE55CG5Ye95pWwLS3nm5HlkKznlKjmiLfkuIvmi4nliqjkvZxcclxuICAgKi9cclxuICBvblB1bGxEb3duUmVmcmVzaCgpIHtcclxuICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goe1xyXG4gICAgICBzdWNjZXNzKCkge1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouaYvuekulxyXG4gICAqL1xyXG4gIG9uU2hvdygpIHtcclxuICAgIC8vIOiOt+WPlue8lui+keeKtuaAgVxyXG4gICAgdHJ5IHtcclxuICAgICAgbGV0IGlzRWRpdCA9IHd4LmdldFN0b3JhZ2VTeW5jKCdpc0VkaXQnKTtcclxuICAgICAgbGV0IG1lbW9MaXN0RGF0YSA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1vTGlzdERhdGEnKTtcclxuICAgICAgaWYgKGlzRWRpdCkge1xyXG4gICAgICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XHJcbiAgICAgICAgICB0aXRsZTogJ+Wkh+W/mOW9lSAtIOe8lui+kSdcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAobWVtb0xpc3REYXRhKSB7XHJcbiAgICAgICAgICBsZXQgaWQgPSB3eC5nZXRTdG9yYWdlU3luYygnaWQnKTtcclxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWVtb0xpc3REYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChtZW1vTGlzdERhdGFbaV0uaWQgPT0gaWQpIHtcclxuICAgICAgICAgICAgICB0aGlzLnNldERhdGEhKHtcclxuICAgICAgICAgICAgICAgIGlkOiBpZCxcclxuICAgICAgICAgICAgICAgIHRpbWU6IGZvcm1hdFRpbWUobmV3IERhdGUoKSwgXCItXCIpLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IG1lbW9MaXN0RGF0YVtpXS50aXRsZSxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IG1lbW9MaXN0RGF0YVtpXS5jb250ZW50LFxyXG4gICAgICAgICAgICAgICAgbWVtb0xpc3REYXRhOiBtZW1vTGlzdERhdGEsXHJcbiAgICAgICAgICAgICAgICBpc0VkaXQ6IHRydWVcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgd3guc2V0VGFiQmFySXRlbSh7XHJcbiAgICAgICAgICBpbmRleDogMSxcclxuICAgICAgICAgIHRleHQ6ICfnvJbovpEnLFxyXG4gICAgICAgICAgaWNvblBhdGg6ICdhc3NldHMvaW1ncy90YWJCYXJFZGl0LnBuZycsXHJcbiAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnYXNzZXRzL2ltZ3MvdGFiQmFyRWRpdFNlbGVjdGVkLnBuZydcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB3eC5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoe1xyXG4gICAgICAgICAgdGl0bGU6ICflpIflv5jlvZUgLSDmlrDlu7onXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLnNldERhdGEhKHtcclxuICAgICAgICAgIGlkOiAnJyxcclxuICAgICAgICAgIHRpbWU6IGZvcm1hdFRpbWUobmV3IERhdGUoKSwgXCItXCIpLFxyXG4gICAgICAgICAgdGl0bGU6ICcnLFxyXG4gICAgICAgICAgY29udGVudDogJycsXHJcbiAgICAgICAgICBtZW1vTGlzdERhdGE6IG1lbW9MaXN0RGF0YSA/IG1lbW9MaXN0RGF0YSA6IFtdLFxyXG4gICAgICAgICAgaXNFZGl0OiBmYWxzZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHd4LnNldFRhYkJhckl0ZW0oe1xyXG4gICAgICAgICAgaW5kZXg6IDEsXHJcbiAgICAgICAgICB0ZXh0OiAn5paw5bu6JyxcclxuICAgICAgICAgIGljb25QYXRoOiAnYXNzZXRzL2ltZ3MvdGFiQmFyTmV3LnBuZycsXHJcbiAgICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnYXNzZXRzL2ltZ3MvdGFiQmFyTmV3U2VsZWN0ZWQucG5nJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlKSB7IH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdoumakOiXj1xyXG4gICAqL1xyXG4gIG9uSGlkZSgpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHd4LnNldFRhYkJhckl0ZW0oe1xyXG4gICAgICAgIGluZGV4OiAxLFxyXG4gICAgICAgIHRleHQ6ICfmlrDlu7onLFxyXG4gICAgICAgIGljb25QYXRoOiAnYXNzZXRzL2ltZ3MvdGFiQmFyTmV3LnBuZycsXHJcbiAgICAgICAgc2VsZWN0ZWRJY29uUGF0aDogJ2Fzc2V0cy9pbWdzL3RhYkJhck5ld1NlbGVjdGVkLnBuZydcclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlKSB7IH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDojrflj5blpIflv5jlvZXmoIfpophcclxuICAgKi9cclxuICBtZW1vVGl0bGUoZTogYW55KSB7XHJcbiAgICB0aGlzLnNldERhdGEhKHtcclxuICAgICAgdGl0bGU6IGUuZGV0YWlsLnZhbHVlXHJcbiAgICB9KVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIOiOt+WPluWkh+W/mOW9leWGheWuuVxyXG4gICAqL1xyXG4gIG1lbW9Db250ZW50KGU6IGFueSkge1xyXG4gICAgdGhpcy5zZXREYXRhISh7XHJcbiAgICAgIGNvbnRlbnQ6IGUuZGV0YWlsLnZhbHVlXHJcbiAgICB9KVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIOWPlua2iFxyXG4gICAqL1xyXG4gIGNhbmNlbCgpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YSEoe1xyXG4gICAgICAgIGlkOiAnJyxcclxuICAgICAgICB0aW1lOiAnJyxcclxuICAgICAgICB0aXRsZTogJycsXHJcbiAgICAgICAgY29udGVudDogJycsXHJcbiAgICAgICAgbWVtb0xpc3REYXRhOiBbXVxyXG4gICAgICB9KTtcclxuICAgICAgLy8g6K6+572u57yW6L6R54q25oCBXHJcbiAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdpc0VkaXQnLCBmYWxzZSk7XHJcbiAgICAgIHRoaXMuZGF0YS5pc0VkaXQgPSBmYWxzZTtcclxuICAgICAgd3guc2V0VGFiQmFySXRlbSh7XHJcbiAgICAgICAgaW5kZXg6IDEsXHJcbiAgICAgICAgdGV4dDogJ+aWsOW7uicsXHJcbiAgICAgICAgaWNvblBhdGg6ICdhc3NldHMvaW1ncy90YWJCYXJOZXcucG5nJyxcclxuICAgICAgICBzZWxlY3RlZEljb25QYXRoOiAnYXNzZXRzL2ltZ3MvdGFiQmFyTmV3U2VsZWN0ZWQucG5nJ1xyXG4gICAgICB9KTtcclxuICAgICAgLy8g5YiH5o2i5Yiw6aaW6aG1XHJcbiAgICAgIHd4LnN3aXRjaFRhYih7XHJcbiAgICAgICAgdXJsOiAnL3BhZ2VzL2luZGV4L2luZGV4J1xyXG4gICAgICB9KVxyXG4gICAgfSBjYXRjaCAoZSkgeyB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICog5Yig6Zmk5o+Q56S6XHJcbiAgICovXHJcbiAgZGVsZXRlTW9kYWwoKSB7XHJcbiAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICB0aXRsZTogJ+WIoOmZpOaPkOekuicsXHJcbiAgICAgIGNvbnRlbnQ6ICfmmK/lkKbnoa7lrprliKDpmaTor6XlpIflv5jlvZXvvIEnLFxyXG4gICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgIGlmIChyZXMuY29uZmlybSkge1xyXG4gICAgICAgICAgdGhhdC5kZWxldGUoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICog5Yig6ZmkXHJcbiAgICovXHJcbiAgZGVsZXRlKCkge1xyXG4gICAgaWYgKHRoaXMuZGF0YS5pZCAhPSBcIlwiKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5tZW1vTGlzdERhdGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgbGV0IGluZGV4OiBudW1iZXIgPSB0aGlzLmRhdGEubWVtb0xpc3REYXRhLmZpbmRJbmRleCgoaXRlbTogYW55KSA9PiBpdGVtLmlkID09IHRoaXMuZGF0YS5pZCk7XHJcbiAgICAgICAgICAvL+WIoOmZpOaMh+WumuS4i+agh+eahOWAvFxyXG4gICAgICAgICAgdGhpcy5kYXRhLm1lbW9MaXN0RGF0YS5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgLy/lvILmraXmm7TmlrDliJfooajnvJPlrZhcclxuICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdtZW1vTGlzdERhdGEnLCB0aGlzLmRhdGEubWVtb0xpc3REYXRhKTtcclxuICAgICAgICAgIGlmICh0aGlzLmRhdGEubWVtb0xpc3REYXRhLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHd4LmNsZWFyU3RvcmFnZVN5bmMoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAn5Yig6Zmk5oiQ5YqfJyxcclxuICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICAvLyDliKDpmaTlkI7liLfmlrDpobXpnaJcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB3eC5zd2l0Y2hUYWIoe1xyXG4gICAgICAgICAgICAgIHVybDogJy9wYWdlcy9pbmRleC9pbmRleCdcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH0sIDgwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfSBjYXRjaCAoZSkgeyB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICog5L+d5a2YXHJcbiAgICovXHJcbiAgc2F2ZSgpIHtcclxuICAgIGxldCBpZCA9IHRoaXMuZGF0YS5pZCA/IHRoaXMuZGF0YS5pZCA6IHJhbmRvbU51bWJlcigpO1xyXG4gICAgbGV0IHRpbWUgPSB0aGlzLmRhdGEudGltZTtcclxuICAgIGxldCB0aXRsZSA9IHRoaXMuZGF0YS50aXRsZTtcclxuICAgIGxldCBjb250ZW50ID0gdGhpcy5kYXRhLmNvbnRlbnQ7XHJcbiAgICBpZiAodGl0bGUgPT0gJycpIHtcclxuICAgICAgLy8g5o+Q56S66L6T5YWl5qCH6aKYXHJcbiAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgdGl0bGU6ICfor7fovpPlhaXmoIfpopgnLFxyXG4gICAgICAgIGljb246ICdub25lJyxcclxuICAgICAgICBkdXJhdGlvbjogMTAwMFxyXG4gICAgICB9KVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMuZGF0YS5pZCAhPSAnJykge1xyXG4gICAgICAgIC8vIOS/ruaUueWkh+W/mOW9leWIl+ihqOaVsOaNrlxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kYXRhLm1lbW9MaXN0RGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgaWYgKHRoaXMuZGF0YS5tZW1vTGlzdERhdGFbaV0uaWQgPT0gaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLm1lbW9MaXN0RGF0YVtpXS5pZCA9IGlkO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEubWVtb0xpc3REYXRhW2ldLnRpbWUgPSB0aW1lO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEubWVtb0xpc3REYXRhW2ldLnRpdGxlID0gdGl0bGU7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5tZW1vTGlzdERhdGFbaV0uY29udGVudCA9IGNvbnRlbnQ7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyDov73liqDlpIflv5jlvZXliJfooajmlbDmja5cclxuICAgICAgICB0aGlzLmRhdGEubWVtb0xpc3REYXRhLnVuc2hpZnQoe1xyXG4gICAgICAgICAgJ2lkJzogaWQsXHJcbiAgICAgICAgICBcInRpbWVcIjogdGltZSxcclxuICAgICAgICAgIFwidGl0bGVcIjogdGl0bGUsXHJcbiAgICAgICAgICBcImNvbnRlbnRcIjogY29udGVudFxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgICAgdHJ5IHtcclxuICAgICAgICAvLyDorr7nva7mnKzlnLDnvJPlrZjlpIflv5jlvZXliJfooajmlbDmja5cclxuICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnbWVtb0xpc3REYXRhJywgdGhpcy5kYXRhLm1lbW9MaXN0RGF0YSk7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiAn5L+d5a2Y5oiQ5YqfJyxcclxuICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcclxuICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIOWIh+aNouWIsOmmlumhtVxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgd3guc3dpdGNoVGFiKHtcclxuICAgICAgICAgICAgdXJsOiAnL3BhZ2VzL2luZGV4L2luZGV4J1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LCA4MDApO1xyXG5cclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICB0aXRsZTogXCLkv53lrZjlpLHotKXvvIzor7fnqI3lkI7lho3or5XvvIFcIixcclxuICAgICAgICAgIGljb246ICdub25lJyxcclxuICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuICB9XHJcblxyXG59KTtcclxuIl19