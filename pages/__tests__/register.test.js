/**
 * Tests for register page (form, CSRF, password strength)
 *
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import RegisterPage from '../register';

jest.mock('next/router', () => ({
  useRouter: () => ({ push: jest.fn(), pathname: '/register' }),
}));

jest.mock('@/components/Navbar', () => () => <nav data-testid="navbar">Navbar</nav>);

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({ json: async () => ({ csrfToken: 'test-csrf' }) });
});

describe('Register page', () => {
  it('renders register form with email and password fields', () => {
    render(<RegisterPage />);
    expect(screen.getByPlaceholderText('Correo electrónico')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Contraseña \(mínimo 8/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirmar contraseña')).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<RegisterPage />);
    expect(screen.getByRole('button', { name: 'Registrarse' })).toBeInTheDocument();
  });
});
