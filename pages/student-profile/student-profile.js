Page({
  onBack() {
    wx.navigateBack();
  },
  onDiscover() {
    wx.navigateTo({ url: '/pages/student-discover/student-discover' });
  }
});
