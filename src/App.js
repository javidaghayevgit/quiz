import './App.css';
import { useEffect, useState} from 'react'
import  Question  from './Components/Question/Question'
import { questions } from './db';
import { Button } from 'antd';
function App() {
  let [currentIndex,setCurrentIndex] = useState(0);
  const isVisibleButton = currentIndex !==0;
  let [pageIndex,setPageIndex] = useState(1);
  const isVisibleResult = currentIndex<=4
  const [result,setResult] = useState(0)
  const [seconds, setSeconds] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));

// interval
  useEffect(() => {
    let timerInterval;

    const startTimer = () => {
      timerInterval = setInterval(() => {
        if (seconds === 0) {
          clearInterval(timerInterval);
          setIsTimerRunning(false); 
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    };

    if (isTimerRunning) {
      startTimer();
    } else {
      clearInterval(timerInterval);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [isTimerRunning, seconds]);

// nextButton Function

  function nextPageFunc(){
    if(pageIndex===5){
      setPageIndex(5)
    }else{
      setPageIndex(pageIndex+1)
    }
      setCurrentIndex(currentIndex+1)
  }

// PreviousButton Function    

  function previousPageFunc(){
    if(pageIndex===1){
      setPageIndex(1)
    }else{
      setPageIndex(pageIndex-1)
    }
    if(currentIndex === 0){
      setCurrentIndex(0)
    }else{
      setCurrentIndex(currentIndex - 1)
    }
  }

  function checkAnswer(answer) {
      const updatedAnswers = [...selectedAnswers];
      updatedAnswers[currentIndex] = answer;
      setSelectedAnswers(updatedAnswers);
      if (answer.isCorrect) {
        setResult(result + 1);
      }else{
        setResult(result - 1);
      }
  }
  return (
    <div className="app">
      <div className='quizBox'>
          {isVisibleResult && seconds!==0?<div className='header'>
          <h3>AweSome Quiz Application</h3>
          <div className='timer'>
            <span>Time Left</span>
            <div className='time'>{seconds}</div>
          </div>
        </div>:null} 
        {isVisibleResult && seconds!==0?questions.map((question,questionIndex)=>{
          const isVisibleQuestion = questionIndex === currentIndex;
          return (
            isVisibleQuestion? <Question 
            key={question.id}
            questionText={question.questionText}
            answerOptions={question.answerOptions}
            checkAnswer={checkAnswer}
            selectedAnswer={selectedAnswers[currentIndex]}
            />
            : !isVisibleQuestion
            )
          })
        : <div className='result'>Result: {result}
{isVisibleButton? (
              <Button onClick={() => previousPageFunc()} type="primary">
                Previous Page
              </Button>
            ) : null}
        </div>}
       {isVisibleResult && seconds!==0?<div className='pages'>
        <span>{pageIndex} of 5 Questions</span>
        <div className='buttons'>
          {
            isVisibleButton?<Button onClick={()=>previousPageFunc()} type="primary">Previous Page</Button>:!isVisibleButton
          }
        <Button onClick={()=>nextPageFunc()} type="primary">Next Page</Button>
        </div>
        </div>:null}
      </div>
    </div>
  );
}

export default App;