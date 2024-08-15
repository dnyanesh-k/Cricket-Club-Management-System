// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { Container, Button, Card, Row, Col } from 'react-bootstrap';
import { getNews } from '../services/newsService';

function HomePage() {
  const [latestNews, setLatestNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNews();
        setLatestNews(data.newsList);
      } catch (error) {
        console.error('Failed to fetch news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Container className="mb-4 flex-grow-1">
        <h1 className="text-center mb-4">Welcome to Cricket Club Management System</h1>
        
        <Row>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Header>Latest News</Card.Header>
              <Card.Body>
                {latestNews.length > 0 ? (
                  latestNews.slice(0, 3).map((item, index) =>
                    item.story ? (
                      <Card key={index} className="mb-3">
                        <Card.Body>
                          <Card.Title>{item.story.hline}</Card.Title>
                          <Card.Text>{item.story.intro}</Card.Text>
                        </Card.Body>
                      </Card>
                    ) : null
                  )
                ) : (
                  <p>No news available</p>
                )}
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4}>
            <Card className="mb-4">
              <Card.Header>Upcoming Tournaments</Card.Header>
              <Card.Body>
                <Card.Title>Summer Cricket League 2023</Card.Title>
                <Card.Text>
                  Registration for the Summer Cricket League 2023 is now open. Don't miss out!
                </Card.Text>
                {/* <Button variant="primary">Register Now</Button> */}
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4}>
            <Card className="mb-4">
              <Card.Header>Club Announcements</Card.Header>
              <Card.Body>
                <Card.Title>Annual General Meeting</Card.Title>
                <Card.Text>
                  The Annual General Meeting will be held on July 1, 2023. All members are requested to attend.
                </Card.Text>
                {/* <Button variant="primary">RSVP</Button> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;
