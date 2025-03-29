export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) throw new Error('No refresh token available');

    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) throw new Error('Token refresh failed');

    const data = await response.json();

    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('expires_at', data.expiresAt);
    localStorage.setItem('refresh_token', data.refreshToken);

    return data.accessToken;
  } catch (error) {
    throw error;
  }
}; 