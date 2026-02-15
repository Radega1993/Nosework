/**
 * Tests for login page (form, CSRF, validation)
 *
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginPage from '../login';

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    isReady: true,
    pathname: '/login',
  }),
}));

jest.mock('@/contexts/AuthContext', () => ({
  __esModule: true,
  default: React.createContext({ user: null, login: jest.fn(), loading: false }),
}));

jest.mock('@/components/Navbar', () => () => <nav data-testid="navbar">Navbar</nav>);

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({ json: async () => ({ csrfToken: 'test-csrf' }) });
});

describe('Login page', () => {
  it('renders login form with email and password fields', () => {
    render(<LoginPage />);
    expect(screen.getByPlaceholderText('Correo electrónico')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Contraseña')).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<LoginPage />);
    expect(screen.getByRole('button', { name: 'Iniciar Sesión' })).toBeInTheDocument();
  });
});
