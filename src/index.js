import React from 'react';
import ReactDOM from 'react-dom';

import Category from './components/Category';
import Quiz from './components/Quiz';
import './styles.css';

class App extends React.Component{
    constructor(props){
        super();
        
        this.state={
            selectedCategory: '',
            categories: ['sports', 'animals', 'celebrities', 'history','general knowledge', 'music', 'maths', 'geography']
        }
    }

    onclick(event){
        this.setState({
            selectedCategory: event.target.value
        })
    }

    render(){
        console.log('App state', this.state);
        const {selectedCategory, categories} = this.state;
        return(
            <div className="container">
              { selectedCategory 
              ? <Quiz selectedCategory={selectedCategory}></Quiz>
              :<Category 
                categories={categories}
                selectedCategory={(event)=>{this.setState({ selectedCategory: event.target.alt}); console.log('event target', event.target);}}></Category>}

                
            </div>
        )
    }       
}   

ReactDOM.render(<App></App>, document.getElementById('app'));