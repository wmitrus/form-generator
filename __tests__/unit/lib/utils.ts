/**
 * @jest-environment jsdom
 */
import fs from 'fs/promises';

import { cn } from '@/lib/utils';
import { logToFile } from '@/lib/utils';
import logger from '@/pino';

jest.mock('fs/promises', () => ({
  appendFile: jest.fn(), // Mocking appendFile as a Jest mock function
}));

jest.mock('@/pino', () => ({
  error: jest.fn(),
}));

// Mock console.log to suppress output
jest.spyOn(console, 'log').mockImplementation(() => {});

describe('utils', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear previous mocks before each test
  });

  describe('cn', () => {
    it('should merge class names correctly', () => {
      const result = cn('class1', 'class2', { class3: true }, 'class4');
      expect(result).toBe('class1 class2 class3 class4');
    });

    it('should handle falsy values', () => {
      const result = cn('class1', false, 'class2', null, 'class3');
      expect(result).toBe('class1 class2 class3');
    });
  });
});

describe('logToFile', () => {
  test('should append message to file', async () => {
    const message = 'Test message';

    const mockAppendFile = jest.spyOn(fs, 'appendFile');
    mockAppendFile.mockImplementationOnce(async () => {
      // Simulate actual behavior (optional)
    });

    const mockLogError = jest.spyOn(logger, 'error');
    mockLogError.mockImplementationOnce(async () => {});

    await logToFile(message);

    expect(mockAppendFile).toHaveBeenCalledWith(
      './logs/client.log',
      '\n{"message":"Test message"}',
      'utf-8',
    );
  });

  test('should handle appendFile errors', async () => {
    const message = 'Error message';
    const mockError = new Error('Append file error');

    const mockAppendFile = jest.spyOn(fs, 'appendFile');
    mockAppendFile.mockImplementationOnce(async () => {
      throw mockError;
    });

    await expect(logToFile(message)).rejects.toThrow(mockError);
  });
});
