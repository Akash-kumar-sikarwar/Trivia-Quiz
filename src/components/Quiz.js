import React from 'react';
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa';

import Timer from './Timer';
import Question from './Question';
import {fetchQuestions}  from '../utils/Api';
import '../styles.css';

export default class Quiz extends React.Component{
    constructor(props){
        super();
        this.state = {
            questions: [],
            questionIndex: -1,
            currentQuestion: '',
            loading: true,
            score: 0,
            startTimer: false,
            resetTimer: false
        }
    }

    componentDidMount(){ 
        fetchQuestions(this.props.selectedCategory)
        .then((results)=>this.setState(({questionIndex})=>({
            questions: results,
            questionIndex: questionIndex + 1,
            currentQuestion: results[questionIndex + 1],
            loading: false,
            quizCompleted: false,
            startTimer: true,
            resetTimer: false
        })))
        
    }

    nextQuestion(){
        if(this.state.questionIndex == 4){
            this.setState({
                quizCompleted: true
            })
        }
        this.setState(({questionIndex, questions})=>({
            questionIndex: questionIndex + 1,
            currentQuestion: questions[questionIndex +1],
            resetTimer: true,
            startTimer: true,
        }))

    }
    prevQuestion(){
        this.setState(({questionIndex, questions})=>({
            questionIndex: questionIndex - 1,
            currentQuestion: questions[questionIndex - 1]
        }))
    }

    onSubmitHandler(){   
        this.setState(({questionIndex, questions})=>({
            questionIndex: questionIndex +1,
            currentQuestion: questions[questionIndex +1]
        }))
    }

    increamentScore(){
        this.setState(({score})=>({
            score: score + 1
        }))
    }

    decrementScore(){
        this.setState(({score})=>({
            score: score - 1
        }))
    }

    render(){
        const {currentQuestion, questionIndex, loading, startTimer, resetTimer} = this.state;
        console.log('state in Quiz', this.state);

        if(loading){
            return (
                <h2 className="center-text">Loading</h2>
            );
        }

        return(
            <>
                <h1 className="main-header center-text">Quiz</h1>
                {this.state.quizCompleted 
                        ? <div className="resultScore">
                            <h3 className="center-text">Score: {this.state.score} </h3>
                        </div>
                        :  (
                            <>
                                { startTimer && !resetTimer && <Timer startTimer={startTimer} nextQuestion={this.nextQuestion.bind(this)} resetTimer={this.state.resetTimer} stopReset={()=>{this.setState({resetTimer: false})}}></Timer>}
                                <div className="main-container">
                                    {(<ul className="question-container">
                                            <h3 className="header-sm center-text">{`Question ${questionIndex + 1} out of 30`}</h3>
                                            <div className="question-card">
                                                <Question 
                                                currentQuestion={currentQuestion} 
                                                questionIndex={questionIndex}
                                                increamentScore={this.increamentScore.bind(this)}
                                                decrementScore={this.decrementScore.bind(this)}
                                                startTimer={startTimer}
                                                resetTimer={()=>{this.setState({resetTimer: true, startTimer: false})}}/>
                                            </div>
                                        </ul>
                                    )}
                            
                                    {questionIndex >0 &&  
                                        <div className="btn prev-btn" >
                                            <FaChevronLeft size={50} onClick={this.prevQuestion.bind(this)}>Previous</FaChevronLeft>
                                        </div>
                                    }

                                    {questionIndex <29 &&  
                                        <div className="btn next-btn" >
                                            <FaChevronRight size={50} onClick={this.nextQuestion.bind(this)}>Next</FaChevronRight>
                                        </div>
                                    } 
                                </div>
                            </>
                            )}
            </>             
        );
    }
}