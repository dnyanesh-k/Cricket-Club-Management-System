import React, { useState, useEffect } from 'react';
import { Container,Table, Button, Modal, Form } from 'react-bootstrap';
import { getTeams, createTeam, updateTeam, deleteTeam } from '../services/teamsService';
import AdminLayout from '../components/AdminLayout';


const TeamManagement = () => {
  const [teams, setTeams] = useState([]);
  const [show, setShow] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const [teamName, setTeamName] = useState("");
  const [coachName, setCoachName] = useState("");
  const [coachId, setCoachId] = useState("");
  const [captainName, setCaptainName] = useState("");
  const [captainId, setCaptainId] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await getTeams();
        setTeams(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchTeams();
  }, []);

  const handleClose = () => {
    setShow(false);
    setError(null); // Clear any existing errors
  };

  const handleShow = (team) => {
    if (team) {
      setEditingTeam(team);
      setTeamName(team.name);
      setCoachName(team.coachName);
      setCoachId(team.coachId);
      setCaptainName(team.playerName);
      setCaptainId(team.playerId);
    } else {
      setEditingTeam(null);
      setTeamName("");
      setCoachName("");
      setCoachId("");
      setCaptainName("");
      setCaptainId("");
    }
    setShow(true);
  };

  const handleSave = async () => {
    if (
      teamName === "" ||
      coachName === "" ||
      coachId === "" ||
      captainName === "" ||
      captainId === ""
    ) {
      setError("All fields are required.");
      return;
    }

    try {
      const teamData = {
        name: teamName,
        coachname:coachName,
        coach:coachId,
        playerName: captainName,
        players: captainId,
      };
      if (editingTeam) {
        console.log(teamData,editingTeam.id)
        const updatedTeam = await updateTeam(editingTeam.id, teamData);
        setTeams(teams.map((team) => (team.id === editingTeam.id ? updatedTeam : team)));
      } else {
        const newTeam = await createTeam(teamData);
        setTeams([...teams, newTeam]);
      }
      handleClose();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTeam(id);
      setTeams(teams.filter((team) => team.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <h2>Manage Teams</h2>
      <Button variant="success" className="mb-3" onClick={() => handleShow()}>
        Add New Team
      </Button>
      {error && <div className="alert alert-danger">{error}</div>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Team Name</th>
            <th>Coach Name</th>
            <th>Captain Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.id}>
              <td>{team.id}</td>
              <td>{team.name}</td>
              <td>{team.coachName}</td>
              <td>{team.playerName}</td>
              <td>
                <Button variant="warning" className="me-2" onClick={() => handleShow(team)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(team.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Adding/Editing Team */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingTeam ? 'Edit Team' : 'Add New Team'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTeamName">
              <Form.Label>Team Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter team name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCoachId">
              <Form.Label>Coach ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter coach ID"
                value={coachId}
                onChange={(e) => setCoachId(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCoachName">
              <Form.Label>Coach Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter coach name"
                value={coachName}
                onChange={(e) => setCoachName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCaptainId">
              <Form.Label>Captain ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter captain ID"
                value={captainId}
                onChange={(e) => setCaptainId(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCaptainName">
              <Form.Label>Captain Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter captain name"
                value={captainName}
                onChange={(e) => setCaptainName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {editingTeam ? 'Save Changes' : 'Add Team'}
          </Button>
        </Modal.Footer>
      </Modal>
      </Container>
  );
};

export default TeamManagement;
