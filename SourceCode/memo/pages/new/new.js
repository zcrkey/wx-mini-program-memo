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
            if (isEdit) {
                wx.setNavigationBarTitle({
                    title: '备忘录 - 编辑'
                });
                var memoListData = wx.getStorageSync('memoListData');
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
                    memoListData: []
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EseUNBQThDO0FBQzlDLHlDQUFnRDtBQUVoRCxJQUFJLENBQUM7SUFDSCxJQUFJLEVBQUU7UUFDSixFQUFFLEVBQUUsRUFBRTtRQUNOLElBQUksRUFBRSxFQUFFO1FBQ1IsS0FBSyxFQUFFLEVBQUU7UUFDVCxPQUFPLEVBQUUsRUFBRTtRQUNYLFlBQVksRUFBRSxFQUFTO0tBQ3hCO0lBRUQsTUFBTTtRQUVKLElBQUksQ0FBQyxPQUFRLENBQUM7WUFDWixJQUFJLEVBQUUsaUJBQVUsQ0FBQyxJQUFJLElBQUksRUFBRSxFQUFFLEdBQUcsQ0FBQztTQUNsQyxDQUFDLENBQUM7UUFFSCxJQUFJO1lBQ0YsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQTtZQUNwRCxJQUFJLFlBQVksRUFBRTtnQkFDaEIsSUFBSSxDQUFDLE9BQVEsQ0FBQztvQkFDWixZQUFZLEVBQUUsWUFBWTtpQkFDM0IsQ0FBQyxDQUFDO2FBQ0o7U0FDRjtRQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUc7SUFDakIsQ0FBQztJQUtELE1BQU07UUFFSixJQUFJO1lBQ0YsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUN4QyxJQUFJLE1BQU0sRUFBRTtnQkFDVixFQUFFLENBQUMscUJBQXFCLENBQUM7b0JBQ3ZCLEtBQUssRUFBRSxVQUFVO2lCQUNsQixDQUFDLENBQUE7Z0JBQ0YsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQTtnQkFDcEQsSUFBSSxZQUFZLEVBQUU7b0JBQ2hCLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2pDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FB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QUUsQ0FBQzt3QkFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzt3QkFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQzt3QkFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzt3QkFDNUMsTUFBTTtxQkFDUDtpQkFDRjthQUNGO2lCQUFNO2dCQUVMLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQztvQkFDN0IsSUFBSSxFQUFFLEVBQUU7b0JBQ1IsTUFBTSxFQUFFLElBQUk7b0JBQ1osT0FBTyxFQUFFLEtBQUs7b0JBQ2QsU0FBUyxFQUFFLE9BQU87aUJBQ25CLENBQUMsQ0FBQTthQUNIO1lBQ0QsSUFBSTtnQkFFRixFQUFFLENBQUMsY0FBYyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO2FBQzFEO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsRUFBRSxDQUFDLFNBQVMsQ0FBQztvQkFDWCxLQUFLLEVBQUUsYUFBYTtvQkFDcEIsSUFBSSxFQUFFLE1BQU07b0JBQ1osUUFBUSxFQUFFLElBQUk7aUJBQ2YsQ0FBQyxDQUFBO2FBQ0g7WUFFRCxFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNYLEdBQUcsRUFBRSxvQkFBb0I7YUFDMUIsQ0FBQyxDQUFBO1NBQ0g7SUFDSCxDQUFDO0NBRUYsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy9uZXcuanNcclxuaW1wb3J0IHsgZm9ybWF0VGltZSB9IGZyb20gJy4uLy4uL3V0aWxzL3V0aWwnO1xyXG5pbXBvcnQgeyByYW5kb21OdW1iZXIgfSBmcm9tICcuLi8uLi91dGlscy91dGlsJztcclxuXHJcblBhZ2Uoe1xyXG4gIGRhdGE6IHtcclxuICAgIGlkOiAnJyxcclxuICAgIHRpbWU6ICcnLFxyXG4gICAgdGl0bGU6ICcnLFxyXG4gICAgY29udGVudDogJycsXHJcbiAgICBtZW1vTGlzdERhdGE6IFtdIGFzIGFueVxyXG4gIH0sXHJcblxyXG4gIG9uTG9hZCgpIHtcclxuICAgIC8vIOiuvue9ruaXpeacn1xyXG4gICAgdGhpcy5zZXREYXRhISh7XHJcbiAgICAgIHRpbWU6IGZvcm1hdFRpbWUobmV3IERhdGUoKSwgXCItXCIpXHJcbiAgICB9KTtcclxuICAgIC8vIOiOt+WPluacrOWcsOe8k+WtmOWkh+W/mOW9leWIl+ihqOaVsOaNrlxyXG4gICAgdHJ5IHtcclxuICAgICAgbGV0IG1lbW9MaXN0RGF0YSA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1vTGlzdERhdGEnKVxyXG4gICAgICBpZiAobWVtb0xpc3REYXRhKSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhISh7XHJcbiAgICAgICAgICBtZW1vTGlzdERhdGE6IG1lbW9MaXN0RGF0YVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlKSB7IH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouaYvuekulxyXG4gICAqL1xyXG4gIG9uU2hvdygpIHtcclxuICAgIC8vIOiOt+WPlue8lui+keeKtuaAgVxyXG4gICAgdHJ5IHtcclxuICAgICAgbGV0IGlzRWRpdCA9IHd4LmdldFN0b3JhZ2VTeW5jKCdpc0VkaXQnKVxyXG4gICAgICBpZiAoaXNFZGl0KSB7XHJcbiAgICAgICAgd3guc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcclxuICAgICAgICAgIHRpdGxlOiAn5aSH5b+Y5b2VIC0g57yW6L6RJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgbGV0IG1lbW9MaXN0RGF0YSA9IHd4LmdldFN0b3JhZ2VTeW5jKCdtZW1vTGlzdERhdGEnKVxyXG4gICAgICAgIGlmIChtZW1vTGlzdERhdGEpIHtcclxuICAgICAgICAgIGxldCBpZCA9IHd4LmdldFN0b3JhZ2VTeW5jKCdpZCcpO1xyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZW1vTGlzdERhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKG1lbW9MaXN0RGF0YVtpXS5pZCA9PSBpZCkge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibWVtb0xpc3REYXRhW2ldLnRpdGxlXCIgKyBtZW1vTGlzdERhdGFbaV0udGl0bGUpO1xyXG4gICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSEoe1xyXG4gICAgICAgICAgICAgICAgaWQ6IGlkLFxyXG4gICAgICAgICAgICAgICAgdGltZTogZm9ybWF0VGltZShuZXcgRGF0ZSgpLCBcIi1cIiksXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogbWVtb0xpc3REYXRhW2ldLnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogbWVtb0xpc3REYXRhW2ldLmNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICBtZW1vTGlzdERhdGE6IG1lbW9MaXN0RGF0YVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XHJcbiAgICAgICAgICB0aXRsZTogJ+Wkh+W/mOW9lSAtIOaWsOW7uidcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuc2V0RGF0YSEoe1xyXG4gICAgICAgICAgaWQ6ICcnLFxyXG4gICAgICAgICAgdGltZTogZm9ybWF0VGltZShuZXcgRGF0ZSgpLCBcIi1cIiksXHJcbiAgICAgICAgICB0aXRsZTogJycsXHJcbiAgICAgICAgICBjb250ZW50OiAnJyxcclxuICAgICAgICAgIG1lbW9MaXN0RGF0YTogW11cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZSkgeyB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLpmpDol49cclxuICAgKi9cclxuICBvbkhpZGUoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAvLyDorr7nva7nvJbovpHnirbmgIFcclxuICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ2lzRWRpdCcsIGZhbHNlKVxyXG4gICAgfSBjYXRjaCAoZSkgeyB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICog6I635Y+W5aSH5b+Y5b2V5qCH6aKYXHJcbiAgICovXHJcbiAgbWVtb1RpdGxlKGU6IGFueSkge1xyXG4gICAgdGhpcy5zZXREYXRhISh7XHJcbiAgICAgIHRpdGxlOiBlLmRldGFpbC52YWx1ZVxyXG4gICAgfSlcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDojrflj5blpIflv5jlvZXlhoXlrrlcclxuICAgKi9cclxuICBtZW1vQ29udGVudChlOiBhbnkpIHtcclxuICAgIHRoaXMuc2V0RGF0YSEoe1xyXG4gICAgICBjb250ZW50OiBlLmRldGFpbC52YWx1ZVxyXG4gICAgfSlcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiDkv53lrZhcclxuICAgKi9cclxuICBzYXZlKCkge1xyXG4gICAgbGV0IGlkID0gdGhpcy5kYXRhLmlkID8gdGhpcy5kYXRhLmlkIDogcmFuZG9tTnVtYmVyKCk7XHJcbiAgICBsZXQgdGltZSA9IHRoaXMuZGF0YS50aW1lO1xyXG4gICAgbGV0IHRpdGxlID0gdGhpcy5kYXRhLnRpdGxlO1xyXG4gICAgbGV0IGNvbnRlbnQgPSB0aGlzLmRhdGEuY29udGVudDtcclxuICAgIGlmICh0aXRsZSA9PSAnJykge1xyXG4gICAgICAvLyDmj5DnpLrovpPlhaXmoIfpophcclxuICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICB0aXRsZTogJ+ivt+i+k+WFpeagh+mimCcsXHJcbiAgICAgICAgaWNvbjogJ25vbmUnLFxyXG4gICAgICAgIGR1cmF0aW9uOiAxMDAwXHJcbiAgICAgIH0pXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5kYXRhLmlkICE9ICcnKSB7XHJcbiAgICAgICAgLy8g5L+u5pS55aSH5b+Y5b2V5YiX6KGo5pWw5o2uXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRhdGEubWVtb0xpc3REYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5kYXRhLm1lbW9MaXN0RGF0YVtpXS5pZCA9PSBpZCkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEubWVtb0xpc3REYXRhW2ldLmlkID0gaWQ7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5tZW1vTGlzdERhdGFbaV0udGltZSA9IHRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5tZW1vTGlzdERhdGFbaV0udGl0bGUgPSB0aXRsZTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLm1lbW9MaXN0RGF0YVtpXS5jb250ZW50ID0gY29udGVudDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIOi/veWKoOWkh+W/mOW9leWIl+ihqOaVsOaNrlxyXG4gICAgICAgIHRoaXMuZGF0YS5tZW1vTGlzdERhdGEudW5zaGlmdCh7XHJcbiAgICAgICAgICAnaWQnOiBpZCxcclxuICAgICAgICAgIFwidGltZVwiOiB0aW1lLFxyXG4gICAgICAgICAgXCJ0aXRsZVwiOiB0aXRsZSxcclxuICAgICAgICAgIFwiY29udGVudFwiOiBjb250ZW50XHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIC8vIOiuvue9ruacrOWcsOe8k+WtmOWkh+W/mOW9leWIl+ihqOaVsOaNrlxyXG4gICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdtZW1vTGlzdERhdGEnLCB0aGlzLmRhdGEubWVtb0xpc3REYXRhKVxyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiBcIuS/neWtmOWksei0pe+8jOivt+eojeWQjuWGjeivle+8gVwiLFxyXG4gICAgICAgICAgaWNvbjogJ25vbmUnLFxyXG4gICAgICAgICAgZHVyYXRpb246IDIwMDBcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICAgIC8vIOWIh+aNouWIsOmmlumhtVxyXG4gICAgICB3eC5zd2l0Y2hUYWIoe1xyXG4gICAgICAgIHVybDogJy9wYWdlcy9pbmRleC9pbmRleCdcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcblxyXG59KTtcclxuIl19