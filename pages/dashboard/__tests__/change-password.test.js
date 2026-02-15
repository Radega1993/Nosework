/**
 * Tests for change-password page (form, validation)
 *
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import ChangePasswordPage from '../change-password';

jest.mock('next/router', () => ({
  useRouter: () => ({ push: jest.fn(), pathname: '/dashboard/change-password' }),
}));

jest.mock('@/contexts/AuthContext', () => ({
  __esModule: true,
  default: React.createContext({
    user: { id: 1, email: 'u@t.com' },
    apiCall: jest.fn(),
  }),
}));

jest.mock('@/components/Navbar', () => () => <nav data-testid="navbar">Navbar</nav>);

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({ json: async () => ({ csrfToken: 'test-csrf' }) });
});

describe('Change password page', () => {
  it('renders form with current password, new password and confirm fields', () => {
    render(<ChangePasswordPage />);
    expect(screen.getByPlaceholderText('Contraseña actual')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Nueva contraseña/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirmar nueva contraseña')).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<ChangePasswordPage />);
    expect(screen.getByRole('button', { name: 'Cambiar Contraseña' })).toBeInTheDocument();
  });
});
