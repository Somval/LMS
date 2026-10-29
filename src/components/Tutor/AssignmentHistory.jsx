import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  ChevronDown, 
  MoreVertical, 
  Eye, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  X
} from 'lucide-react';
import SelectedCourses from "../../components/Tutor/selectedCourses";
import AssessmentDetail from '../../TutorDashboard/AssignmentsQuizzes/courseworkdetails';

const initialAssessments = [
  {
    id: 1,
    title: "Quadratic Equations Practice",
    type: "Assignment",
    week: "Week 1",
    availability: "After Week 1",
    deadline: "7 days after unlock",
    submissions: "1/8",
    status: "Active"
  },
  {
    id: 2,
    title: "Quadratic Equations Practice",
    type: "Quiz",
    week: "Week 1",
    availability: "After Week 1",
    deadline: "7 days after unlock",
    submissions: "1/8",
    status: "Active"
  },
  {
    id: 3,
    title: "Quadratic Equations Practice",
    type: "Assignment",
    week: "Week 1",
    availability: "After Week 1",
    deadline: "7 days after unlock",
    submissions: "1/8",
    status: "Active"
  },
  {
    id: 4,
    title: "Quadratic Equations Practice",
    type: "Assignment",
    week: "Week 1",
    availability: "After Week 1",
    deadline: "7 days after unlock",
    submissions: "1/8",
    status: "Draft"
  },
  {
    id: 5,
    title: "Quadratic Equations Practice",
    type: "Assignment",
    week: "Week 1",
    availability: "After Week 1",
    deadline: "7 days after unlock",
    submissions: "1/8",
    status: "Grading"
  }
];

