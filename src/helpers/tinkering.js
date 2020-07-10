const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  }
};

const getAppointmentsForDay = (state, day) => {
  const found = state.days.find(oneDay => oneDay.name === day);
  const results = [];
  let appointmentsForDay = [];
  if (found) {
    appointmentsForDay = found.appointments;
  } else {
    return results;
  }
  
  console.log(appointmentsForDay);
  
  if (appointmentsForDay.length > 0) {
    for (let appointmentId of appointmentsForDay) {
      results.push(state.appointments[appointmentId])
    }
  }
  return results;

  // let theState = {};
  // for (let days of state.days) {
  //   if (days.name === day) {
  //     theState = days.appointments;
  //   }
  // }
  // console.log(theState);
  // let daysAppointments = [];
  // if (theState.length > 0) {
  //   for (let appointment of theState) {
  //     daysAppointments.push(state.appointments[appointment]);
  //   }
  // }
  // return daysAppointments;
};

console.log(getAppointmentsForDay(state, "Wednesday"));