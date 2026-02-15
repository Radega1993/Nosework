/**
 * Unit tests for AuthContext (logout, apiCall, loading)
 *
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import AuthContext from '../AuthContext';
import { AuthProvider } from '../AuthContext';

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    isReady: true,
    pathname: '/',
  }),
}));

const originalFetch = global.fetch;

describe('AuthContext', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    localStorage.clear();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('provides user, login, logout, apiCall and loading to children', async () => {
    let contextValue;
    const Consumer = () => {
      const auth = React.useContext(AuthContext);
      contextValue = auth;
      return <div data-testid="child">child</div>;
    };

    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('child')).toBeInTheDocument();
    });
    expect(contextValue).toBeDefined();
    expect(typeof contextValue.login).toBe('function');
    expect(typeof contextValue.logout).toBe('function');
    expect(typeof contextValue.apiCall).toBe('function');
    expect('loading' in contextValue).toBe(true);
  });

  it('logout clears localStorage and calls logout API', async () => {
    const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0QHQuY29tIiwicm9sZSI6InVzZXIiLCJleHAiOjk5OTk5OTk5OTl9.x';
    localStorage.setItem('token', validToken);
    localStorage.setItem('refreshToken', 'r');
    global.fetch.mockResolvedValue({ ok: true });

    let logoutFn;
    const Consumer = () => {
      const auth = React.useContext(AuthContext);
      logoutFn = auth.logout;
      return null;
    };

    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>
    );

    await waitFor(() => expect(logoutFn).toBeDefined());
    await logoutFn();
    await waitFor(() => {
      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('refreshToken')).toBeNull();
    });
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/auth/logout',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ refreshToken: 'r' }),
      })
    );
  });
});
