/**
 * Unit tests for LanguageSwitcher component
 * 
 * @jest-environment jsdom
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LanguageSwitcher from '../LanguageSwitcher';
import { useRouter } from 'next/router';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

describe('LanguageSwitcher', () => {
  const mockPush = jest.fn();
  const mockRouter = {
    pathname: '/es/eventos',
    asPath: '/es/eventos',
    push: mockPush,
    isReady: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue(mockRouter);
    localStorageMock.getItem.mockReturnValue(null);
    document.cookie = '';
  });

  it('should render language buttons', async () => {
    render(<LanguageSwitcher />);
    
    await waitFor(() => {
      expect(screen.getByText('ES')).toBeInTheDocument();
      expect(screen.getByText('CA')).toBeInTheDocument();
    });
  });

  it('should highlight current language', async () => {
    render(<LanguageSwitcher />);
    
    await waitFor(() => {
      const esButton = screen.getByText('ES').closest('button');
      expect(esButton).toHaveAttribute('aria-pressed', 'true');
    });
  });

  it('should call router.push when language is changed', async () => {
    render(<LanguageSwitcher />);
    
    await waitFor(() => {
      const caButton = screen.getByText('CA').closest('button');
      fireEvent.click(caButton);
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/ca/eventos');
    });
  });

  it('should set cookie when language is changed', async () => {
    render(<LanguageSwitcher />);
    
    await waitFor(() => {
      const caButton = screen.getByText('CA').closest('button');
      fireEvent.click(caButton);
    });

    await waitFor(() => {
      expect(document.cookie).toContain('NEXT_LOCALE=ca');
    });
  });

  it('should set localStorage when language is changed', async () => {
    render(<LanguageSwitcher />);
    
    await waitFor(() => {
      const caButton = screen.getByText('CA').closest('button');
      fireEvent.click(caButton);
    });

    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith('NEXT_LOCALE', 'ca');
    });
  });

  it('should preserve query parameters when changing language', async () => {
    const routerWithQuery = {
      ...mockRouter,
      asPath: '/es/eventos?filter=upcoming',
    };
    useRouter.mockReturnValue(routerWithQuery);

    render(<LanguageSwitcher />);
    
    await waitFor(() => {
      const caButton = screen.getByText('CA').closest('button');
      fireEvent.click(caButton);
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/ca/eventos?filter=upcoming');
    });
  });

  it('should not change language if same language is clicked', async () => {
    render(<LanguageSwitcher />);
    
    await waitFor(() => {
      const esButton = screen.getByText('ES').closest('button');
      fireEvent.click(esButton);
    });

    await waitFor(() => {
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  it('should have proper ARIA attributes', async () => {
    render(<LanguageSwitcher />);
    
    await waitFor(() => {
      const container = screen.getByRole('group');
      expect(container).toHaveAttribute('aria-label', 'Seleccionar idioma');
      
      const esButton = screen.getByText('ES').closest('button');
      expect(esButton).toHaveAttribute('aria-label', 'Cambiar a Español');
      expect(esButton).toHaveAttribute('aria-pressed', 'true');
      expect(esButton).toHaveAttribute('role', 'radio');
    });
  });

  it('should handle router pathname without language prefix', async () => {
    const routerWithoutLang = {
      ...mockRouter,
      pathname: '/events',
      asPath: '/events',
    };
    useRouter.mockReturnValue(routerWithoutLang);

    render(<LanguageSwitcher />);
    
    await waitFor(() => {
      // Should default to Spanish
      const esButton = screen.getByText('ES').closest('button');
      expect(esButton).toHaveAttribute('aria-pressed', 'true');
    });
  });
});
