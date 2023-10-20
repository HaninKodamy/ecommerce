import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN':
        return { user: action.payload.user, role: action.payload.role, token: action.payload.token };
      case 'LOGOUT':
        return { ...state, user: null, role: null }; 
      default:
        return state;
    }
  };
  
  export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
      user: null,
      role: null, 
      loading: true,
    });
  
    useEffect(() => {
      
      const storedUser = localStorage.getItem('user');
      const storedRole = localStorage.getItem('role'); 
        console.log("storedUser", storedUser)
      if (storedUser && JSON.parse(storedUser) && storedRole) {
        dispatch({ type: 'LOGIN', payload: { user: JSON.parse(storedUser), role: storedRole } });
      } else {
       
        dispatch({ type: 'LOGOUT' });
      }
    }, []);
  
    const login = (user, role, token) => {
        console.log(" login user", user);
        console.log(" login role", role);
      dispatch({ type: 'LOGIN', payload: { user, role, token } });
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('role', role); 
      localStorage.setItem('token', token); 
      console.log(role);
    };
  
    const logout = () => {
      dispatch({ type: 'LOGOUT' });
      localStorage.removeItem('user');
      localStorage.removeItem('role'); 
    };
  
    return (
      <AuthContext.Provider value={{ user: state.user, role: state.role, loading: state.loading, token: state.token, login, logout,   }}>
        {children}
      </AuthContext.Provider>
    );
  };