export async function signupUser(formData) {
    try {
      const res = await fetch('http://138.197.93.75:3001/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Signup failed');
      }
  
      return await res.json(); 
    } catch (err) {
      console.error('Signup error:', err);
      throw err;
    }
  }

  export async function loginUser(credentials) {
    const res = await fetch('http://138.197.93.75:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
      credentials: 'include', 
    });
  
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Login failed');
    }
  
    return await res.json(); 
  }
  
  