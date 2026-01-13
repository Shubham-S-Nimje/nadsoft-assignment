import React from "react";
import { MdDelete } from "react-icons/md";

const StudentEditForm = ({
  formData,
  handleChange,
  handleMarkChange,
  addMarkRow,
  removeMarkRow,
  handleSubmit,
  marks,
  loading,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h6 className="mb-3 text-secondary border-bottom pb-2">
        Member Information
      </h6>

      <div className="row">
        <div className="col-md-6 mb-3">
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

        <div className="col-md-6 mb-3">
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
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="age" className="form-label">
            Member Age <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            className="form-control"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
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
          />
        </div>
      </div>

      <h6 className="mb-3 text-secondary border-bottom pb-2 d-flex justify-content-between align-items-center">
        <span>Marks</span>
        <button
          type="button"
          className="btn btn-sm btn-success"
          onClick={addMarkRow}
        >
          + Add Subject
        </button>
      </h6>

      {marks.map((mark, index) => (
        <div key={index} className="row mb-3 align-items-end">
          <div className="col-md-5">
            <label className="form-label">Subject</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g., Mathematics"
              value={mark.subject}
              onChange={(e) =>
                handleMarkChange(index, "subject", e.target.value)
              }
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Marks (0-100)</label>
            <input
              type="number"
              className="form-control"
              placeholder="0-100"
              min="0"
              max="100"
              value={mark.marks}
              onChange={(e) => handleMarkChange(index, "marks", e.target.value)}
            />
          </div>
          <div className="col-md-3">
            {marks.length > 1 && (
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => removeMarkRow(index)}
              >
                <MdDelete color="red" size={23} className="" />
              </button>
            )}
          </div>
        </div>
      ))}

      <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" />
              Updating...
            </>
          ) : (
            "Update"
          )}
        </button>
      </div>
    </form>
  );
};

export default StudentEditForm;
