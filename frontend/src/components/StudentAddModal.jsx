import { Modal } from "react-bootstrap";
import StudentAddForm from "./StudentAddForm";

const StudentAddModal = ({ show, onHide, student, onSuccess }) => {
  return (
    <Modal className="modal-xl" show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Member</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <StudentAddForm
          selectedStudent={student}
          onSuccess={() => {
            onHide();
            onSuccess();
          }}
        />
      </Modal.Body>
    </Modal>
  );
};

export default StudentAddModal;
