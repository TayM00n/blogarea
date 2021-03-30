import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import {
  getItemFromLocalStore,
  getItemFromSessionStore,
  setItemToLocalStore,
  setItemToSessionStore,
  setValueToStore
} from "../../index";
import LogInSignUp from "./login_signup";
import {Link, useHistory} from "react-router-dom";
import {connect} from "react-redux";

const TempLogIn = ({currentPage})=>{
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [isRemember, setIsRemember] = useState(0)
  const history = useHistory()

  const handleSetPassword = (e) => setPassword(e.target.value)
  const handleSetEmail = (e) => setEmail(e.target.value)
  const handleSetIsRemember = () => setIsRemember(isRemember ? 0 : 1)

  const handleSubmit = ()=>{
    if(email && password){
      console.log(email, password, isRemember)
      if(isRemember){
        setItemToLocalStore("isRemember", isRemember)
        setValueToStore({type: "SET_IS_REMEMBER_REQUEST", isRemember: isRemember})
        history.push("/")
        setItemToLocalStore("user_jwt", "2")
        setValueToStore({type:"SET_JWT_REQUEST", userId: getItemFromLocalStore("user_jwt")})
      }else{
        history.push("/")
        setItemToSessionStore("user_jwt", "2")
        setValueToStore({type:"SET_JWT_REQUEST", userId: getItemFromSessionStore("user_jwt")})
      }
      /*history.push("/")
      setItemToLocalStore("user_jwt", "2")
      setValueToStore({type:"SET_JWT_REQUEST", userId: getItemFromLocalStore("user_jwt")})*/
    }
    /*if((email === "test@test.com" && password==="123") || (email === "1" && password==="1") || true){
      history.push("/")
      setItemToLocalStore("user_jwt", "2")
      setValueToStore({type:"SET_JWT_REQUEST", userId: getItemFromLocalStore("user_jwt")})
    }*/
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