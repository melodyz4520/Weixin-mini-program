Page({
  onBack() {
    wx.reLaunch({ url: '/pages/onboarding/onboarding?tutorSubmitted=1' });
  }
});
