import React, { useState, useEffect } from "react";
import { Table, Button, Card, Modal, Form  } from "react-bootstrap";
import useApiServices from "../../services/useApiService";
import { ToastContainer, toast } from "react-toastify";

const StudentListPage = () => {
  const { apiGet, apiPost, apiPut, apiDelete } = useApiServices();
  const [students, setStudents] = useState([]);
  const [student,setStudent] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [showStudent, setShowStudent] = useState(false);

  const [info, setInfo] = useState({
    username: "",
    age: "",
    grade: "",
    marks: "",
  });
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setIsEditMode(false);
    setInfo({
      username: "",
      age: "",
      grade: "",
      marks: "",
    });
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
    setIsEditMode(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {

    if (!info.username || !info.age || !info.grade || !info.marks) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (isEditMode) {
      const response = await apiPut(`/student/${selectedStudentId}`, info);
      handleClose();
      fetchStudents();
      toast("Student updated successfully");
    } else {
      const response = await apiPost("/student", info);
      handleClose();
      fetchStudents();
      toast("Student created successfully");
    }
  };

  const handleDelete = async (id) => {
    const response = await apiDelete(`/student/${id}`);
    fetchStudents();
    toast("student deleted successfuly");
  };

  const fetchStudents = async () => {
    try {
      const response = await apiGet(`/student?limit=${10}&page=${1}`);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleEdit = async(studentId) => {
    const response = await apiGet(`/student?id=${studentId}`);
    // const studentToEdit = students.find((student) => student._id === studentId);
    if (response) {
      setInfo({
        username: response.username,
        age: response.age,
        grade: response.grade,
        marks: response?.marksId?.marks,
      });
      setSelectedStudentId(studentId);
      setIsEditMode(true);
      setShow(true);
    }
  };

  const fetchStudentDetails = async(id) => {
    const response = await apiGet(`/student?id=${id}`);
    console.log(response);
    setStudent(response);

    setShowStudent(true);
  }

  return (
    <div className="container">
      <ToastContainer />
      <h1 className="my-4 text-center">Student List</h1>
      <Button variant="primary" className="mb-4" onClick={handleShow}>
        Add Student
      </Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Age</th>
            <th>Grade</th>
            <th>Actions</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student._id}>
              <td>{index + 1}</td>
              <td>{student.username}</td>
              <td>{student.age}</td>
              <td>{student.grade}</td>
              <td>
              <Button
                  onClick={() => fetchStudentDetails(student._id)}
                  className="me-2"
                >
                  View
                </Button>
                <Button
                  onClick={() => handleDelete(student._id)}
                  className="me-2"
                >
                  Delete
                </Button>
                <Button
                  onClick={() => handleEdit(student._id)}
                  className="me-2"
                >
                  Edit
                </Button>
              </td>
              {/* Add more table cells as needed */}
            </tr>
          ))}
        </tbody>
      </Table>

      <div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {isEditMode ? "Edit Student" : "Add Student"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  required
                  name="username"
                  type="text"
                  placeholder="Enter username"
                  value={info.username}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  required
                  name="age"
                  type="number"
                  placeholder="Enter age"
                  value={info.age}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Grade / Class</Form.Label>
                <Form.Control
                  required
                  name="grade"
                  type="text"
                  placeholder="Enter grade"
                  value={info.grade}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Marks</Form.Label>
                <Form.Control
                  required
                  name="marks"
                  type="number"
                  placeholder="Enter marks"
                  value={info.marks}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button variant="primary" onClick={handleSubmit} type="button">
                {isEditMode ? "Update" : "Submit"}
              </Button>
            </Form>
          </Modal.Body>
          {/* <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary">Understood</Button>
          </Modal.Footer> */}
        </Modal>
      </div>

      <div>
      <Modal show={showStudent} onHide={()=>setShowStudent(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Student Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <Card.Title>{student?.username}</Card.Title>
              <Card.Text>
                <strong>Age:</strong> {student?.age}<br />
                <strong>Grade:</strong> {student?.grade}<br />
                <strong>marks:</strong> {student?.marksId?.marks}
              </Card.Text>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=> setShowStudent(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    </div>
  );
};

export default StudentListPage;
