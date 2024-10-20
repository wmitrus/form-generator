/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';

import { POST } from '@/app/api/log/route';
import { logToFile } from '@/lib/utils';
import logger from '@/pino';

// Mock the logToFile function
jest.mock('@/lib/utils', () => ({
  logToFile: jest.fn(),
}));

// Mock console.log to suppress output
jest.spyOn(console, 'log').mockImplementation(() => {});

describe('POST function', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocks before each test

    // Mock the logger
    // jest.spyOn(logger, 'error').mockImplementation(() => ({
    //   error: jest.fn(),
    // }));
  });

  it('should return a 201 status code and a success message', async () => {
    // Mock the request body
    const mockJson = jest.fn().mockResolvedValue({ message: 'Test log message' });

    // Mock the NextRequest object
    const mockRequest = {
      json: mockJson,
    };

    // Mock the NextResponse object
    const mockResponse = await POST(mockRequest as unknown as NextRequest);

    // Expect the logToFile function to be called once
    expect(logToFile).toHaveBeenCalledTimes(1);

    // Expect the logToFile function to be called with the correct arguments
    expect(logToFile).toHaveBeenCalledWith({ message: 'Test log message' });

    // Check the response status and structure
    expect(mockResponse.status).toBe(201);
    expect(await mockResponse.json()).toEqual({ data: '', success: true });
  });

  it('should return a 201 status with success true when logToFile succeeds', async () => {
    const mockReq = new NextRequest('http://localhost/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'value' }),
    });

    (logToFile as jest.Mock).mockResolvedValueOnce(undefined);

    const response = await POST(mockReq);
    const jsonResponse = await response.json();

    expect(response.status).toBe(201);
    expect(jsonResponse).toEqual({ data: '', success: true });
    expect(logToFile).toHaveBeenCalledWith({ key: 'value' });
  });

  it('should return a 500 status code and an error message when logToFile fails', async () => {
    // Mock the request body
    const mockJson = jest.fn().mockResolvedValue({ message: 'Test log message' });

    // Mock the NextRequest object
    const mockRequest = {
      json: mockJson,
    };

    const mockError = new Error('Append file error');

    jest.spyOn(logger, 'error').mockImplementation(() => {}); // Mock logger.error

    // Make logToFile throw an error
    (logToFile as jest.Mock).mockRejectedValue(mockError);

    // Call the POST function
    const mockResponse = await POST(mockRequest as unknown as NextRequest);

    // Expect the logToFile function to be called once
    expect(logToFile).toHaveBeenCalledTimes(1);

    expect(logger.error).toHaveBeenCalledWith(mockError);

    // Check the response status and structure
    expect(mockResponse.status).toBe(500);
    expect(await mockResponse.json()).toEqual({
      err: { message: 'Append file error' },
      success: false,
    });
  });

  it('should return a 500 status with success false when logToFile fails', async () => {
    const mockReq = new NextRequest('http://localhost/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'value' }),
    });

    // Mock logger.error
    jest.spyOn(logger, 'error').mockImplementation(() => {});

    const mockError = new Error('Logging error');
    (logToFile as jest.Mock).mockRejectedValueOnce(mockError);

    const response = await POST(mockReq);
    const jsonResponse = await response.json();

    expect(logger.error).toHaveBeenCalledWith(mockError);

    expect(response.status).toBe(500);
    expect(jsonResponse).toEqual({ err: { message: mockError.message }, success: false });
    expect(logToFile).toHaveBeenCalledWith({ key: 'value' });
  });
});
