import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';
import { MiddlewareType, MiddlewareFactory } from '../types';

/*
  Example for Multiple middleware usage
*/
export function nextMiddleware(
  middlewares: MiddlewareFactory[],
  index = 0
): MiddlewareType {
  const current = middlewares[index];

  if (current) {
    const next = nextMiddleware(middlewares, index + 1);
    return current(next);
  }

  return (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
  ) => {
    return response;
  };
}
