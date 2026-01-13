import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { studentAPI } from "../services/api";
import { useNavigate } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import StudentAddModal from "./StudentAddModal";
import StudentEditModal from "./StudentEditModal";
import Pagination from "./Pagination";

const StudentList = ({ student, setStudent, showEdit, setShowEdit }) => {
  const [students, setStudents] = useState([]);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    total: 0,
    totalPages: 0,
  });
  const [showAdd, setShowAdd] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, [pagination.page]);

  useEffect(() => {
    id && fetchStudent();
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

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await studentAPI.getAllStudents(
        pagination.page,
        pagination.limit
      );
      setStudents(response.data.data);
      setPagination({
        ...pagination,
        total: response.data.meta.total,
        totalPages: response.data.meta.totalPages,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to fetch students",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete ${name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await studentAPI.deleteStudent(id);
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Student has been deleted",
          timer: 2000,
          showConfirmButton: false,
        });
        fetchStudents();
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to delete student",
        });
      }
    }
  };

  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
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

  return (
    <>
      <h2 className="text-sm mb-4" onClick={() => setShowAdd(true)}>
        All Members
      </h2>
      <div className="card shadow-sm p-4">
        <div className="d-flex justify-content-end align-items-center">
          <button className="btn btn-success" onClick={() => setShowAdd(true)}>
            Add New Members
          </button>
        </div>
        <hr />

        <div className="card-body">
          {students.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-muted">No students found</p>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Id</th>
                      <th>Member Name</th>
                      <th>Member Email</th>
                      <th>Age</th>
                      <th className="d-flex justify-content-center align-items-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id}>
                        <td>{student.id}</td>
                        {/* <td>{student.name}</td> */}
                        <td>
                          <button
                            className="text-start align-middle btn k p-0 w-100"
                            onClick={() => navigate(`/students/${student.id}`)}
                          >
                            {student.name}
                          </button>
                        </td>

                        <td className="align-middle">{student.email}</td>
                        <td className="align-middle">{student.age} yrs</td>
                        <td className="d-flex justify-content-center gap-4 align-items-center">
                          <button
                            className="text-center align-middle btn p-0"
                            onClick={() =>
                              handleDelete(student.id, student.name)
                            }
                          >
                            <MdDelete color="red" size={23} className="" />
                          </button>
                          <button
                            className="text-center align-middle btn p-0"
                            onClick={async () => {
                              await setId(student.id);
                              setShowEdit(true);
                            }}
                          >
                            <MdEdit color="" size={23} className="" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Pagination
                pagination={pagination}
                handlePageChange={handlePageChange}
                students={students}
              />
            </>
          )}
        </div>
        <StudentAddModal
          show={showAdd}
          onHide={() => setShowAdd(false)}
          onSuccess={fetchStudents}
        />

        <StudentEditModal
          show={showEdit}
          onHide={() => setShowEdit(false)}
          student={student}
          onSuccess={() => window.location.reload()}
        />
      </div>
    </>
  );
};

export default StudentList;
