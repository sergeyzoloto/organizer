import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../context/UserContext';
import useFetch from '../../hooks/useFetch';
import CreateUser from '../User/CreateUser/CreateUser';
import LoginPage from '../User/LoginPage/LoginPage';

// styles
const styles = {
  CONTAINER: 'flex flex-col justify-center items-center h-screen p-4 gap-y-8',
  INPUT: 'border-2 border-[#9747FF] p-2 rounded w-full',
  PARAGRAPH: 'text-xl',
};

// component
const EmailValidation = () => {
  const navigate = useNavigate();
  const { setEmailAfterValidation } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [emailExistenceStatus, setEmailExistenceStatus] = useState({
    exists: 'unknown',
  });

  const validateEmail = email => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  // Give some time to the user before redirecting to the login or sign up page
  let timeoutId;
  const handleTypingStop = () => {
    if (validateEmail(email)) {
      setCheckingEmail(true);
      timeoutId = setTimeout(() => {
        performFetch();
      }, 3000);
    }
  };
  const handleTyping = () => {
    clearTimeout(timeoutId);
  };

  const { performFetch, cancelFetch } = useFetch(
    `/user/checkemail/${email}`,
    response => {
      setEmailExistenceStatus({ exists: response.exists });
      setCheckingEmail(false);
      setEmailAfterValidation(email);
      response.exists
        ? navigate('../../user/login')
        : navigate('../../user/create');
    }
  );

  useEffect(() => {
    handleTypingStop();
    handleTyping();

    if (validateEmail(email)) {
      handleTypingStop();
    }

    return () => {
      clearTimeout(timeoutId);
      cancelFetch();
    };
  }, [email]);

  return (
    <div className={styles.CONTAINER}>
      <p className={styles.PARAGRAPH}>
        Let’s check what you are going to do today!
      </p>
      <input
        className={styles.INPUT}
        placeholder='Enter your email'
        type='email'
        value={email}
        onChange={e => {
          const email = e.target.value;
          setEmail(email);
        }}
        onKeyUp={handleTypingStop}
        onKeyDown={handleTyping}
      />
      {checkingEmail && <div>Checking email...</div>}
    </div>
  );
};

export default EmailValidation;
