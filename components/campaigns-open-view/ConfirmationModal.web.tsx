import React from 'react'

export interface IConfirmationModalProps {
  message: string,
  handleSubmit: () => void,
  handleCancel?: () => void
}

const ConfirmationModal: React.FC<IConfirmationModalProps> = (props) => {
  return <div className="modal">
    <div className="modal-content">
      <div style={{ marginBottom: "20px" }}>
        {props.message}
      </div>
      <div className="modal-footer">
        <button className="disconnect-button" onClick={props.handleCancel}>Cancel</button>
        <button onClick={props.handleSubmit}>Proceed</button>
      </div>
    </div>
  </div>
}

export default ConfirmationModal