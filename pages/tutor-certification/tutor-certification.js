// pages/tutor-certification/tutor-certification.js
const COURSE_LIST = [
  'CS 61A', 'CS 61B', 'CS 70', 'EE 16A', 'EE 16B',
  'Math 53', 'Math 54', 'Physics 7A', 'Data 8'
];
const WEEKDAYS = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
const TIME_SLOTS = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
const YEAR_OPTIONS = ['2020以前', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029'];

Page({
  data: {
    stepIndex: 0,
    statusText: '待审核',
    statusMessage: '您的资料正在由管理员团队审核。您仍可更新您的详细信息。',
    avatarUrl: '',
    nickname: '',
    graduationYear: '',
    yearOptions: YEAR_OPTIONS,
    showYearPicker: false,
    realName: '',
    wechatId: '',
    selectedCourses: [],
    customCourses: [],
    courses: [],
    showAddCourse: false,
    addCourseInput: '',
    weekdays: WEEKDAYS,
    timeSlots: TIME_SLOTS,
    transcriptUrl: '',
    transcriptName: '',
    schedule: {},
    steps: ['专业领域', '证明材料', '排班设置'],
    scrollToId: ''
  },

  onLoad() {
    this.initSchedule();
    this.syncCourses();
  },

  syncCourses() {
    const selected = this.data.selectedCourses;
    const custom = this.data.customCourses || [];
    const allNames = [...COURSE_LIST, ...custom];
    const courses = allNames.map(name => ({
      id: name,
      name,
      selected: selected.indexOf(name) >= 0
    }));
    this.setData({ courses });
  },

  initSchedule() {
    const schedule = {};
    WEEKDAYS.forEach((_, wi) => {
      TIME_SLOTS.forEach((_, ti) => {
        schedule[`${wi}-${ti}`] = false;
      });
    });
    this.setData({ schedule });
  },

  onBack() {
    wx.navigateBack();
  },

  onStepTap(e) {
    const idx = e.currentTarget.dataset.index;
    this.setData({ stepIndex: idx, scrollToId: 'section-' + idx });
  },

  onAvatarTap() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({ avatarUrl: res.tempFiles[0].tempFilePath });
      }
    });
  },

  onNicknameInput(e) {
    this.setData({ nickname: e.detail.value });
  },

  onGraduationYearTap() {
    this.setData({ showYearPicker: true });
  },

  onYearPickerMaskTap() {
    this.setData({ showYearPicker: false });
  },

  onYearSelect(e) {
    const year = e.currentTarget.dataset.year;
    this.setData({ graduationYear: year, showYearPicker: false });
  },

  onRealNameInput(e) {
    this.setData({ realName: e.detail.value });
  },

  onWechatIdInput(e) {
    this.setData({ wechatId: e.detail.value });
  },

  onAddCourseTap() {
    this.setData({ showAddCourse: true, addCourseInput: '' });
  },

  onAddCourseInput(e) {
    this.setData({ addCourseInput: e.detail.value });
  },

  onAddCourseConfirm() {
    const name = (this.data.addCourseInput || '').trim();
    if (!name) {
      wx.showToast({ title: '请输入课程编号', icon: 'none' });
      return;
    }
    const custom = [...(this.data.customCourses || [])];
    if (custom.indexOf(name) >= 0) {
      wx.showToast({ title: '该课程已存在', icon: 'none' });
      return;
    }
    custom.push(name);
    this.setData({ customCourses: custom, showAddCourse: false, addCourseInput: '' }, () => this.syncCourses());
  },

  onAddCourseCancel() {
    this.setData({ showAddCourse: false, addCourseInput: '' });
  },

  onCourseTap(e) {
    const id = e.currentTarget.dataset.id;
    const selected = [...this.data.selectedCourses];
    const idx = selected.indexOf(id);
    if (idx >= 0) selected.splice(idx, 1);
    else selected.push(id);
    this.setData({ selectedCourses: selected }, () => this.syncCourses());
  },

  onTranscriptTap() {
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      extension: ['pdf', 'doc', 'docx', 'png', 'jpg', 'jpeg'],
      success: (res) => {
        this.setData({
          transcriptUrl: res.tempFiles[0].path,
          transcriptName: res.tempFiles[0].name
        });
      }
    });
  },

  onReplaceTranscript() {
    this.onTranscriptTap();
  },

  onDeleteTranscript() {
    this.setData({ transcriptUrl: '', transcriptName: '' });
  },

  onSlotTap(e) {
    const key = e.currentTarget.dataset.key;
    const schedule = { ...this.data.schedule };
    schedule[key] = !schedule[key];
    this.setData({ schedule });
  },

  onSubmit() {
    const { nickname, graduationYear, realName, wechatId, selectedCourses, transcriptUrl, schedule } = this.data;
    if (!nickname.trim()) {
      wx.showToast({ title: '请输入昵称', icon: 'none' });
      return;
    }
    if (!graduationYear) {
      wx.showToast({ title: '请选择毕业年份', icon: 'none' });
      return;
    }
    if (!realName.trim()) {
      wx.showToast({ title: '请输入真实姓名', icon: 'none' });
      return;
    }
    if (!wechatId.trim()) {
      wx.showToast({ title: '请输入微信号', icon: 'none' });
      return;
    }
    if (selectedCourses.length === 0) {
      wx.showToast({ title: '请至少选择一个专业领域', icon: 'none' });
      return;
    }
    if (!transcriptUrl) {
      wx.showToast({ title: '请上传成绩单', icon: 'none' });
      return;
    }
    wx.navigateTo({ url: '/pages/tutor-cert-result/tutor-cert-result' });
  }
});
