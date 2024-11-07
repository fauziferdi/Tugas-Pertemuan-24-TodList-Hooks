import React from "react";

const ActivityList = ({ activities, handleNavigationDetail, handleDelete }) => {
  return (
    <ul className="list-group">
      {activities.map((activity) => (
        <li
          key={activity.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span>{activity.title}</span>
          <div>
            <button
              className="btn btn-warning btn-sm mx-1"
              onClick={() => handleNavigationDetail(activity.id)}
            >
              Details
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(activity.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ActivityList;
