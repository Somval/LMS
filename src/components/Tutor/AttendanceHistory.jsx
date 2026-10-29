import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Download, 
  ChevronLeft,
  ChevronRight,
  BookOpen
} from 'lucide-react';

const initialData = [
  { id: 1, topic: 'Quadratic Equations', date: 'May 20, 2025', scheduledTime: '5:00 PM – 6:00 PM', joined: '4:58 PM', duration: '1h 02m', status: 'Present' },
  { id: 2, topic: 'Linear Functions & Graphs', date: 'May 18, 2025', scheduledTime: '5:00 PM – 6:00 PM', joined: '4:59 PM', duration: '1h 00m', status: 'Present' },
  { id: 3, topic: 'Trigonometric Identities', date: 'May 15, 2025', scheduledTime: '4:00 PM – 5:30 PM', joined: '4:15 PM', duration: '1h 15m', status: 'Late' },
  { id: 4, topic: 'Polynomial Division', date: 'May 12, 2025', scheduledTime: '5:00 PM – 6:00 PM', joined: '-', duration: '0m', status: 'Absent' },
  { id: 5, topic: 'Calculus: Limits & Continuity', date: 'May 10, 2025', scheduledTime: '3:00 PM – 4:30 PM', joined: '2:57 PM', duration: '1h 33m', status: 'Present' },
  { id: 6, topic: 'Quadratic Equations', date: 'May 08, 2025', scheduledTime: '5:00 PM – 6:00 PM', joined: '4:58 PM', duration: '1h 02m', status: 'Present' },
  { id: 7, topic: 'Probability & Statistics', date: 'May 05, 2025', scheduledTime: '5:00 PM – 6:00 PM', joined: '5:02 PM', duration: '58m', status: 'Present' },
  { id: 8, topic: 'Matrix Transformations', date: 'May 02, 2025', scheduledTime: '2:00 PM – 3:30 PM', joined: '-', duration: '0m', status: 'Absent' },
  { id: 9, topic: 'Quadratic Equations', date: 'Apr 28, 2025', scheduledTime: '5:00 PM – 6:00 PM', joined: '4:55 PM', duration: '1h 05m', status: 'Present' },
  { id: 10, topic: 'Vectors & 3D Geometry', date: 'Apr 25, 2025', scheduledTime: '4:00 PM – 5:30 PM', joined: '4:08 PM', duration: '1h 22m', status: 'Late' },
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredData = useMemo(() => {
    return initialData.filter(row => {
      const matchesSearch = row.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            row.date.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = selectedStatus === 'All' || row.status === selectedStatus;
      return matchesSearch && matchesStatus;
    }).sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [searchQuery, selectedStatus, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleExportExcel = () => {
    if (filteredData.length === 0) {
      alert('No data available to export.');
      return;
    }

    const headers = ['Topic', 'Date', 'Scheduled Time', 'Joined', 'Duration', 'Status'];
    const rows = filteredData.map(row => [
      `"${row.topic.replace(/"/g, '""')}"`,
      `"${row.date}"`,
      `"${row.scheduledTime}"`,
      `"${row.joined}"`,
      `"${row.duration}"`,
      `"${row.status}"`
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Attendance_Report_${selectedStatus.toLowerCase()}_${new Date().toISOString().split('T')[0]}.xls`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Present':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold bg-[#e7faef] text-[#22c55e] border border-[#d1f5df]">
            Present
          </span>
        );
      case 'Late':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold bg-[#fffbeb] text-[#f59e0b] border border-[#fef3c7]">
            Late
          </span>
        );
      case 'Absent':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold bg-[#fef2f2] text-[#ef4444] border border-[#fee2e2]">
            Absent
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-[1093px]  p-4 md:p-8 font-sans text-slate-800 antialiased flex flex-col items-center justify-start">
      <div className="w-full max-w-6xl space-y-4">
        
        {/* Header & Controls Toolbar */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
          
          {/* Card Title Header */}
          <div className="px-6 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                Attendance History
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                View your recent class attendance, schedule times, and duration logs.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-3">
            
            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search topic or date..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-4 py-2 text-xs md:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 text-slate-700"
              />
            </div>

            {/* Filter Pills & Actions */}
            <div className="flex items-center justify-between w-full md:w-auto gap-2 overflow-x-auto pb-1 md:pb-0">
              <div className="flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-lg">
                {['All', 'Present', 'Late', 'Absent'].map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setSelectedStatus(status);
                      setCurrentPage(1);
                    }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                      selectedStatus === status
                        ? 'bg-white text-slate-900 shadow-sm font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <button 
                onClick={handleExportExcel}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm ml-auto md:ml-0"
                title="Export current filtered list to Excel"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Export Excel</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-[#f1f5f9]/70 border-b border-slate-200/70 text-[13px] font-semibold text-slate-500 tracking-normal">
                  <th 
                    onClick={() => handleSort('topic')}
                    className="py-3.5 px-6 cursor-pointer hover:text-slate-800 transition-colors select-none font-medium"
                  >
                    <div className="flex items-center gap-1">
                      Topic
                      {sortField === 'topic' && (
                        sortDirection === 'asc' ? <ChevronUp className="w-3.5 h-3.5 text-slate-600" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-600" />
                      )}
                    </div>
                  </th>

                  <th 
                    onClick={() => handleSort('date')}
                    className="py-3.5 px-6 cursor-pointer hover:text-slate-800 transition-colors select-none font-medium"
                  >
                    <div className="flex items-center gap-1">
                      Date
                      {sortField === 'date' && (
                        sortDirection === 'asc' ? <ChevronUp className="w-3.5 h-3.5 text-slate-600" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-600" />
                      )}
                    </div>
                  </th>

                  <th className="py-3.5 px-6 font-medium">Scheduled Time</th>
                  <th className="py-3.5 px-6 font-medium">Joined</th>
                  <th className="py-3.5 px-6 font-medium">Duration</th>
                  <th className="py-3.5 px-6 font-medium">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 bg-white text-xs md:text-sm">
                {paginatedData.length > 0 ? (
                  paginatedData.map((row) => (
                    <tr 
                      key={row.id} 
                      className="hover:bg-slate-50/60 transition-colors group"
                    >
                      <td className="py-4 px-6 text-slate-900 font-semibold max-w-[220px] leading-snug">
                        {row.topic}
                      </td>

                      <td className="py-4 px-6 text-slate-900 font-semibold whitespace-nowrap">
                        {row.date}
                      </td>

                      <td className="py-4 px-6 text-slate-400 font-medium whitespace-nowrap">
                        {row.scheduledTime}
                      </td>

                      <td className="py-4 px-6 text-slate-400 font-medium whitespace-nowrap">
                        {row.joined}
                      </td>

                      <td className="py-4 px-6 text-slate-400 font-medium whitespace-nowrap">
                        {row.duration}
                      </td>

                      <td className="py-4 px-6 whitespace-nowrap">
                        {renderStatusBadge(row.status)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-slate-400">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <BookOpen className="w-8 h-8 text-slate-300 stroke-[1.5]" />
                        <p className="text-sm font-medium text-slate-500">No attendance records found</p>
                        <p className="text-xs text-slate-400">Try adjusting your search query or filter settings.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-slate-100 bg-white flex items-center justify-between text-xs text-slate-500">
            <div>
              Showing <span className="font-semibold text-slate-700">{filteredData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> to{' '}
              <span className="font-semibold text-slate-700">
                {Math.min(currentPage * itemsPerPage, filteredData.length)}
              </span>{' '}
              of <span className="font-semibold text-slate-700">{filteredData.length}</span> results
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              {Array.from({ length: totalPages || 1 }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    currentPage === page
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-1.5 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}