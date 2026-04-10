import axios from 'axios';
import { submitQuizAttempt } from '../../services/quizService';

jest.mock('axios');

describe('quizService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('submitQuizAttempt posts answers to the share attempts endpoint', async () => {
    axios.post.mockResolvedValue({ data: { score: 2 } });

    const result = await submitQuizAttempt({
      shareToken: 'quiz-token',
      answers: { 0: 'A', 1: 'B' },
    });

    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:5000/api/share/quiz-token/attempts',
      { answers: { 0: 'A', 1: 'B' } }
    );
    expect(result).toEqual({ score: 2 });
  });

  test('submitQuizAttempt throws an error when share token is missing', async () => {
    await expect(submitQuizAttempt({ answers: { 0: 'A' } })).rejects.toThrow('Missing share token');
    expect(axios.post).not.toHaveBeenCalled();
  });

  test('submitQuizAttempt bubbles up API failures', async () => {
    const apiError = new Error('Network error');
    axios.post.mockRejectedValue(apiError);

    await expect(
      submitQuizAttempt({ shareToken: 'quiz-token', answers: { 0: 'A' } })
    ).rejects.toThrow('Network error');
  });
});
