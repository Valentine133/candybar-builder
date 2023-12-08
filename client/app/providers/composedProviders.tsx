'use client';

import compose from 'compose-function';
import { ReduxProvider } from './reduxProvider';

export const ComposedProviders = compose(
  // add another providers
  ReduxProvider,
);
