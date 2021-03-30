import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import LogInSignUp from "./login_signup";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

const TempSignUp = ({currentPage})=>{
  const [email, setEmail] = useState("")
  const [fullName, setFullName] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")


  const handleSingUp=()=>{
    console.log(email, fullName, password, repeatPassword)
  }

  return(
    <LogInSignUp currentPage={currentPage}>
      <Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' className='form-inp' onChange={(e)=>setEmail(e.target.value)}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Full Name</Form.Label>
          <Form.Control type='text' className='form-inp' onChange={(e)=>setFullName(e.target.value)}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' className='form-inp' onChange={(e)=>setPassword(e.target.value)}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Repeat password</Form.Label>
          <Form.Control type='password' className='form-inp' onChange={(e)=>setRepeatPassword(e.target.value)}/>
        </Form.Group>
      </Form.Group>
      <Form.Group>
        <div className='row d-flex flex-row justify-content-between'>
          <Link to="/login" className="btn col-sm mx-3 btn-outline-orange">Log in</Link>
          <Button className="col-sm mx-3 btn-orange" onClick={handleSingUp}>Enter</Button>
        </div>
      </Form.Group>
    </LogInSignUp>
  )
}

const SignUp = connect((state)=>({currentPage: state.globalReducer.currentPage}))(TempSignUp)

export default SignUp