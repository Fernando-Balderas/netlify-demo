import React, { useEffect, useState } from 'react';
import {
  useParams
} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function UserInformation() {
    let { userId } = useParams();
    const [appState, setAppState] = useState({
      error: null,
      isLoaded: false,
      userInfo: [],
    });
  
    useEffect(() => {
      setAppState({ loading: true });
      const apiUrl = `https://jsonplaceholder.typicode.com/users/${userId}`;
      fetch(apiUrl)
        .then((res) => res.json())
        .then(
          (userInfo) => {
            setAppState({ isLoaded: true, userInfo: userInfo });
          },
          (error) => {
            setAppState({
              isLoaded: true,
              error
            });
          }
        );
    }, [setAppState]);
  
    const { error, isLoaded, userInfo } = appState;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Container>
            <Row className="justify-content-md-center">
            <Card border="info" style={{ width: '28rem' }}>
                <Card.Header>User Information</Card.Header>
                <Card.Body>
                <Card.Title>Name: {userInfo.name}</Card.Title>
                {/* <Card.Text>
                    Some quick example text to build on the card title and make up the bulk
                    of the card's content.
                </Card.Text> */}
                <ListGroup variant="flush">
                    <ListGroup.Item>Username: {userInfo.username}</ListGroup.Item>
                    <ListGroup.Item>Email: {userInfo.email}</ListGroup.Item>
                    <ListGroup.Item>Phone: {userInfo.phone}</ListGroup.Item>
                    <ListGroup.Item>Company: {userInfo.company.name}</ListGroup.Item>
                    <ListGroup.Item>Website: {userInfo.website}</ListGroup.Item>
                    <ListGroup.Item>Address: 
                    <ListGroup>
                        <ListGroup.Item>Street: {userInfo.address.street}</ListGroup.Item>
                        <ListGroup.Item>Suite: {userInfo.address.suite}</ListGroup.Item>
                        <ListGroup.Item>City: {userInfo.address.city}</ListGroup.Item>
                        <ListGroup.Item>Zipcode: {userInfo.address.zipcode}</ListGroup.Item>
                    </ListGroup>
                    </ListGroup.Item>
                </ListGroup>
                </Card.Body>
            </Card>
            </Row>
        </Container>
      );
    }
  
  }

export default UserInformation;
