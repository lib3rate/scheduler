import React, { useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  // Finding the correct day using an appointment id

  const findDay = appointmentId => {
    for (let oneDay of state.days) {
      if (oneDay.appointments.includes(appointmentId)) {
        return oneDay;
      }
    }
  };

  // Updating the state, the spots for the day and the database when creating or editing an interview

  function bookInterview(id, interview, edit = false) {
    const currentDay = findDay(id);

    if (edit === false) {
      currentDay.spots -= 1;
    };

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return (
      axios.put(`/api/appointments/${id}`, {interview})
        .then(() => {
          setState({
            ...state,
            appointments
          })
        })
    );
  };

  // Updating the state, the spots for the day and the database when cancelling (deleting) an interview

  function cancelInterview(id, interview) {
    const currentDay = findDay(id);
    const updatedSpots = currentDay.spots += 1;

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return (
      axios.delete(`api/appointments/${id}`)
        .then(() => {
          setState({
            ...state,
            appointments
          })
        })
    );
  };

  return {
    state,
    setState,
    setDay,
    bookInterview,
    cancelInterview
  };
};