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

  // const spotsRemaining = interviewId => {
  //   // 5 - 
  //   const correctDay = findDay(interviewId);
  //   const daySpots = correctDay.spots;

  //   // for (let appointmentId in state.days[day].appointments)

  //   return daySpots;
  // }

  const findDay = appointmentId => {
    for (let oneDay of state.days) {
      if (oneDay.appointments.includes(appointmentId)) {
        return oneDay;
      }
    }
  };

  function bookInterview(id, interview) {
    const currentDay = findDay(id);
    const updatedSpots = currentDay.spots -= 1;

    // const day = {
    //   ...state.days[currentDay.id - 1],
    //   spots: updatedSpots
    // }

    // const days = {
    //   ...state.days,
    //   [currentDay.id]: day
    // }
    // console.log(days);

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
            // days,
            appointments
          })
        })
        .catch(error => console.log(error))
    );
  };

  function cancelInterview(id, interview) {
    const currentDay = findDay(id);
    const updatedSpots = currentDay.spots += 1;

    // const day = {
    //   ...state.days[currentDay.id - 1],
    //   spots: updatedSpots
    // }

    // const days = {
    //   ...state.days,
    //   [currentDay.id]: day
    // }

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
            // days,
            appointments
          })
        })
        // .catch(error => console.log(`There was an error: ${error}`))
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