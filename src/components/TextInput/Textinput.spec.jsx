import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TextInput } from '.';

describe('<TextInput />', () => {
  test('should have a value of searchValue', () => {
    describe('<TextInput />', () => {

      test('should call handleChange function on each key pressed', () => {
        const fn = jest.fn();
        render(<TextInput handleChange={fn} searchValue="Nada encontrado com" />);

        const input = screen.getByPlaceholderText(/type your search/i);
        const value = 'o valor';

        userEvent.type(input, value);

        expect(input.value).toBe('Nada encontrado com');
        expect(fn).toHaveBeenCalledTimes(value.length);
      });

      test('should match snapshot', () => {
        const fn = jest.fn();
        const { container } = render(<TextInput handleChange={fn} searchValue="Nada encontrado com" />);
        expect(container).toMatchSnapshot();
      });
    })
  })
});
