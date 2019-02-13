"use strict";
Page({
    data: {},
    onPullDownRefresh: function () {
        wx.stopPullDownRefresh({
            success: function () {
            }
        });
    },
    onShow: function () {
        try {
            wx.setNavigationBarTitle({
                title: '备忘录 - 关于'
            });
            wx.setStorageSync('isEdit', false);
        }
        catch (e) { }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJvdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhYm91dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsSUFBSSxDQUFDO0lBRUgsSUFBSSxFQUFFLEVBQ0w7SUFLRCxpQkFBaUI7UUFDZixFQUFFLENBQUMsbUJBQW1CLENBQUM7WUFDckIsT0FBTztZQUNQLENBQUM7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBS0QsTUFBTTtRQUNKLElBQUk7WUFDRixFQUFFLENBQUMscUJBQXFCLENBQUM7Z0JBQ3ZCLEtBQUssRUFBRSxVQUFVO2FBQ2xCLENBQUMsQ0FBQTtZQUVGLEVBQUUsQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFBO1NBQ25DO1FBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRztJQUNqQixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy9hYm91dC5qc1xyXG5QYWdlKHtcclxuXHJcbiAgZGF0YToge1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIOmhtemdouebuOWFs+S6i+S7tuWkhOeQhuWHveaVsC0t55uR5ZCs55So5oi35LiL5ouJ5Yqo5L2cXHJcbiAgICovXHJcbiAgb25QdWxsRG93blJlZnJlc2goKSB7XHJcbiAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKHtcclxuICAgICAgc3VjY2VzcygpIHtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLmmL7npLpcclxuICAgKi9cclxuICBvblNob3coKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICB3eC5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoe1xyXG4gICAgICAgIHRpdGxlOiAn5aSH5b+Y5b2VIC0g5YWz5LqOJ1xyXG4gICAgICB9KVxyXG4gICAgICAvLyDorr7nva7nvJbovpHnirbmgIFcclxuICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ2lzRWRpdCcsIGZhbHNlKVxyXG4gICAgfSBjYXRjaCAoZSkgeyB9XHJcbiAgfVxyXG59KSJdfQ==