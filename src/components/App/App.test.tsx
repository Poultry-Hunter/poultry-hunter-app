import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { App } from './App';

const mockStore = configureStore();

test('count text is in document', async () => {
  render(
      <App />
  );
  const counter = await waitFor(() => screen.getByText(/Count: 0/));
  expect(counter).toBeInTheDocument();
});
