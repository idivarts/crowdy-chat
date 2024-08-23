import React from 'react'

export interface IConfirmationModalProps {
  message: string,
  handleSubmit: () => void,
  handleCancel?: () => void
}

const ConfirmationModal: React.FC<IConfirmationModalProps> = (props) => {
  return <div>
    <div>
      <div style={{ marginBottom: "20px" }}>
        {props.message}
      </div>
      <div>
        <button onClick={props.handleCancel}>Cancel</button>
        <button onClick={props.handleSubmit}>Proceed</button>
      </div>
    </div>
  </div>
}

export default ConfirmationModal