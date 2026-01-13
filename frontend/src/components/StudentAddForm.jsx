import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { studentAPI } from "../services/api";

const StudentAddForm = ({ selectedStudent, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    parentid: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedStudent) {
      setFormData({
        name: selectedStudent.name,
        email: selectedStudent.email,
        age: selectedStudent.age,
        parentid: selectedStudent.parentid,
      });
    }
  }, [selectedStudent]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (selectedStudent) {
        // update student
        await studentAPI.updateStudent(selectedStudent.id, formData);
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Student updated successfully",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        // create student
        await studentAPI.createStudent(formData);
        Swal.fire({
          icon: "success",
          title: "Created!",
          text: "Student created successfully",
          timer: 2000,
          showConfirmButton: false,
        });
      }

      setFormData({ name: "", email: "", age: "", parentid: "" });
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

  // const handleReset = () => {
  //   setFormData({ name: "", email: "", age: "", parentid: "" });
  //   if (onCancel) onCancel();
  // };

  return (
    <div className=" ">
      {/* <div className="card-header bg-primary text-white">
        <h5 className="mb-0">
          {selectedStudent ? "Update Student" : "Add New Student"}
        </h5>
      </div> */}
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Member Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Member Email <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Member Age <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="parentid" className="form-label">
              Member Parent Id
            </label>
            <input
              type="text"
              className="form-control"
              id="parentid"
              name="parentid"
              value={formData.parentid}
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-flex justify-content-center align-items-center gap-2">
            <button
              type="submit"
              className="btn btn-success"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  {selectedStudent ? "Updating..." : "Submiting..."}
                </>
              ) : (
                <>{selectedStudent ? "Update" : "Submit"}</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentAddForm;
