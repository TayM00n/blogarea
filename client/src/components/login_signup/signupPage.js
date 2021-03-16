import React from "react";
import {Button, Form} from "react-bootstrap";
import LogInSignUp from "./login_signup";
import {Link} from "react-router-dom";

const SignUp = ({currentPage})=>{
  return(
    <LogInSignUp currentPage={currentPage}>
      <Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' className='form-inp'/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control type='text' className='form-inp'/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' className='form-inp'/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Repeat password</Form.Label>
          <Form.Control type='password' className='form-inp'/>
        </Form.Group>
      </Form.Group>
      <Form.Group>
        <div className='row d-flex flex-row justify-content-between'>
          <Link to="/login" className="btn col-sm mx-3 btn-signup">Log in</Link>
          <Button className="col-sm mx-3 btn-enter">Enter</Button>
        </div>
      </Form.Group>
    </LogInSignUp>
  )
}

export default SignUp