import React, { useEffect, useState } from "react";
import useTimer from "../hooks/useTimer";
import useFetch from "../hooks/useFetch";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const url = `http://localhost:3000/activities/${id}`;
  const [activities, setActivities] = useState({});
  const { time, startTimer, stopTimer, resetTimer } = useTimer();
  const { data, loading, error } = useFetch(url);

  useEffect(() => {
    if (data) {
      setActivities(data);
    }
  }, [data]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mt-4">
      <h2 className="text-primary">{activities.title}</h2>
      <p className="text-muted">{activities.description}</p>
      <div className="card border-primary my-4">
        <div className="card-body">
          <p className="card-text">Time Spent: {time} seconds</p>
          <div className="btn-group">
            <button className="btn btn-outline-success" onClick={startTimer}>
              <i className="bi bi-play-fill"></i> Start
            </button>
            <button className="btn btn-outline-warning" onClick={stopTimer}>
              <i className="bi bi-pause-fill"></i> Stop
            </button>
            <button className="btn btn-outline-danger" onClick={resetTimer}>
              <i className="bi bi-arrow-counterclockwise"></i> Reset
            </button>
          </div>
        </div>
      </div>
      <button className="btn btn-secondary mt-3" onClick={handleBack}>
        <i className="bi bi-arrow-left"></i> Back to List
      </button>
    </div>
  );
};

ActivityDetail.propTypes = {
  id: PropTypes.string,
  navigate: PropTypes.func,
  url: PropTypes.string,
  activities: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  time: PropTypes.number,
  startTimer: PropTypes.func,
  stopTimer: PropTypes.func,
  resetTimer: PropTypes.func,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.instanceOf(Error)]),
  activeButton: PropTypes.string,
};

export default ActivityDetail;
