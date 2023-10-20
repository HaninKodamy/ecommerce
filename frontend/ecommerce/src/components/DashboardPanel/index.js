import React, { useEffect, useState } from 'react'
import { AuthContext } from '../authContext';
import { useContext } from 'react'
import Overview from './overview';

function DashboardPanel() {
  const { user, role, loading  } = useContext(AuthContext);
  const [access, setAccess] = useState(false);
  
  useEffect(() => {
    console.log("ff")
    if (!loading) {
      // If user data is available, check access
      if (user) {
        setAccess(true);
      }
    }
  }, [user, loading]);

  return (
    <>
      {loading ? (
        <div>Loading...</div> 
      ) : access ? (
        <Overview/>
      ) : (
        <>
          <div>No access</div>
          <div>You are not allowed to access this page</div>
        </>
      )}
    </>
  )
}

export default DashboardPanel