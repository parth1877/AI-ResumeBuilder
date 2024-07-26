import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react'
import GlobalApi from '../../service/GlobalApi';
import { ResumeCardItem } from './components/ResumeCardItem';

const Dashboard = () => {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getResumeList();
    }
  }, [user]);

  const getResumeList = async () => {
    setLoading(true);
    try {
      const res = await GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress);
      setResumeList(res.data.data);
    } catch (error) {
      console.error('Failed to fetch resumes', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Start creating your resume with AI</p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5'>
        <AddResume />
        {loading ? (
          [1, 2, 3, 4].map((item) => (
            <div key={item} className='h-[280px] rounded-lg bg-slate-200 animate-pulse'></div>
          ))
        ) : resumeList.length > 0 ? (
          resumeList.map((resume) => (
            <ResumeCardItem resume={resume} key={resume.documentId} refreshData={getResumeList} />
          ))
        ) : (
          <p>No resumes found</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
