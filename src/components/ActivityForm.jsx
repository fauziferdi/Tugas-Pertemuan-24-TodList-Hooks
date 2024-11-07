import { Modal, Button } from "react-bootstrap";

const ActivityForm = ({
  showModal,
  handleClose,
  handleSubmit,
  formValues,
  handleInputChange,
}) => {
  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Activity</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              name="title"
              id="title"
              value={formValues.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              name="description"
              id="description"
              rows="3"
              onChange={handleInputChange}
              value={formValues.description}
            ></textarea>
          </div>
          <Button variant="primary" onClick={handleSubmit}>
            Add
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ActivityForm;
