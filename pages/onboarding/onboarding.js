// pages/onboarding/onboarding.js
Page({
  data: {
    selectedRole: null,
    tutorSubmitted: false
  },

  onLoad(options) {
    this.setData({ tutorSubmitted: options.tutorSubmitted === '1' });
  },

  selectTutor() {
    this.setData({ selectedRole: 'tutor' });
    wx.navigateTo({ url: '/pages/tutor-certification/tutor-certification' });
  },

  selectStudent() {
    this.setData({ selectedRole: 'student' });
    wx.navigateTo({ url: '/pages/student-discover/student-discover' });
  },

  onWechatLogin() {
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        console.log('用户信息', res.userInfo);
        // TODO: 结合 selectedRole 完成注册/登录
      },
      fail: (err) => {
        console.error(err);
      }
    });
  },

  onPrivacyTap() {
    wx.navigateTo({
      url: '/pages/privacy/privacy' // 需后续创建隐私条款页
    });
  }
});
