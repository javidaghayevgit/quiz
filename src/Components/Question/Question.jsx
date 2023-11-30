import '../Question/Question.css'
import { useState } from 'react';
const Question = ({questionText,answerOptions,checkAnswer,selectedAnswer}) => {
  const handleAnswerClick = (event,answer) => {
    checkAnswer(answer);
  };
    return(
        <>
        <div className="question">
            <div className='questionText'>{questionText}</div>
            <ul className='answers'>
            {answerOptions.map((answer, index) => (
                <li key={index}
                onClick={(event) => handleAnswerClick(event,answer)}
                className={selectedAnswer === answer ? 'selected' : ''}
                >{answer.answer}</li>
                ))}
            </ul>
        </div>
                </>
    )
}
export default Question;