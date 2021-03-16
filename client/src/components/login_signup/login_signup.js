import React, {useState} from "react";
import {Card, Form} from "react-bootstrap";

const LogInSignUp = ({children})=>{
  const [width, setWidth] = useState(window.innerWidth)

  window.onresize=()=>{
    setWidth(window.innerWidth)
  }

  return(
    <div className="d-flex flex-column hv-100">
      <Card className={`bg-login-signup my-auto mx-auto rounded-20 ${width > 990 ? "w-50" : "w-sm-75"}`}>
        <Card.Header className='bg-login-signup rounded-20'><h2 className='text-center'>{window.location.pathname.replace("/","") === "login" ? "Log in" : "Sign up"}</h2></Card.Header>
        <Card.Body className='bg-login-signup form-login-signup rounded-20'>
          <Form className="bg-login-signup ">
            {/*{currentPage === "login" ? <LogIn/> : <SignUp/>}*/}
            {children}
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default LogInSignUp