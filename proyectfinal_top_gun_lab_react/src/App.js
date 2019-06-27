import React, {Component} from 'react';
import axios from 'axios'
import  Greet from './components/Greet'
//import Employee from './Employee'
import {BASE_LOCAL_ENDPOINT} from './components/constants'

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      employes:{
          content: [],
          error: false
      },
     newEmployeeFrom: {
        name: "",
        job: "",
        area: "",
        imgSrc: "",
        points: ""
      },
      createEmployeeError: false
    } 
  }
  componentDidMount=()=>{
    this.getEmployees();
  }
  getEmployees =()=>{
    axios.get(`${BASE_LOCAL_ENDPOINT}/employee`)
    .then(response=>{
        this.setState({
          employes:{
            content:response.data,
            error:''
          },
          createEmployeeError: false
        })
    })
    .catch(error=>{
      this.setState({
        employes:{
          error:error.message
        }
      })
    })
  }
  createEmployee=(e)=>{
    e.preventDefault();
    const{
      newEmployeeFrom:{
        name,
        job,
        area,
        imgSrc,
        points      
      }
    }=this.state;
    axios.post(`${BASE_LOCAL_ENDPOINT}/employee`,{
      name,
      job,
      area,
      imgSrc,
      points
    },{
      headers:{"Content-Type": "application/json"}
    })
    .then(()=>{this.getEmployees() })
    .catch(()=> {this.setState({createEmployeeError:true})})
  }

  createTextInput =(value, field)=>(
    <input
        required
        type="text"
        placeholder={field}
        onChange={(e)=> this.handleInputChange(e.target.value, field)}
        value={value}
    />
  )

  handleInputChange =(value, field) =>{
    this.setState(prevState=>({
      newEmployeeFrom:{
        ...prevState.newEmployeeFrom,
        [field]:value   
      }
    }))
  }

  render(){
    const{
      createEmployeeError,
      employes:{content, error},
      newEmployeeFrom:{
        name,
        job,
        area,
        imgSrc,
        points  
      }
    }= this.state;
    if(error){
      return <div>Fetch Error: {error}</div>
    }
      return(
          <>
                <h2>Create Employee</h2>
            {createEmployeeError && <p>An error ocurred creating employee</p>}
            <form onSubmit={e=> this.createEmployee(e)}>
              {this.createTextInput(name,'name')}
              {this.createTextInput(job,'job')}
              {this.createTextInput(area,'area')}
              {this.createTextInput(imgSrc,'image')}
              {this.createTextInput(points,'points')}
              <button type="submit">Create</button>              
            </form>

            {content.map(({id, imgSrc, name})=>(
              <Greet key={id} imgSrc={imgSrc} name={name}/>
            ))}
        </>
      );

  }

}

export default App;
