import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import { useState } from 'react';

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <main>
      <div>
        <h1>Auth Page</h1>
        <button
          onClick={() => {
            setShowLogin(!showLogin);
          }}
        >
          {showLogin ? 'Sign Up' : 'Login'}
        </button>
      </div>
      {showLogin ? (
        <LoginForm setUser={setUser} />
      ) : (
        <SignUpForm setUser={setUser} />
      )}
    </main>
  );
}

// import SignUpForm from '../../components/SignUpForm/SignUpForm'
// import LoginForm from '../../components/LoginForm/LoginForm'
// import React, { useState } from 'react';


// export default function AuthPage() {
//   const [isLoggingIn, setIsLoggingIn] = useState(false)
//   return (
//     <main>
//       <h1>Auth Page</h1>
//       {isLoggingIn ? <LoginForm /> :
//         <SignUpForm />}
//       <button onClick={()=>{
//         setIsLoggingIn(!isLoggingIn)
//       }}>{isLoggingIn ? 'Would you like to signup?':'Already had an account?'}</button>
//     </main>
//   )
// }