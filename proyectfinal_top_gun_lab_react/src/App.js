import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import  Greet from './components/Greet'
import Employee from './components/Employee'

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
        employes:{
          content: [],
          error: false
        }
    },
    newEmployeeFrom={
      //..............
    },
    createEmployeeError= false
  }
  componentDidMount=()=>{
    this.getEmployees();
  }
  getEmployees =()=>{
    Axios.get(`${BASE_LOCAL_ENDPOINT  }/employee`)
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
        location,
        status,
        species,
        gender,
        origin,
        image        
      }
    }=this.state;
    axios.post(`${BASE_LOCAL_ENDPOINT}/employee`,{
      name,
      location,
      status,
      species,
      gender,
      origin,
      image   
    },{
      headers:{"Content-Type": "application/json"}
    })
    .then(()=>{this.getEmployees() })
    .catch(()=> {this.setState({createEmployeeError:true})})
  }

  createTextInput =(value, field)=>{
    <input
        required
        type="text"
        placeholder={field}
        onChange={(e)=> this.handleInputChange(e.target.value, field.)}
    />
  }

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
        location,
        status,
        species,
        gender,
        origin,
        image   
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
              {this.createTextInput(location,'location')}
              {this.createTextInput(status,'status')}
              {this.createTextInput(species,'species')}
              {this.createTextInput(origin,'origin')}
              {this.createTextInput(image,'image')}
            </form>

            {content.map(({id, image, name})=>(
              <Greet key={id} imgSrc={image} name={name}/>
            ))}
        </>
      );

  }

}

export default App;
