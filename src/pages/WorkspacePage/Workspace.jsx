import React from 'react';
import { useLocation } from 'react-router-dom';
import WorkspaceNavbar from './WorkspaceNavbar/WorkspaceNavbar';
import Flow from './Flow/Flow';
import Response from './Response/Dashboard';

const Workspace = ({isDarkMode, setIsDarkMode}) => {
  const location = useLocation();

  console.log("Workspace: " + isDarkMode)

  return (
    <div>
      <WorkspaceNavbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      {location.pathname !== '/response' && <Flow isDarkMode={isDarkMode} />}
      {location.pathname !== '/workspace' && <Response isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>}
    </div>
  );
};

export default Workspace;