export default function AssignmentsAndQuizzes() {
  const [currentRoute, setCurrentRoute] = useState('list'); // 'list' or 'detail'
  const [selectedAssessmentId, setSelectedAssessmentId] = useState(null);

  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWeek, setSelectedWeek] = useState('All Weeks');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  
  const [assessments, setAssessments] = useState(initialAssessments);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [isWeekDropdownOpen, setIsWeekDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  
  const [modalType, setModalType] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredAssessments = assessments.filter(item => {
    const matchesTab = 
      activeTab === 'All' ? true :
      activeTab === 'Assignments' ? item.type === 'Assignment' :
      activeTab === 'Quizzes' ? item.type === 'Quiz' : true;
    
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesWeek = selectedWeek === 'All Weeks' || item.week === selectedWeek;
    const matchesStatus = selectedStatus === 'All Statuses' || item.status === selectedStatus;

    return matchesTab && matchesSearch && matchesWeek && matchesStatus;
  });

  // If route is set to detail view, render ONLY the detail page (completely hiding SelectedCourses)
  if (currentRoute === 'detail') {
    return (
      <AssessmentDetail 
        assessmentId={selectedAssessmentId} 
        onBack={() => setCurrentRoute('list')} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans antialiased relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Selected Courses Section - Visible ONLY on list view */}
      <div className="bg-[#F8FAFC] py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <SelectedCourses />
          
          {/* Main Coursework & Assessments Dashboard */}
          <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              {/* Navigation Tabs */}
              <nav className="flex items-center space-x-8 border-b md:border-b-0 border-slate-200">
                {['All', 'Assignments', 'Quizzes'].map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-3 md:pb-0 text-base font-medium transition-colors relative ${
                        isActive ? 'text-blue-600 font-semibold' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {tab}
                      {isActive && (
                        <div className="absolute -bottom-3 left-0 right-0 h-[3px] bg-blue-600 rounded-full hidden md:block" />
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => { setModalType('assignment'); setActiveItem(null); }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-blue-600 text-blue-600 font-medium text-sm bg-white hover:bg-blue-50 transition-all shadow-sm active:scale-95"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Create Assignments</span>
                </button>
                <button 
                  onClick={() => { setModalType('quiz'); setActiveItem(null); }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20 active:scale-95"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Create Quiz</span>
                </button>
              </div>
            </header>

            {/* Filter Toolbar */}
            <div className="bg-slate-50/60 rounded-2xl p-4 w-full shadow-xs border border-slate-200/80 mb-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-5 relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search assignments or quizzes..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                />
              </div>

              <div className="md:col-span-7 flex flex-wrap sm:flex-nowrap items-center gap-3 justify-end">
                {/* Week Filter */}
                <div className="relative w-full sm:w-48">
                  <button
                    onClick={() => { setIsWeekDropdownOpen(!isWeekDropdownOpen); setIsStatusDropdownOpen(false); }}
                    className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all"
                  >
                    <span>{selectedWeek}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isWeekDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isWeekDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-full bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-20">
                      {['All Weeks', 'Week 1', 'Week 2', 'Week 3'].map(week => (
                        <button
                          key={week}
                          onClick={() => { setSelectedWeek(week); setIsWeekDropdownOpen(false); }}
                          className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          {week}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Status Filter */}
                <div className="relative w-full sm:w-48">
                  <button
                    onClick={() => { setIsStatusDropdownOpen(!isStatusDropdownOpen); setIsWeekDropdownOpen(false); }}
                    className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all"
                  >
                    <span>{selectedStatus}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isStatusDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isStatusDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-full bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-20">
                      {['All Statuses', 'Active', 'Draft', 'Grading'].map(status => (
                        <button
                          key={status}
                          onClick={() => { setSelectedStatus(status); setIsStatusDropdownOpen(false); }}
                          className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-900">Coursework & Assessments</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/70 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      <th className="py-4 px-6">Title</th>
                      <th className="py-4 px-6">Type</th>
                      <th className="py-4 px-6">Week</th>
                      <th className="py-4 px-6">Availability</th>
                      <th className="py-4 px-6">Deadline</th>
                      <th className="py-4 px-6">Submissions</th>
                      <th className="py-4 px-6">Status</th>
                      <th className="py-4 px-6 text-right"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredAssessments.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="py-12 text-center text-slate-400">
                          No coursework or assessments found matching your criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredAssessments.map((item) => {
                        const isMenuOpen = activeMenuId === item.id;
                        
                        return (
                          <tr 
                            key={item.id} 
                            onClick={() => {
                              setSelectedAssessmentId(item.id);
                              setCurrentRoute('detail');
                            }}
                            className="hover:bg-slate-50/60 transition-colors group cursor-pointer"
                          >
                            <td className="py-4 px-6 font-semibold text-slate-900">
                              {item.title}
                            </td>

                            <td className="py-4 px-6">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                item.type === 'Assignment' 
                                  ? 'bg-blue-100/70 text-blue-700' 
                                  : 'bg-purple-100/70 text-purple-700'
                              }`}>
                                {item.type}
                              </span>
                            </td>

                            <td className="py-4 px-6 text-slate-600 font-medium">
                              {item.week}
                            </td>

                            <td className="py-4 px-6 text-slate-600">
                              {item.availability}
                            </td>

                            <td className="py-4 px-6 text-slate-600">
                              {item.deadline}
                            </td>

                            <td className="py-4 px-6 font-bold text-slate-900">
                              {item.submissions}
                            </td>

                            <td className="py-4 px-6">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                item.status === 'Active' ? 'bg-emerald-100/70 text-emerald-700' :
                                item.status === 'Draft' ? 'bg-slate-200/70 text-slate-600' :
                                'bg-amber-100/70 text-amber-800'
                              }`}>
                                {item.status}
                              </span>
                            </td>

                            <td className="py-4 px-6 text-right relative" onClick={(e) => e.stopPropagation()}>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveMenuId(isMenuOpen ? null : item.id);
                                }}
                                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-colors"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>

                              {isMenuOpen && (
                                <div 
                                  ref={menuRef}
                                  className="absolute right-12 top-10 w-44 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-30 text-left animate-in fade-in zoom-in-95 duration-150"
                                >
                                  <button
                                    onClick={() => {
                                      setSelectedAssessmentId(item.id);
                                      setCurrentRoute('detail');
                                    }}
                                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                                  >
                                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                                    <span>View Details</span>
                                  </button>
                                  
                                  <button
                                    onClick={() => {
                                      setActiveItem(item);
                                      setModalType(item.type === 'Assignment' ? 'assignment' : 'quiz');
                                      setActiveMenuId(null);
                                    }}
                                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                                  >
                                    <Edit3 className="w-3.5 h-3.5 text-slate-400" />
                                    <span>Edit</span>
                                  </button>

                                  <div className="h-px bg-slate-100 my-1" />

                                  <button
                                    onClick={() => {
                                      setAssessments(assessments.filter(a => a.id !== item.id));
                                      setActiveMenuId(null);
                                      showToast(`Closed assessment "${item.title}"`);
                                    }}
                                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                                  >
                                    <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                                    <span>Close Assessment</span>
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Showing <strong className="text-slate-700">{filteredAssessments.length}</strong> of <strong className="text-slate-700">{assessments.length}</strong> entries</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-600">Page 1 of 1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Dialog */}
      {modalType && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-900 text-base">
                {activeItem ? `Edit ${modalType === 'quiz' ? 'Quiz' : 'Assignment'}` : 
                 `Create New ${modalType === 'quiz' ? 'Quiz' : 'Assignment'}`}
              </h3>
              <button 
                onClick={() => setModalType(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6">
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const title = formData.get('title');
                const week = formData.get('week');
                
                if (activeItem) {
                  setAssessments(assessments.map(a => a.id === activeItem.id ? { ...a, title, week } : a));
                  showToast('Successfully updated assessment!');
                } else {
                  const newItem = {
                    id: Date.now(),
                    title: title || 'New Assessment Practice',
                    type: modalType === 'quiz' ? 'Quiz' : 'Assignment',
                    week: week || 'Week 1',
                    availability: 'After Week 1',
                    deadline: '7 days after unlock',
                    submissions: '0/8',
                    status: 'Active'
                  };
                  setAssessments([newItem, ...assessments]);
                  showToast(`Successfully created new ${modalType}!`);
                }
                setModalType(null);
              }} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Title</label>
                  <input 
                    name="title"
                    defaultValue={activeItem ? activeItem.title : ''}
                    placeholder="e.g. Advanced Calculus Quiz"
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Week Assigned</label>
                  <select 
                    name="week"
                    defaultValue={activeItem ? activeItem.week : 'Week 1'}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                  >
                    <option value="Week 1">Week 1</option>
                    <option value="Week 2">Week 2</option>
                    <option value="Week 3">Week 3</option>
                  </select>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalType(null)}
                    className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all"
                  >
                    {activeItem ? 'Save Changes' : 'Create Now'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}