import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import StudentList from "./components/StudentList";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import StudentDetail from "./components/StudentDetail";
import { studentAPI } from "./services/api";

function App() {
  const [student, setStudent] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className="">
      <nav className="navbar navbar-dark bg-dark mb-4">
        <div className="container-sm">
          <span className="navbar-brand">Student Management System</span>
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <StudentList
                student={student}
                setStudent={setStudent}
                showEdit={showEdit}
                setShowEdit={setShowEdit}
              />
            }
          />
          <Route
            path="/students/:id"
            element={
              <StudentDetail
                student={student}
                setStudent={setStudent}
                showEdit={showEdit}
                setShowEdit={setShowEdit}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
