import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import {getItemFromLocalStore, setItemToLocalStore, setValueToStore} from "../../index";
import LogInSignUp from "./login_signup";
import {Link, useHistory} from "react-router-dom";
import {connect} from "react-redux";

const TempLogIn = ({currentPage})=>{
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [isRemember, setIsRemember] = useState(false)
  const history = useHistory()

  const handleSetPassword = (e) => setPassword((e.target.value))
  const handleSetEmail = (e) => setEmail(e.target.value)
  const handleSetIsRemember = () => setIsRemember(isRemember ? false : true)

  const handleSubmit = ()=>{
    if((email === "test@test.com" && password==="123") || (email === "1" && password==="1") || true){
      history.push("/")
      setItemToLocalStore("user_jwt", "sdjbfajsbfhasbfoiebfhiebiwhabawebf")
      setValueToStore({type:"SET_JWT_REQUEST", userId: getItemFromLocalStore("user_jwt")})
    }
  }

  return(
    <LogInSignUp currentPage={currentPage}>
      <Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' className={`form-inp`} value={email} onChange={handleSetEmail}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' className={'form-inp'} value={password} onChange={handleSetPassword}/>
        </Form.Group>
        <Form.Group>
          <Form.Check label="Remember me" aria-label='Remember me' className='form-inp' checked={isRemember} onChange={handleSetIsRemember}/>
        </Form.Group>
      </Form.Group>
    <Form.Group>
      <div className='row d-flex flex-row justify-content-between'>
        <Link to="/signup" className="btn col mx-3 btn-outline-orange">Sign up</Link>
        <Button className="col mx-3 btn-orange" onClick={handleSubmit}>Enter</Button>
      </div>
    </Form.Group>
    </LogInSignUp>
  )
}

const LogIn = connect((state)=>({currentPage: state.globalReducer.currentPage}))(TempLogIn)

export default LogIn