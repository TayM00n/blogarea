import React from "react";
import {Card, Form} from "react-bootstrap";
import {connect} from "react-redux";

const TempLogInSignUp = ({children, width, currentPage}) => {
  return (
    <div className="d-flex flex-column hv-100">
      <Card className={`bg-login-signup my-auto mx-auto rounded-20 ${width > 990 ? "w-50" : "w-sm-75"}`}>
        <Card.Header className='bg-login-signup rounded-20'><h2
          className='text-center'>{currentPage === "login" ? "Log in" : "Sign up"}</h2></Card.Header>
        <Card.Body className='bg-login-signup form-login-signup rounded-20'>
          <Form className="bg-login-signup ">
            {children}
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

const LogInSignUp = connect((state) => ({
  width: state.globalReducer.windowSize.width,
  currentPage: state.globalReducer.currentPage
}))(TempLogInSignUp)

export default LogInSignUp