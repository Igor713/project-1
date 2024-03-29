import { render, screen, fireEvent, userEvent } from "@testing-library/react";
import { Button } from '.';

describe('<Button />', () => {
  test('should render the button whith the text "Carregar mais posts"', () => {
    render(<Button text="Carregar mais posts" />);
    expect.assertions(1)

    const button = screen.getByRole('button', { name: /carregar mais posts/i });
    expect(button).toBeInTheDocument();
  });

  // Teste dois
  test('should call function on button click', () => {
    const fn = jest.fn();
    render(<Button text="Carregar mais posts" onClick={fn} />);
    const button = screen.getByRole('button', { name: /carregar mais posts/i });
    fireEvent.click(button);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  // Teste três
  // test('should be disabled when disabled is true', () => {
  //   const fn = jest.fn();
  //   render(<Button text="Carregar mais posts" disabled={false} onClick={fn} />);
  //   const button = screen.getByRole('button', { name: /carregar mais posts/i });
  //   expect(button).toBeDisabled();
  // });

  // Teste quatro
  test('should be enabled when disabled is false', () => {
    const fn = jest.fn();
    render(<Button text="Carregar mais posts" disabled={false} onClick={fn} />);
    const button = screen.getByRole('button', { name: /carregar mais posts/i });
    expect(button).toBeEnabled();
  });

  test('Should match snapshot', () => {
    const fn = jest.fn();
    const { container } = render(<Button text="Carregar mais posts" disabled={false} onClick={fn} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
