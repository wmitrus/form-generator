/**
 * @jest-environment node
 */

/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';

// import * as fs from 'fs/promises';
import { createMocks } from 'node-mocks-http';

// Import the API methods
import { POST } from '@/app/api/log//route';
import logger from '@/pino';

// Mock console.log to suppress output
jest.spyOn(console, 'log').mockImplementation(() => {});

describe('API Route: /log', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock the logger
    jest.spyOn(logger, 'error').mockImplementation(() => ({
      error: jest.fn(),
    }));
  });

  test('POST method: should return a 201 status code and a success message', async () => {
    const body = { message: 'Test log message' };
    const successSchema = {
      type: 'object',
      properties: {
        data: { type: 'string' },
        success: { type: 'boolean' },
      },
      required: ['data', 'success'],
    };

    const appendFileSpy = jest
      .spyOn(require('fs/promises'), 'appendFile')
      .mockResolvedValueOnce(undefined);

    const { req } = createMocks<NextRequest>({
      method: 'POST',
      body: body,
    });

    // Add the json method to the mock request object
    req.json = jest.fn().mockResolvedValue(req.body);

    // Create a custom mock response object
    const res: any = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      statusCode: 200, // Default status code
      _data: null, // Placeholder for response data
    };

    // Mock the NextResponse.json method
    jest.spyOn(NextResponse, 'json').mockImplementation((data, options) => {
      res.json(data);
      res.statusCode = options?.status || 200;
      res._data = data;
      return res;
    });

    // Call the POST function with the mock request and response
    await POST(req as NextRequest);

    // Extract the response data from the mock
    const responseData = res._data;
    const responseStatus = res.statusCode;

    expect(responseStatus).toBe(201);
    expect(responseData).toMatchSchema(successSchema);

    expect(appendFileSpy).toHaveBeenCalledWith(
      './logs/client.log',
      expect.stringContaining('Test log message'),
      'utf-8',
    );

    // Restore the original implementation
    appendFileSpy.mockRestore();
    (NextResponse.json as jest.Mock).mockRestore();
  });

  it('POST method: should return a 500 status code for appendFile error', async () => {
    const errorSchema = {
      type: 'object',
      properties: {
        err: { type: 'object' },
        success: { type: 'boolean' },
      },
      required: ['err', 'success'],
    };

    const error = new Error('Append file error');
    // Spy on the appendFile function and mock its implementation to throw an error
    const appendFileSpy = jest
      .spyOn(require('fs/promises'), 'appendFile')
      .mockRejectedValueOnce(error);

    const { req } = createMocks<NextRequest>({
      method: 'POST',
      body: { message: 'Test log message' },
    });

    // Add the json method to the mock request object
    req.json = jest.fn().mockResolvedValue(req.body);

    // Create a custom mock response object
    const res: any = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      statusCode: 200, // Default status code
      _data: null, // Placeholder for response data
    };

    // Mock the NextResponse.json method
    jest.spyOn(NextResponse, 'json').mockImplementation((data, options) => {
      res.json(data);
      res.statusCode = options?.status || 200;
      res._data = data;
      return res;
    });

    // Call the POST function with the mock request and response
    await POST(req as NextRequest);

    // Extract the response data from the mock
    const responseData = res._data;
    const responseStatus = res.statusCode;

    expect(responseStatus).toBe(500);
    expect(responseData).toMatchSchema(errorSchema);

    expect(appendFileSpy).toHaveBeenCalledWith(
      './logs/client.log',
      expect.stringContaining('Test log message'),
      'utf-8',
    );

    // Restore the original implementation
    appendFileSpy.mockRestore();
    (NextResponse.json as jest.Mock).mockRestore();
  });
});
