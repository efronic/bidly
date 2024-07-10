'use client';

import { useEffect } from 'react';
import { Register } from './actions';

export function RegisterPage() {
  useEffect(() => {
    async function runRegister() {
      console.log('Registering...');
      await Register();
    }
    runRegister();
  }, []);
  return (
    <div>
      <h1>Registering...</h1>
    </div>
  );
}
export default RegisterPage;