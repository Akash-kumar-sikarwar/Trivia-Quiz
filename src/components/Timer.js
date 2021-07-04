import React from 'react';

export default class Timer extends React.Component{

    constructor(props){
        super();

        this.state={
            seconds: 10,
            time: {}
        }

        this.timer = 0;
    }

    secondsToTime(secs){
        let hours = Math.floor(secs / (60 * 60));
        let hours_seconds_divisor = Math.floor(secs % (60 * 60));
        
        let minutes = Math.floor(hours_seconds_divisor / 60);
        let minutes_seconds_divisor = Math.floor(hours_seconds_divisor % 60);
        
        let seconds = Math.ceil(minutes_seconds_divisor);

        return {
            hours,
            minutes,
            seconds
        }

    }

    componentDidUpdate(){
        console.log('in CDU');
        if(this.props.resetTimer){
            this.setState({
                seconds: 10,
                time: {}
            }, this.props.stopReset);
        }
        
        if(this.props.startTimer && !this.props.resetTimer){
           this.timer = setInterval(this.decreaseSecond.bind(this), 1000);
       }
    }

    decreaseSecond(){
        //remove 1 sec from state so that re-render can happen
        let seconds = this.state.seconds - 1;    
        this.setState({
            seconds: seconds,
            timer: this.secondsToTime(seconds),  
        });

        // Check if we're at zero.
        if (seconds == 0) { 
            clearInterval(this.timer);
            this.props.nextQuestion();
            
        }
        
    }

    componentDidMount(){
        console.log('CDM in timer');
        let timeLeft = this.secondsToTime(this.state.seconds);
        this.setState({
            time: timeLeft
        });
        this.props.stopReset();
         if(this.props.startTimer && !this.props.resetTimer){
           this.timer = setInterval(this.decreaseSecond.bind(this), 1000);
       }
    }

    render(){
        console.log('timer state', this.state);
        console.log('timer props', this.props);
        const {hours, minutes } = this.state.time;
        const { seconds} = this.state;
        return (
            <h4 className="timer">{`Time left== ${hours} h : ${minutes} m : ${seconds} s`}</h4>
        );
    }
}