import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
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

    await waitForElementToBeRemoved(noMorePosts);
    screen.debug();
  });
});
