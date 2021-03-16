import React from "react";
import {Card, ListGroup, ListGroupItem} from "react-bootstrap";

const AuthorsPage = ()=>{
  const Cards = () => {
    let cards = []
    for(let i = 0; i<20;i++){
      cards.push(i)
    }
    return cards.map(item => (
      <Card style={{ width: '18rem' }} key={item.toString()+"F22"}>
        <Card.Img variant="top" src="https://placeimg.com/100/180/any" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>Cras justo odio</ListGroupItem>
          <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
          <ListGroupItem>Vestibulum at eros</ListGroupItem>
        </ListGroup>
        <Card.Body>
          <Card.Link href="#">Card Link</Card.Link>
          <Card.Link href="#">Another Link</Card.Link>
        </Card.Body>
      </Card>
    ))
  }

  return(
    <div className='fullPage container'>
      <h1>Authorization home page</h1>
      <div className='d-flex flex-wrap justify-content-around'>
        <Cards/>
      </div>
    </div>
  )
}

export default AuthorsPage