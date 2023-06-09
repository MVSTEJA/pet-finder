// import './wdyr'; // <-- first import

import { createRoot } from 'react-dom/client';

import './index.css';

import { QueryClientProvider } from '@tanstack/react-query';
import WebFont from 'webfontloader';
import { StrictMode } from 'react';
import App from './App-v3';

import queryClient from './queryClient';
import { FilterProvider } from './context/FilterProvider';
import { PaginateProvider } from './context/PaginateProvider';

WebFont.load({
  google: {
    families: ['Lexend'],
  },
});

let container: HTMLElement | null = null;

document.addEventListener('DOMContentLoaded', () => {
  if (!container) {
    container = document.getElementById('root') as HTMLElement;
    const root = createRoot(container);
    root.render(
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <FilterProvider>
            <PaginateProvider>
              <App />
            </PaginateProvider>
          </FilterProvider>
        </QueryClientProvider>
      </StrictMode>
    );
  }
});
