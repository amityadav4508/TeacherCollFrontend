//78eo1izdyn46ku
import React, { useState } from 'react';

import { useLinkedIn } from 'react-linkedin-login-oauth2';
// You can use provided image shipped by this package or using your own
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';

export function LinkedInPage() {
  const { linkedInLogin } = useLinkedIn({
    clientId: '78eo1izdyn46ku',
    redirectUri: `https://teachercool.com/login`, // for Next.js, you can use `${typeof window === 'object' && window.location.origin}/linkedin`
    onSuccess: (code) => {
      console.log(code);
      console.log(code,'code')
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <img
      onClick={linkedInLogin}
      src={linkedin}
      alt="Sign in with Linked In"
      style={{ maxWidth: '180px', cursor: 'pointer' }}
    />
  );
}