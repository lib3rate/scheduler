import React, { useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import useApplicationData from 'hooks/useApplicationData';
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from 'helpers/selectors';

import DayList from "components/DayList";
import Appointment from "components/Appointment"

export default function Application(props) {
  const {
    state,
    setState,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  const interviewersForDay = getInterviewersForDay(state, state.day);

  const schedule = getAppointmentsForDay(state, state.day).map((appointment) => {
    const interview = getInterview(state, appointment.interview);
  
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewersForDay}
        name={ interview ? interview.student : null }
        interviewer={ (interview && interview.interviewer) ? interview.interviewer.id : null }
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <ul>
          {schedule}
          <Appointment key="last" time="5pm" />
        </ul>
      </section>
    </main>
  );
}
