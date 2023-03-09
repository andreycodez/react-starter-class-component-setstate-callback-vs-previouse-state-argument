import React from 'react';

class Main extends React.Component {
  state = {
    someVal: 0,
  };

  /** 
    ==== USING A CALLBACK IN SET_STATE DISADVANTAGES:
    * 2 rerenders + you can easily get into callback hell
    * The updateValueForCallback function will be executed after the state is updated with the onclick event
    * so you don't have access to the final state value in both to make actions with the value
  */ 
  
  updateValueForCallback = () => {
    console.log(this.state.someVal);
    this.setState({ someVal: this.state.someVal + 3 });
    console.log('Render happened!');
  };

  handleSomeValWithCallback = (e) => {
    e.preventDefault();
    this.setState({ someVal: this.state.someVal + 1 }, () =>
      this.updateValueForCallback()
    );
    console.log('Render happened!');
  };


  /** 
    ==== USING A PREV AS PREVIOUS (current, before update) STATE OBJECT:
    * A single rerender
    * The updateValueForPrev function can be moved into helpers file to make the component clean
    * You have access to both values within the function (the previous and the new calculated value)
  */ 

  // Using previous state as argument
  // A single rerender, the updateValueForPrev function can be moved into helpers file to make the component cleaner
  updateValueForPrev = (value) => {
    return value + 3;
  };

  handleSomeValWithPrev = (e) => {
    e.preventDefault();
    this.setState((prev) => ({
      someVal: 1 + this.updateValueForPrev(prev.someVal),
    }));
    console.log('Render happened!');
  };

  render() {
    return (
      <>
        <button onClick={(e) => this.handleSomeValWithCallback(e)}>
          Add 4 (as 1 and then 3) to state value with Callback happening after
        </button>
        <br />
        <br />
        <button onClick={(e) => this.handleSomeValWithPrev(e)}>
          Add 4 (as 1 and then 3) to state value with previous state
        </button>
      </>
    );
  }
}

export default Main;
