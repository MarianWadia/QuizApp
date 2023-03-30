import { useState } from "react"
import {questions} from "./data"
function App() {
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  function handleOptionClick(optionPressed){
    if(selectedOption) return;

    if(optionPressed.id === currentQuestion.answerId){
      setScore(score  + 1)
    }
    setSelectedOption(optionPressed);
  }

  function handleNextButton(){
    if(!selectedOption) return;

    if(currentQuestion.id === questions[questions.length -1 ].id){
      setFinished(true);
    }else{
      const indexOfCurrentQuestion = questions.findIndex((question)=>{
        return currentQuestion.id === question.id;
      })
      setCurrentQuestion(questions[indexOfCurrentQuestion+1]);
      setSelectedOption(null);
    }
  }
  return (
    <div className="App">
      <div className="quiz">
        <div className="info">
          <p className="class-counter">
            Question No. {currentQuestion.id}
            <span className="total">/{questions.length}</span>
          </p>
          <p className="question">
            {currentQuestion.question}
          </p>
        </div>
        <div className="options">
          {currentQuestion.options.map(
            (option,index)=>(
              <button 
                onClick={() => handleOptionClick(option)}
                disabled= {selectedOption !== null}
                className="option-btn"
                key={index}
              >
                {option.id}-{option.text}
              </button>
            )
            )}
            <button
              onClick={handleNextButton}
              className="next"
              disabled={!selectedOption}
            >
              {currentQuestion.id === questions[questions.length -1].id ? "Finish" : "Next"} 
            </button>
        </div>
      </div>
    </div>
  )
}

export default App
