// src/pages/TeamsPage.js
import {React,useEffect, useState} from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { getTeams } from '../services/teamsService';

function TeamsPage() {
  // Mock data - replace with actual data from your backend
 const [teams,setTeams]=useState([])


  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await getTeams();
        setTeams(data);
        console.log(data)
      } catch (error) {
        console.error("Error fetching teams", error);
      }
    };

    fetchTeams();
  }, []);

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">Our Teams</h1>
      <Row>
        {teams.map((team) => (
          <Col md={4} key={team.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{team.name}</Card.Title>
                <Card.Text>
                  Coach: {team.coachname}<br />
                  CaptainName: {team.playerName}
                </Card.Text>
                {/* <Button variant="primary">View Team</Button> */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default TeamsPage;