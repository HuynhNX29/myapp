import { Spin } from 'antd';
import React, { useState, useEffect } from 'react';
import LoginScreen from './screens/LoginScreen.jsx';
import TasksScreen from './screens/TasksScreen.jsx';

const App = () => {

  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    const res = localStorage.getItem('user');

    if (res) {
      const user = JSON.parse(res)
      setIsLoading(true)

      if (user.accesstoken) {
        setIsLogin(true)

      } else {
        setIsLogin(false)
      }


      setIsLoading(false)
    }

  }, []);


  return (
    <div>
      {
        isLoading ? <Spin /> : isLogin ?
          <TasksScreen /> : <LoginScreen />
      }
    </div>
  );
}

export default App;
