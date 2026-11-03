import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../lib/api';
import { 
  ArrowLeft, 
  Flame, 
  Award, 
  Star, 
  Trophy, 
  Ribbon, 
  ChevronDown 
} from 'lucide-react';

export default function CreateRewardForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    points: '0',
    giveType: 'Reward',
    selectedMethod: 'Learning Streak',
    methodDescription: ''
  });

  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const create = async () => {
    if (saving) return;
    if (formData.name.trim().length < 2) return setError('Give it a name.');
    const method = earningMethods.find((m) => m.title === formData.selectedMethod);
    const how = formData.methodDescription.trim() || method?.subtitle || '';
    const description = [formData.description.trim(), how && `How to earn: ${how}`].filter(Boolean).join('\n\n').slice(0, 1000);
    setSaving(true);
    setError('');
    try {
      await api.post('/rewards', {
        title: formData.name.trim(),
        description: description || undefined,
        kind: formData.giveType === 'Badge' ? 'BADGE' : 'REWARD',
        points: Number(formData.points) || 0,
      });
      navigate('/tutor/students');
    } catch (err) {
      setError(err.message || 'Could not create this.');
      setSaving(false);
    }
  };

  const earningMethods = [
    { id: 'streak', title: 'Learning Streak', subtitle: 'Stay active for 7 consecutive days.', icon: Flame },
    { id: 'mastery', title: 'Subject Mastery', subtitle: 'Demonstrate mastery of the subject.', icon: Award },
    { id: 'assignment', title: 'Assignment Star', subtitle: 'Consistently complete assignments successfully.', icon: Star },
    { id: 'champion', title: 'Quiz Champion', subtitle: 'Achieve outstanding quiz performance.', icon: Trophy },
    { id: 'class-ace', title: 'Class Ace', subtitle: 'Excel in overall class performance.', icon: Ribbon },
  ];

  return (
    <div className="min-h-screen bg-[#F4F6F9] font-sans text-slate-800 p-6 md:p-10 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12 relative">
        
        {/* Top Header Section */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-100">
          <div className="flex items-center space-x-4">
            <button type="button" onClick={() => navigate(-1)} aria-label="Go back" className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-600">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Create Reward & Badge</h1>
              <p className="text-sm text-slate-500">Create a new reward or badge and set how students can earn it.</p>
            </div>
          </div>
        </div>

        {/* Form Fields Container */}
        <div className="space-y-6">
          
          {/* Reward & Badge Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Reward & Badge Name <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              placeholder="e.g Quiz Champion"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <textarea 
                rows="3"
                maxLength={100}
                placeholder="e.g Awarded to students who demonstrate outstanding performance in quizzes."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all resize-none"
              />
              <span className="absolute bottom-3 right-3 text-xs text-slate-400 font-medium">
                {formData.description.length}/100
              </span>
            </div>
          </div>

          {/* Points */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Points <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <input
              inputMode="numeric"
              value={formData.points}
              onChange={(e) => setFormData({...formData, points: e.target.value.replace(/\D/g, '')})}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
            />
            <p className="mt-2 text-xs text-slate-400">You award this to students yourself, from their profile page.</p>
          </div>

          {/* What would you like to give? */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              What would you like to give?
            </label>
            <div className="relative">
              <select
                value={formData.giveType}
                onChange={(e) => setFormData({...formData, giveType: e.target.value})}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all cursor-pointer"
              >
                <option value="Reward">Reward</option>
                <option value="Badge">Badge</option>
                <option value="Certificate">Certificate (counts as a reward)</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* How should students earn this? (Grid of Cards) */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-3">
              How should students earn this?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {earningMethods.map((method) => {
                const IconComponent = method.icon;
                const isSelected = formData.selectedMethod === method.title;
                return (
                  <div
                    key={method.id}
                    onClick={() => setFormData({...formData, selectedMethod: method.title})}
                    className={`cursor-pointer rounded-xl p-4 flex flex-col items-center text-center transition-all border ${
                      isSelected 
                        ? 'border-indigo-600 bg-indigo-50/10 ring-2 ring-indigo-600/10 shadow-sm' 
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="mb-3 text-slate-800">
                      <IconComponent className="w-6 h-6 stroke-[1.75]" />
                    </div>
                    <h3 className="text-xs font-bold text-slate-900 mb-1">{method.title}</h3>
                    <p className="text-[11px] text-slate-400 leading-tight">{method.subtitle}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed rule input based on selected criteria */}
          <div className="relative pt-2">
            <textarea 
              rows="3"
              maxLength={100}
              placeholder="e.g Award this to the students who scored 100% in quizzes over the month."
              value={formData.methodDescription}
              onChange={(e) => setFormData({...formData, methodDescription: e.target.value})}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all resize-none"
            />
            <span className="absolute bottom-5 right-3 text-xs text-slate-400 font-medium">
              {formData.methodDescription.length}/100
            </span>
          </div>

          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}

          {/* Bottom Action Button */}
          <div className="pt-4 flex justify-center">
            <button 
              type="button"
              onClick={create}
              disabled={saving}
              className="w-full sm:w-auto px-12 py-3.5 bg-[#303373] hover:bg-[#25285c] text-white text-sm font-medium rounded-xl shadow-md transition-all active:scale-[0.99] disabled:opacity-60"
            >
              {saving ? 'Creating…' : 'Create Recognition'}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}