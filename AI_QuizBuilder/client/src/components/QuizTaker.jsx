import React, { useState } from 'react';

const QuizTaker = ({ quizData }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    // Logic to POST to /share/{token}/attempts
    setSubmitted(true);
  };

  return (
    <div>
      <h1>{quizData.title}</h1>
      {quizData.questions.map((q, idx) => (
        <div key={idx}>
          <p>{q.questionText}</p>
          {/* Options rendered here */}
          
          {/* Security Rule: Only show explanation AFTER submission */}
          {submitted && q.explanation && (
            <div className="alert-info">{q.explanation}</div>
          )}
        </div>
      ))}
      {!submitted && <button onClick={handleSubmit}>Submit Quiz</button>}
    </div>
  );
};

export default QuizTaker;