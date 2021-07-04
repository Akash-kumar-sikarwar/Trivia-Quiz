import React from 'react';
import {AiFillCloseCircle, AiFillCheckCircle} from 'react-icons/ai';

import '../styles.css';

import {htmlDecode, shuffle} from '../utils/Api';

export default class Question extends React.Component{

    constructor(props){
        super();

        this.state = {
            selectedAnswer: '',
            selectedAnswerIndex: -1,
            correctAnswer: '',
            correctAnswerIndex: -1,
            options: [],
            result: false,
            questionIndex: -1
        }
    }

    showResult(){
        const {selectedAnswerIndex, correctAnswerIndex} = this.state;
        if(selectedAnswerIndex === correctAnswerIndex){
            console.log('correct answer');
            this.props.increamentScore();
            this.setState({
                result: true,
                selectedAnswer: ''
            })
        }else{
             this.setState({
                result: true,
                selectedAnswer: ''
            })
            this.props.decrementScore();
            console.log('wrong answer');
        }
    }
    
   componentDidUpdate(nextProps){
    //    console.log('inside CDU');
    //    console.log('this.props');
       if(this.state.questionIndex != this.props.questionIndex){
        const answerOptions =  [this.props.currentQuestion.correct_answer, 
            ...this.props.currentQuestion.incorrect_answers];
            shuffle(answerOptions);
            this.setState({
                options: answerOptions,
                selectedAnswer: '',
                selectedAnswerIndex: -1,
                result: false,
                correctAnswer: this.props.currentQuestion.correct_answer,
                correctAnswerIndex: -1,
                questionIndex:this.props.questionIndex
           }, this.storeCorrectAnswer.bind(this));
       }
   }

   storeCorrectAnswer(){
       //storing index of correct answer to show result of question
        const {correctAnswer} = this.state;
       this.state.options.map((option, index)=>{
           if(option == correctAnswer){
            //    console.log('correct answer stored in state');
                this.setState({
                    correctAnswer: option,
                    correctAnswerIndex: index
                })
            }
        })
   }

    componentDidMount(){
        // console.log('CDM');
        const answerOptions =  [this.props.currentQuestion.correct_answer, 
            ...this.props.currentQuestion.incorrect_answers];
        shuffle(answerOptions);
        this.setState({
            questionIndex: this.props.questionIndex,
            options: answerOptions,
            correctAnswer: this.props.currentQuestion.correct_answer
        },  this.storeCorrectAnswer.bind(this))
        // console.log('after setState in CDM');
    }
    
    render(){
        const {currentQuestion, questionIndex} = this.props;
        const {correct_answer, question, incorrect_answers} = currentQuestion;
        // console.log('state in Question', this.state);
        // console.log('props', this.props);

        const {result, correctAnswerIndex, selectedAnswerIndex } = this.state;

        return (
            <>
                <h4 className="questionText">{htmlDecode(question)}</h4>
                {/* <form onSubmit={this.onSubmit.bind(this)}> */}
                <ul className="answer-list">
                    {this.state.options.map((option, index)=>{
                        let style = 'normal';
                        if(result && index == correctAnswerIndex ){
                            style = 'green';
                        }else if(result && selectedAnswerIndex != correctAnswerIndex){
                            style = "red";
                        }
                        return (
                            <li key={index}>
                                <AnswerButton style ={style} option={option} index={index} onClick={ ()=>{
        this.setState({
            selectedAnswer: option,
            selectedAnswerIndex: index
        }, this.showResult);
        
        console.log('Button clicked, selected AnswerIndex :' + this.state.selectedAnswerIndex);
        
    }}/>
                            </li>
                            )
                        })}
                </ul>
                {/* </form> */}
            </>
        );
    }
}


function AnswerButton({option, index, onClick, style}){
    if(style == 'red'){
        return (
            <button className="answer-btn redButton" 
            value={option} key={index} 
            onClick={onClick}>
            <AiFillCloseCircle />
            {htmlDecode(option)}
            </button>
        )

    }else if(style == 'green'){
        return (
            <button className="answer-btn greenButton" 
            value={option} key={index} 
            onClick={onClick}>
                <AiFillCheckCircle />
                {htmlDecode(option)}
            </button>
        )
    }else{
        return (
            <button className="answer-btn" 
            value={option} key={index} 
            onClick={onClick}>
                <span className="optionNumber">{String.fromCharCode(65 + index)}</span>
                {htmlDecode(option)}
            </button>
        )
    }

}