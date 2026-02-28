// pages/student-discover/student-discover.js
const MOCK_TUTORS = [
  { id: '1', name: 'David Chen', major: 'CS 专业', certified: true, rating: 5.0, reviewCount: 42, courses: ['CS61A: A+', 'CS61B: A'], nextFree: '今天, 4:00 PM', available: true, avatar: '' },
  { id: '2', name: 'Sarah Jenkins', major: 'Data Science', certified: true, rating: 4.9, reviewCount: 28, courses: ['DATA8: A+', 'CS61A: A-'], nextFree: '明天, 10:00 AM', available: true, avatar: '' },
  { id: '3', name: 'Michael Ross', major: 'Physics 专业', certified: true, rating: 4.8, reviewCount: 15, courses: ['PHYS7A: A+', 'MATH53: A'], nextFree: '今天, 2:30 PM', available: true, avatar: '' },
  { id: '4', name: 'Jessica Liu', major: 'EECS 专业', certified: false, rating: null, reviewCount: 0, courses: ['EE16A: A'], nextFree: '周五, 9:00 AM', available: false, avatar: '' }
];

const SUBJECTS = [
  { id: 'cs', title: '计算机科学', count: 128, icon: 'CS', bg: '#E8F0FE' },
  { id: 'data', title: '数据科学', count: 85, icon: 'Data', bg: '#F3E8FD' },
  { id: 'math', title: '数学', count: 54, icon: 'Math', bg: '#E6F4EA' },
  { id: 'econ', title: '经济学', count: 42, icon: 'Econ', bg: '#FEF7E0' }
];

const COURSES = [
  { id: '61A', name: 'CS 61A', desc: '计算机程序的构造和解释', onlineCount: 23 },
  { id: '61B', name: 'CS 61B', desc: '数据结构', onlineCount: 18 },
  { id: 'D8', name: 'Data 8', desc: '数据科学基础', onlineCount: 8 },
  { id: '70', name: 'CS 70', desc: '离散数学与概率论', onlineCount: 15 }
];

Page({
  data: {
    browseMode: 'tutor',
    searchKeyword: '',
    tutors: MOCK_TUTORS,
    subjects: SUBJECTS,
    courses: COURSES,
    filteredTutors: MOCK_TUTORS
  },

  onLoad(options) {
    this.filterTutors();
  },

  onBack() {
    wx.navigateBack();
  },

  onBrowseCourse() {
    this.setData({ browseMode: 'course' });
  },

  onBrowseTutor() {
    this.setData({ browseMode: 'tutor' });
  },

  onSearchInput(e) {
    this.setData({ searchKeyword: e.detail.value }, () => this.filterTutors());
  },

  filterTutors() {
    const kw = (this.data.searchKeyword || '').trim().toLowerCase();
    const list = kw ? this.data.tutors.filter(t => 
      t.name.toLowerCase().includes(kw) || t.courses.some(c => c.toLowerCase().includes(kw))
    ) : this.data.tutors;
    this.setData({ filteredTutors: list });
  },

  onBookTutor(e) {
    const id = e.currentTarget.dataset.id;
    const tutor = this.data.filteredTutors.find(t => t.id === id);
    if (!tutor || !tutor.available) return;
    const coursesStr = (tutor.courses || []).join(', ');
    wx.navigateTo({
      url: '/pages/student-select-time/student-select-time?tutorId=' + id + '&tutorName=' + encodeURIComponent(tutor.name) + '&courses=' + encodeURIComponent(coursesStr)
    });
  },

  onViewTutorsByCourse(e) {
    const name = e.currentTarget.dataset.name || '';
    this.setData({ browseMode: 'tutor', searchKeyword: name }, () => this.filterTutors());
  },

  onSubjectTap(e) {
    const title = e.currentTarget.dataset.title || '';
    this.setData({ browseMode: 'tutor', searchKeyword: title }, () => this.filterTutors());
  },

  onProfile() {
    wx.navigateTo({ url: '/pages/student-profile/student-profile' });
  }
});
