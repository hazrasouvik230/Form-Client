import React from 'react';
import PostLoginNavbar from './PostLoginNavbar/PostLoginNavbar';
import CreateFolder from './CreateFolder/CreateFolder';
import CreateFile from './CreateFile/CreateFile';
import { useParams } from 'react-router-dom';

const PostLoginPage = ({ userName, isDarkMode, setIsDarkMode }) => {
  const {userId} = useParams();
  return (
    <div>
      <PostLoginNavbar userId={userId} userName={userName} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <CreateFolder userId={userId} isDarkMode={isDarkMode} />
      <CreateFile isDarkMode={isDarkMode} />
    </div>
  );
};

export default PostLoginPage;