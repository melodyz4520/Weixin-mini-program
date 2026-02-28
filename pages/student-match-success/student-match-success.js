Page({
  data: {
    tutorName: 'Oski Bear',
    courseName: 'CS 61A',
    courseTitle: '计算机程序的构造和解释',
    rating: 4.9,
    sessionCount: 124,
    dateTime: '10月24日 (周四) ・下午4:00',
    duration: '1小时课程',
    location: '待确认'
  },

  onLoad(options) {
    const tutorName = options.tutorName ? decodeURIComponent(options.tutorName) : 'Oski Bear';
    const date = options.date || '10月24日';
    const week = options.week ? decodeURIComponent(options.week) : '周四';
    const time = options.time ? decodeURIComponent(options.time) : '下午4:00';
    this.setData({
      tutorName,
      dateTime: date + ' (' + week + ') ・' + time
    });
  },

  onBack() {
    wx.reLaunch({ url: '/pages/student-discover/student-discover' });
  },

  onHonorCode() {
    wx.navigateTo({ url: '/pages/privacy/privacy' });
  }
});
