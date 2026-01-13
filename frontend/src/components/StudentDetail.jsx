import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { studentAPI } from "../services/api";
import StudentEditModal from "./StudentEditModal";

const StudentDetail = ({ student, setStudent, showEdit, setShowEdit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const fetchStudent = async () => {
    setLoading(true);
    try {
      const res = await studentAPI.getStudentById(id);
      setStudent(res.data.data);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to fetch student details",
      });
      navigate(-1);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSuccess = () => {
    setShowEdit(false);
    fetchStudent(); // update data after edit
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!student) return <p>Student not found</p>;

  // console.log(student);

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
          <h5 className="mb-0">Student Details</h5>
        </div>

        <div className="card-body">
          <div className="row mb-4">
            <div className="col-md-6">
              <h6 className="text-muted">Member Name</h6>
              <p className="h5">{student.name}</p>
            </div>
            <div className="col-md-6">
              <h6 className="text-muted">Member Email</h6>
              <p className="h5">{student.email}</p>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-6">
              <h6 className="text-muted">Member Age</h6>
              <p className="h5">{student.age || "N/A"} yrs</p>
            </div>
            <div className="col-md-6">
              <h6 className="text-muted">Parent ID</h6>
              <p className="h5">{student.parentid || "N/A"}</p>
            </div>
          </div>

          {student.marks && student.marks.length > 0 && (
            <>
              <hr />
              <h5 className="mb-3">Marks</h5>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead className="table-light">
                    <tr>
                      <th>Subject</th>
                      <th>Marks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {student.marks.map((mark, index) => {
                      return (
                        <tr key={index}>
                          <td>{mark.subject}</td>
                          <td>{mark.marks}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}

          <div className="d-flex gap-2 mt-4">
            <button
              className="btn btn-success"
              onClick={() => setShowEdit(true)}
            >
              Edit Student
            </button>
          </div>
        </div>
      </div>

      <StudentEditModal
        show={showEdit}
        onHide={() => setShowEdit(false)}
        student={student}
        onSuccess={handleEditSuccess}
      />
    </div>
  );
};

export default StudentDetail;
