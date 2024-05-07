import React, { useState, useEffect } from 'react';
import NavBar from "../NavBar/NavBar";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import supabase from '../../CONFIG/supabaseClient'; // Import the Supabase client instance
import Footer from "../Footer/footer";
import './AddGroups.css'; // Import SendProposal.css for styling

const AddGroups = () => {
  const [email1, setEmail1] = useState('');
  const [email2, setEmail2] = useState('');
  const [email3, setEmail3] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectDomain, setProjectDomain] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    async function fetchEmail() {
      try {
        // Correctly fetching the user data using supabase.auth.getUser()
        const { data: { user } } = await supabase.auth.getUser();

        // Store user email in state
        const userEmail = user?.email || ''; // Get user email from user object
        setEmail1(userEmail); // Set user email as email1
        setUserEmail(userEmail);
      } catch (error) {
        console.error('Error fetching user email:', error.message);
      }
    }

    fetchEmail();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email1 || !email2 || !email3 || !projectName || !projectDomain || !projectDescription) {
        throw new Error('Please fill in all fields.');
      }
      // Save group information in the database
      const { data, error } = await supabase.from('groups').insert([
        {
          studentId1: email1,
          studentId2: email2,
          studentId3: email3,
          project_name: projectName,
          project_domain: projectDomain,
          project_description: projectDescription
        },
      ]);
      if (error) {
        throw error;
      }
      // Clear form fields
      setEmail2('');
      setEmail3('');
      setProjectName('');
      setProjectDomain('');
      setProjectDescription('');
      // Display success message
      setErrorMessage('Group added successfully!');
    } catch (error) {
      console.error('Error adding group:', error.message);
      setErrorMessage('Error adding group. Please try again.');
    }
  };

  return (
    <>
      <NavBar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body" style={{ backgroundColor: "#f8f9fa" }}>
                <form onSubmit={handleSubmit} className="send-proposal-form">

                  <h2 className="mb-4 text-center text-primary">ADD GROUP</h2>

                  {/* Email of Student 1 (User's email) */}
                  <Form.Group controlId="email1">
                    <Form.Label>Email of Student 1 (Your email)</Form.Label>
                    <Form.Control
                      type="email"
                      value={userEmail} // Display user's email
                      readOnly // Make it read-only
                    />
                  </Form.Group>

                  {/* Input for Email of Student 2 */}
                  <Form.Group controlId="email2">
                    <Form.Label>Email of Student 2</Form.Label>
                    <Form.Control
                      type="email"
                      value={email2}
                      onChange={(e) => setEmail2(e.target.value)}
                      placeholder="Enter email"
                    />
                  </Form.Group>

                  {/* Input for Email of Student 3 */}
                  <Form.Group controlId="email3">
                    <Form.Label>Email of Student 3</Form.Label>
                    <Form.Control
                      type="email"
                      value={email3}
                      onChange={(e) => setEmail3(e.target.value)}
                      placeholder="Enter email"
                    />
                  </Form.Group>

                  {/* Input for Project Name */}
                  <Form.Group controlId="projectName">
                    <Form.Label>Project Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      placeholder="Enter project name"
                    />
                  </Form.Group>

                  {/* Input for Project Domain */}
                  <Form.Group controlId="projectDomain">
                    <Form.Label>Project Domain</Form.Label>
                    <Form.Control
                      type="text"
                      value={projectDomain}
                      onChange={(e) => setProjectDomain(e.target.value)}
                      placeholder="Enter project domain"
                    />
                  </Form.Group>

                  {/* Input for Project Description */}
                  <Form.Group controlId="projectDescription">
                    <Form.Label>Project Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      placeholder="Enter project description"
                    />
                  </Form.Group>

                  {/* Submit Button */}
                  <Button variant="primary" type="submit" style={{ width: "100%" }}>
                    Submit
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && <Alert variant="danger" className="alert">{errorMessage}</Alert>}
      <Footer/>
    </>
  );
};

export default AddGroups;
