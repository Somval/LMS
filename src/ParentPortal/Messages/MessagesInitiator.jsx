import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

import { api } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import SelectChild from '../HomeworkAssignments/SelectChild';
import MessageListSidebar from './MessageListSidebar';
import ChatDetailView from './ChatDetailView';
import { buildItems } from './messagesData';

const LIST_REFRESH_MS = 20000;

export default function Message() {
  const { user } = useAuth();
  const location = useLocation();

  const [kids, setKids] = useState(null); // null while loading
  const [kidsError, setKidsError] = useState('');
  const [currentChild, setCurrentChild] = useState(null);

  const [conversations, setConversations] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState('');
  const [tutorSubjects, setTutorSubjects] = useState(new Map());

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [mobileView, setMobileView] = useState('list'); // 'list' or 'chat'

  const loadKids = useCallback(() => {
    setKids(null);
    setKidsError('');
    api
      .get('/parent/children')
      .then((list) => {
        setKids(list);
        const wanted = list.find((child) => child.id === location.state?.childId);
        setCurrentChild((current) => current ?? wanted ?? list[0] ?? null);
      })
      .catch((err) => setKidsError(err.message || 'Could not load your children.'));
  }, [location.state?.childId]);

  useEffect(loadKids, [loadKids]);

  // Everyone you've talked to, plus everyone you're allowed to message.
  const loadList = useCallback(async (silent) => {
    try {
      const [convos, people] = await Promise.all([
        api.get('/messages/conversations'),
        api.get('/messages/contacts'),
      ]);
      setConversations(convos);
      setContacts(people);
      setListError('');
    } catch (err) {
      if (!silent) setListError(err.message || 'Could not load your messages.');
    } finally {
      setListLoading(false);
    }
  }, []);

  useEffect(() => {
    loadList(false);
    const timer = setInterval(() => loadList(true), LIST_REFRESH_MS);
    return () => clearInterval(timer);
  }, [loadList]);

  // The selected child's tutors, so the list can say which subject each one teaches.
  useEffect(() => {
    if (!currentChild) return undefined;
    let cancelled = false;
    api
      .get(`/dashboard/parent/${currentChild.id}`)
      .then((data) => {
        if (!cancelled) setTutorSubjects(new Map(data.tutors.map((t) => [t.userId, t.subjects])));
      })
      .catch(() => !cancelled && setTutorSubjects(new Map()));
    return () => {
      cancelled = true;
    };
  }, [currentChild]);

  const items = useMemo(
    () => buildItems(conversations, contacts, tutorSubjects),
    [conversations, contacts, tutorSubjects]
  );
  const selected = items.find((item) => item.userId === selectedUserId) ?? null;

  // The chat reports back after reading or sending, so previews and unread counts stay current.
  const refreshList = useRef(loadList);
  refreshList.current = loadList;
  const handleActivity = useCallback(() => refreshList.current(true), []);

  const handleSelectMessage = (item) => {
    setSelectedUserId(item.userId);
    setMobileView('chat');
  };

  if (kidsError) {
    return (
      <div className="w-full min-h-screen bg-slate-50/50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
          <p>{kidsError}</p>
          <button
            type="button"
            onClick={loadKids}
            className="mt-3 rounded-lg border border-red-300 px-3 py-1.5 font-semibold hover:bg-red-100"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (kids === null) {
    return (
      <div className="flex items-center justify-center p-16">
        <Loader2 className="h-7 w-7 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50/50 font-sans text-slate-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Child Selector Component Bar (it picks whose tutors are labelled by subject) */}
        {currentChild ? (
          <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-4 md:p-6">
            <SelectChild kids={kids} selectedChild={currentChild} onChildSelect={setCurrentChild} />
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-500">
            Link your child's learner account to message their tutors.{' '}
            <Link to="/parent/link-children" className="font-semibold text-blue-600 hover:underline">
              Link a Child
            </Link>
          </div>
        )}

        {/* Responsive Messaging Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* Sidebar: Display block on mobile when view is 'list', always visible on lg */}
          <div className={`w-full lg:col-span-5 xl:col-span-4 ${mobileView === 'chat' ? 'hidden lg:block' : 'block'}`}>
            <MessageListSidebar
              items={items}
              selectedId={selectedUserId}
              onSelectMessage={handleSelectMessage}
              loading={listLoading}
              error={listError}
              onRetry={() => loadList(false)}
            />
          </div>

          {/* Chat Detail View: Display block on mobile when view is 'chat', always visible on lg */}
          <div className={`w-full lg:col-span-7 xl:col-span-8 ${mobileView === 'list' ? 'hidden lg:block' : 'block'}`}>

            {/* Mobile Back Button */}
            <div className="lg:hidden mb-3">
              <button
                onClick={() => setMobileView('list')}
                className="text-xs font-bold text-blue-600 bg-blue-50 px-3.5 py-2 rounded-xl border border-blue-100 flex items-center gap-1.5 shadow-2xs"
              >
                ← Back to Messages
              </button>
            </div>

            <ChatDetailView contact={selected} me={user} onActivity={handleActivity} />
          </div>

        </div>

      </div>
    </div>
  );
}
