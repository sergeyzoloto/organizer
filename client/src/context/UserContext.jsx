import PropTypes from 'prop-types';
import { createContext, useState } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [emailAfterValidation, setEmailAfterValidation] = useState('');
  const [userInfo, setUserInfo] = useState({});
  return (
    <UserContext.Provider
      value={{
        userInfo,
        setUserInfo,
        emailAfterValidation,
        setEmailAfterValidation,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

UserContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
