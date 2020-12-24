import React from 'react'
import './App.css';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import DoubleArrowRoundedIcon from '@material-ui/icons/DoubleArrowRounded';
import axios from 'axios'

class App extends React.Component {

  state = {
    numbersArray: [],
    numbersNumber: 1,
    sortOrder: 'ascending',
    sortedArray: []
  }

  //Incrémentation du nombre de numéros
  addNumber = () => {
    this.setState({
      numbersNumber: this.state.numbersNumber + 1
    })
  }

  //Render les inputs en boucle
  fillWithNumbers = () => {
    let nums = []
    for (let i = 0; i < this.state.numbersNumber; i++) {
      nums.push(
        <input autoFocus key={i} className="numberCase" placeholder="..." onChange={this.handleChangeInput.bind(this, i)}>
        </input>
      )
    }
    return nums
  }

  //Le handleChange des inputs qui contiennent les numéros à trier
  handleChangeInput(i, e) {
    let updatedArray = [...this.state.numbersArray]
    updatedArray[i] = e.target.value
    this.setState({
      numbersArray: updatedArray
    })
    console.log(e.target.value)
  }

  //Appel à l'algorithme de tri implémenté en backend(server-side)
  sortNumbers = async () => {
    await axios.post(`http://localhost:4000/sort?numbers=[${this.state.numbersArray}]&order=${this.state.sortOrder}`)
      .then(response => {
        console.log('response : ', response.data)
        this.setState({
          sortedArray: response.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  //Switch l'ordre de tri
  switchSortOrder = () => {
    this.setState({
      sortOrder: this.state.sortOrder === 'ascending' ? 'descending' : 'ascending'
    })
  }

  //Render les cases des résultats à droite
  fillWithResultCases = () => {
    let arr = []
    for (let i = 0; i < this.state.sortedArray.length; i++) {
      arr.push(
        <div className="resultNumberCase" key={i}>
          {this.state.sortedArray[i]}
        </div>
      )
    }
    return arr;
  }

  render() {
    return (
      <div className="App">
        <form className="thisForm">
          <div className="numbersContainer">
            {
              this.fillWithNumbers()
            }

            <div className="addNumber">
              <AddCircleIcon onClick={() => this.addNumber()} className="addButton" style={{ fontSize: '50px', color: '#003049', cursor: 'pointer', transition: '.2s' }}></AddCircleIcon>
            </div>
          </div>
          <div className="switchAndOrder" style={{ display: 'flex', alignSelf: 'center', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="switchOrder" style={{ position: 'relative', justifyContent: 'center', width: '60px', height: '20px', backgroundColor: '#999', border: '1px solid #bfbfbfaa', fontSize: '0.9rem', borderRadius: '12px', margin: '2px', marginLeft: 'auto', marginRight: 'auto', boxShadow: '0px 1px 3px #13131355' }}>
              <div className={"togglerButton " + this.state.sortOrder} onClick={() => this.switchSortOrder('descending')}>
                <DoubleArrowRoundedIcon style={{ width: '100%', height: '100%', fontSize: '50px', color: '#eae2b7', transform: 'rotate(-90deg)' }}></DoubleArrowRoundedIcon>
              </div>
            </div>
            <Button size="large" onClick={() => { this.sortNumbers() }} variant="contained" style={{ color: '#eae2b7', fontFamily: 'Prompt', fontSize: '1.25rem', backgroundColor: '#d62828', width: '50%', minHeight: '48px', display: 'flex', alignSelf: 'center', borderRadius: '12px' }}>
              Trier !
            </Button>
            <div className="arrows" style={{ alignSelf: 'center', marginTop: '10px' }}>
              <ArrowForwardIosIcon style={{ fontSize: '90px', color: '#f77f00cc' }}></ArrowForwardIosIcon>
              <ArrowForwardIosIcon style={{ fontSize: '90px', color: '#f77f00cc' }}></ArrowForwardIosIcon>
              <ArrowForwardIosIcon style={{ fontSize: '90px', color: '#f77f00cc' }}></ArrowForwardIosIcon>
            </div>
          </div>

          <div className="resultContainer">
            {
              this.fillWithResultCases()
            }
          </div>
        </form>

      </div>
    );
  }
}

export default App;
