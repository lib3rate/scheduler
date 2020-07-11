import React from "react";
import "components/Appointment/styles.scss";

import useVisualMode from 'hooks/useVisualMode';
import Header from "components/Appointment/Header"
import Empty from "components/Appointment/Empty"
import Show from "components/Appointment/Show"
// import Confirm from "components/Appointment/Confirm"
import Status from "components/Appointment/Status"
// import Error from "components/Appointment/Error"
import Form from "components/Appointment/Form"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((error) => console.log(error));
  };

  function deleteInterview() {
    const interview = null;
    transition(DELETING);
    props.cancelInterview(props.id, interview)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => console.log(error));
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          // onDelete={deleteInterview}
        />
      )}
      {mode === CREATE && (
        <Form
          name={props.name}
          interviewers={props.interviewers}
          interviewer={props.interviewer}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SAVING && (
        <Status
          message="Saving"
        />
      )}
      {mode === DELETING && (
        <Status
          message="Deleting"
        />
      )}
      {mode === CONFIRM && (
        <Status
          onConfirm={deleteInterview}
        />
      )}
    </article>
  );
}