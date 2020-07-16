// Getting the correct appointments for the particular day

export function getAppointmentsForDay(state, day) {
  const foundDay = state.days.find(oneDay => oneDay.name === day);
  const results = [];
  let appointmentsForDay = [];
  if (foundDay) {
    appointmentsForDay = foundDay.appointments;
  } else {
    return results;
  }
  
  if (appointmentsForDay.length > 0) {
    for (let appointmentId of appointmentsForDay) {
      results.push(state.appointments[appointmentId])
    }
  }
  return results;
};

// Getting the correct interviewers for the particular day

export function getInterviewersForDay(state, day) {
  const foundDay = state.days.find(oneDay => oneDay.name === day);
  const results = [];
  let interviewersForDay = [];
  if (foundDay) {
    interviewersForDay = foundDay.interviewers;
  } else {
    return results;
  }
  
  if (interviewersForDay.length > 0) {
    for (let interviewerId of interviewersForDay) {
      results.push(state.interviewers[interviewerId])
    }
  }
  return results;
};

// Getting the correct interview data when creating the schedule for a day

export function getInterview(state, interview) {
  let result = null;
  if (interview) {
    const interviewerId = interview.interviewer;
    result = {...interview, interviewer: state.interviewers[interviewerId]}
  } 
  return result;
};