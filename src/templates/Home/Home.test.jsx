import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Home } from '.';

const handlers = [
  rest.get('*jsonplaceholder.typicode.com*', async (req, rest, ctx) => {
    return rest(ctx.json([
      {
        "userId": 1,
        "id": 1,
        "title": "title1",
        "body": "Sei lá",
        "url": 'img1.jpg',
      },
      {
        "userId": 1,
        "id": 2,
        "title": "title2",
        "body": "Muito menos",
        "url": 'img2.jpg',
      },
      {
        "userId": 1,
        "id": 3,
        "title": "title3",
        "body": "Alguma coisa",
        "url": 'img3.jpg',
      },
    ]));
  })
];

const server = setupServer(...handlers);

describe('<Home />', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => {
    server.close();
  });

  test('Should render search, posts and load more', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Nada encontrado com');

    expect.assertions(3);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/Digite algo/i);
    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole('img', { name: /title/i });
    expect(images).toHaveLength(3);

    const button = screen.getByRole('button', { name: /Carregar mais posts/i });
    expect(button).toBeInTheDocument();
  });

  test('Should search for posts', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Nada encontrado com');

    // expect.assertions(3);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/Digite algo/i);

    expect(screen.getByRole('heading', { name: 'title1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title2' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title3' })).toBeInTheDocument();

    userEvent.type(search, 'title1');
    expect(screen.getByRole('heading', { name: 'title1' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title2' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title3' })).not.toBeInTheDocument();

    userEvent.clear(search);
    expect(screen.getByRole('heading', { name: 'title1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title2' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title3' })).toBeInTheDocument();

    userEvent.type(search, 'post does not exist');
    expect(screen.getByText('Nada encontrado com')).toBeInTheDocument();
  });

  test('Should load more posts', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Nada encontrado com');

    // expect.assertions(3);

    await waitForElementToBeRemoved(noMorePosts);

    const button = screen.getByRole('button', { name: /Carregar mais posts/i });

    userEvent.click(button);
  });
});
