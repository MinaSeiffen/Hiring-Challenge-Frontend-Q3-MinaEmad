import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../Search';

describe('Search', () => {
  it('renders input with correct placeholder', () => {
    const mockSetSearch = jest.fn();
    render(<Search search="" setSearch={mockSetSearch} />);
    const input = screen.getByPlaceholderText('🔍 Search users...');
    expect(input).toBeTruthy();
  });

  it('displays the search value', () => {
    const mockSetSearch = jest.fn();
    render(<Search search="test query" setSearch={mockSetSearch} />);
    const input = screen.getByDisplayValue('test query');
    expect(input).toBeTruthy();
  });

  it('calls setSearch on input change', () => {
    const mockSetSearch = jest.fn();
    render(<Search search="" setSearch={mockSetSearch} />);
    const input = screen.getByPlaceholderText('🔍 Search users...');
    fireEvent.change(input, { target: { value: 'new search' } });
    expect(mockSetSearch).toHaveBeenCalledWith('new search');
  });
});
