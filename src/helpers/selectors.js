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