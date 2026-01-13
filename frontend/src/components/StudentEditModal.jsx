import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { studentAPI } from "../services/api";
import StudentEditForm from "./StudentEditForm";

const StudentEditModal = ({ show, onHide, student, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    parentid: "",
  });
  const [marks, setMarks] = useState([{ subject: "", marks: "" }]);

  useEffect(() => {
    if (show && student) {
      // get student details and marks
      fetchStudentDetails();
    }
  }, [show, student]);

  const fetchStudentDetails = async () => {
    setLoading(true);
    try {
      const response = await studentAPI.getStudentById(student.id);
      const studentData = response.data.data;

      setFormData({
        name: studentData.name,
        email: studentData.email,
        age: studentData.age,
        parentid: studentData.parentid || "",
      });

      //  add if marks available
      if (studentData.marks && studentData.marks.length > 0) {
        setMarks(
          studentData.marks.map((mark) => ({
            subject: mark.subject,
            marks: mark.marks,
          }))
        );
      } else {
        setMarks([{ subject: "", marks: "" }]);
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to fetch student details",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleMarkChange = (index, field, value) => {
    const newMarks = [...marks];
    newMarks[index][field] = value;
    setMarks(newMarks);
  };

  const addMarkRow = () => {
    setMarks([...marks, { subject: "", marks: "" }]);
  };

  const removeMarkRow = (index) => {
    if (marks.length > 1) {
      const newMarks = marks.filter((_, i) => i !== index);
      setMarks(newMarks);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validMarks = marks.filter((mark) => mark.subject && mark.marks);

      const payload = {
        ...formData,
        marks: validMarks,
      };

      await studentAPI.updateStudent(student.id, payload);

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Member information updated successfully",
        timer: 2000,
        showConfirmButton: false,
      });

      onHide();
      onSuccess();
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred";
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal className="modal-xl" show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Member</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {loading && !formData.name ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <StudentEditForm
            formData={formData}
            handleChange={handleChange}
            handleMarkChange={handleMarkChange}
            addMarkRow={addMarkRow}
            removeMarkRow={removeMarkRow}
            handleSubmit={handleSubmit}
            marks={marks}
            loading={loading}
          />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default StudentEditModal;
