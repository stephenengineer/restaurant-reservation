import React, { useState } from "react";
import TableForm from "../tables/TableForm";

function CreateTable() {
  const initialFormState = {
    table_name: "",
    capacity: ""
  }

  const [formState, setFormState] = useState(initialFormState);

  return (
    <>
      <TableForm
        formState={formState}
        setFormState={setFormState}
      />
    </>
  )
}

export default CreateTable;