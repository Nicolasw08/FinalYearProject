import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuizTaker from '../../components/QuizTaker';
import { submitQuizAttempt } from '../../services/quizService';

jest.mock('../../services/quizService', () => ({
  submitQuizAttempt: jest.fn(),
}));

const quizData = {
  title: 'Science Quiz',
  questions: [
    {
      questionText: 'What planet do we live on?',
      options: ['Mars', 'Earth'],
      explanation: 'Earth is our home planet.',
    },
  ],
};

describe('QuizTaker integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn();
  });

  test('renders quiz title and answer options', () => {
    render(<QuizTaker quizData={quizData} shareToken="quiz-token" />);

    expect(screen.getByText('Science Quiz')).toBeInTheDocument();
    expect(screen.getByLabelText('Mars')).toBeInTheDocument();
    expect(screen.getByLabelText('Earth')).toBeInTheDocument();
  });

  test('submits selected answers through quizService', async () => {
    submitQuizAttempt.mockResolvedValue({ score: 1 });
        render(<QuizTaker quizData={quizData} shareToken="quiz-token" />);

    await userEvent.click(screen.getByLabelText('Earth'));
    await userEvent.click(screen.getByRole('button', { name: /submit quiz/i }));

    await waitFor(() => {
      expect(submitQuizAttempt).toHaveBeenCalledWith({
        shareToken: 'quiz-token',
        answers: { 0: 'Earth' },
      });
    });
  });

  test('shows explanation only after successful submission', async () => {
    submitQuizAttempt.mockResolvedValue({ score: 1 });
        render(<QuizTaker quizData={quizData} shareToken="quiz-token" />);

    expect(screen.queryByText('Earth is our home planet.')).not.toBeInTheDocument();

    await userEvent.click(screen.getByLabelText('Earth'));
    await userEvent.click(screen.getByRole('button', { name: /submit quiz/i }));

    await waitFor(() => {
      expect(screen.getByText('Earth is our home planet.')).toBeInTheDocument();
    });
  });
});
