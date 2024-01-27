import React from 'react';
import { GoogleLogin } from 'react-google-login';

const GoogleSignIn = () => {
  const responseGoogle = (response) => {
    // Handle Google response, send it to your backend
    console.log(response);
  };

  return (
    <GoogleLogin
      clientId="279515383721-8nu9a8ia9v7hanakjdo0egaator41po5.apps.googleusercontent.com"
      buttonText="Sign in with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleSignIn;
