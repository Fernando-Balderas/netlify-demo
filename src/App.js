import React, { useEffect, useState } from 'react';
import {
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import UserInformation from './UserInformation';
// import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function App(){
  let location = useLocation();
  return (
    <div>
      <Switch location={location}>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/users/:userId">
          <UserInformation />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}

function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

function HomePage() {
  const [appState, setAppState] = useState({
    error: null,
    isLoaded: false,
    items: [],
  });

  useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = `https://jsonplaceholder.typicode.com/users`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then(
        (items) => {
          setAppState({ isLoaded: true, items: items });
        },
        (error) => {
          setAppState({
            isLoaded: true,
            error
          });
        }
      );
  }, [setAppState]);

  const { error, isLoaded, items } = appState;
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <Container>
        <h2>Users</h2>
          <Row className="justify-content-md-center">
          {items.map(item => (
            <div key={item.id}>
              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">@{item.username}</Card.Subtitle>
                  <Card.Text>
                    <code>{item.email}</code>
                  </Card.Text>
                  <Link to={`/users/${item.id}`}>
                    <Button variant="primary" size="sm">
                      More details
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
              
            </div>
          ))}
          </Row>
        </Container>
      </div>
    );
  }

}

export default App;
