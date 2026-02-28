// pages/student-select-time/student-select-time.js
const WEEKDAY_LABELS = ['日', '一', '二', '三', '四', '五', '六'];

Page({
  data: {
    tutorId: '',
    tutorName: 'Alex Zhang',
    tutorCourses: 'CS 61A, CS 70',
    year: 2023,
    month: 10,
    monthLabel: '2023年10月',
    weekLabels: WEEKDAY_LABELS,
    calendarDays: [],
    selectedDate: null,
    selectedDay: 5,
    availableSlots: ['10:00 AM', '10:30 AM', '01:00 PM', '01:30 PM', '03:00 PM', '04:30 PM'],
    selectedSlot: '10:00 AM',
    selectedSlotLabel: '10月5日, 10:00 AM',
    weekLabel: '周四',
    timezone: 'Pacific Time (PST)'
  },

  onLoad(options) {
    const tutorName = options.tutorName ? decodeURIComponent(options.tutorName) : 'Alex Zhang';
    const courses = options.courses ? decodeURIComponent(options.courses) : 'CS 61A, CS 70';
    this.setData({
      tutorId: options.tutorId || '1',
      tutorName,
      tutorCourses: courses
    });
    this.buildCalendar(2023, 10);
  },

  buildCalendar(year, month) {
    const firstDay = new Date(year, month - 1, 1).getDay();
    const daysInMonth = new Date(year, month, 0).getDate();
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push({ day: '', empty: true });
    for (let d = 1; d <= daysInMonth; d++) {
      const hasSlot = [5, 8, 9, 11, 12, 13, 14, 15, 16, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].indexOf(d) >= 0;
      days.push({ day: d, empty: false, hasSlot, selected: d === 5 });
    }
    const monthLabel = year + '年' + month + '月';
    const weekNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const selectedDay = 5;
    const weekLabel = weekNames[new Date(year, month - 1, selectedDay).getDay()];
    this.setData({
      year,
      month,
      monthLabel,
      calendarDays: days,
      selectedDay,
      weekLabel
    });
    this.updateSelectedLabel();
  },

  onPrevMonth() {
    let { year, month } = this.data;
    month--;
    if (month < 1) { month = 12; year--; }
    this.buildCalendar(year, month);
  },

  onNextMonth() {
    let { year, month } = this.data;
    month++;
    if (month > 12) { month = 1; year++; }
    this.buildCalendar(year, month);
  },

  onDateTap(e) {
    const day = e.currentTarget.dataset.day;
    if (day == null || day === '') return;
    const weekNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const { year, month } = this.data;
    const weekLabel = weekNames[new Date(year, month - 1, day).getDay()];
    const days = this.data.calendarDays.map(d => ({ ...d, selected: d.day === day }));
    this.setData({ calendarDays: days, selectedDay: day, weekLabel }, () => this.updateSelectedLabel());
  },

  updateSelectedLabel() {
    const { year, month, selectedDay, selectedSlot } = this.data;
    const weekNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const d = new Date(year, month - 1, selectedDay);
    const weekLabel = weekNames[d.getDay()];
    const label = month + '月' + selectedDay + '日, ' + selectedSlot;
    this.setData({ selectedSlotLabel: label, weekLabel });
  },

  onSlotTap(e) {
    const slot = e.currentTarget.dataset.slot;
    this.setData({ selectedSlot: slot }, () => this.updateSelectedLabel());
  },

  onNextStep() {
    const { tutorId, tutorName, year, month, selectedDay, selectedSlot } = this.data;
    const dateStr = month + '月' + selectedDay + '日';
    const weekNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const d = new Date(year, month - 1, selectedDay);
    const weekLabel = weekNames[d.getDay()];
    wx.navigateTo({
      url: '/pages/student-match-success/student-match-success?tutorId=' + tutorId + '&tutorName=' + encodeURIComponent(tutorName)
        + '&date=' + dateStr + '&week=' + encodeURIComponent(weekLabel) + '&time=' + encodeURIComponent(selectedSlot)
    });
  },

  onBack() {
    wx.navigateBack();
  }
});
