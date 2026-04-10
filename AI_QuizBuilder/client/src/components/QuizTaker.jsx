import React, { useState } from 'react';
import { submitQuizAttempt } from '../services/quizService';

const QuizTaker = ({ quizData, shareToken = 'demo-token', onComplete }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerChange = (questionIndex, selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: selectedOption,
    }));
  };

  const handleSubmit = async () => {
    try {
      const result = await submitQuizAttempt({ shareToken, answers });
      setSubmitted(true);
      if (onComplete) {
        onComplete(result);
      }
    } catch (error) {
      alert(error.response?.data?.message || error.message || 'Failed to submit quiz');
    }
  };

  return (
    <div>
      <h1>{quizData.title}</h1>
      {quizData.questions.map((q, idx) => (
        <div key={idx}>
          <p>{q.questionText}</p>
          {Array.isArray(q.options) && q.options.length > 0 ? (
            q.options.map((option, optionIndex) => (
              <label key={optionIndex} style={{ display: 'block', marginBottom: '4px' }}>
                <input
                  type="radio"
                  name={`question-${idx}`}
                  value={option}
                  checked={answers[idx] === option}
                  onChange={() => handleAnswerChange(idx, option)}
                  disabled={submitted}
                />{' '}
                {option}
              </label>
            ))
          ) : (
            <p>No options available.</p>
          )}

          {submitted && q.explanation && <div className="alert-info">{q.explanation}</div>}
        </div>
      ))}
      {!submitted && <button onClick={handleSubmit}>Submit Quiz</button>}
    </div>
  );
};

export default QuizTaker;
