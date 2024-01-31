import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from 'next/server';
import { NextMiddlewareResult } from 'next/dist/server/web/types';

export type MiddlewareType = (
  request: NextRequest,
  event: NextFetchEvent,
  response: NextResponse
) => NextMiddlewareResult | Promise<NextMiddlewareResult>;

export type MiddlewareFactory = (middleware: MiddlewareType) => MiddlewareType;
