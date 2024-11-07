import React, { useEffect, useState } from "react";
import ActivityForm from "../components/ActivityForm";
import ActivityList from "../components/ActivityList";
import useForm from "../hooks/useForm";
import useFetch from "../hooks/useFetch";
import useAdd from "../hooks/useAdd";
import useDelete from "../hooks/useDelete";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Home = () => {
  const navigate = useNavigate();
  const url = "http://localhost:3000/activities";
  const [activities, setActivities] = useState([]);
  const [formValues, handleInputChange] = useForm({
    title: "",
    description: "",
  });
  const { data, loading, error } = useFetch(url);
  const [showModal, setShowModal] = useState(false);
  const { dataAdd, addActivity } = useAdd(url, formValues);
  const { dataDelete, deleteActivity } = useDelete(url);

  useEffect(() => {
    if (data) {
      setActivities(data);
    }
    if (dataAdd) {
      setActivities([...activities, dataAdd]);
    }
    if (dataDelete) {
      setActivities(
        activities.filter((activity) => activity.id !== dataDelete.id)
      );
    }
  }, [data, dataAdd, dataDelete]);

  const handleDelete = (id) => {
    deleteActivity(id);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addActivity();
    setShowModal(false);
    formValues.title = "";
    formValues.description = "";
  };

  const handleNavigationDetail = (id) => {
    navigate(`/activity/${id}`);
  };

  return (
    <div>
      <h1 className="my-4 text-center fw-bold text-danger">
        Daily Activity Manager
      </h1>
      <button
        className="btn btn-success mb-3 "
        onClick={() => setShowModal(true)}
      >
        Add Activity
      </button>
      {error && <div>Terjadi kesalahan: {error.message}</div>}{" "}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ActivityList
          activities={activities}
          handleNavigationDetail={handleNavigationDetail}
          handleDelete={handleDelete}
        />
      )}
      <ActivityForm
        showModal={showModal}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        formValues={formValues}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

Home.propTypes = {
  navigate: PropTypes.func,
  url: PropTypes.string,
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
    })
  ),
  formValues: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  handleInputChange: PropTypes.func,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
    })
  ),
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.instanceOf(Error)]),
  showModal: PropTypes.bool,
  dataAdd: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  addActivity: PropTypes.func,
  dataDelete: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  deleteActivity: PropTypes.func,
};

export default Home;
