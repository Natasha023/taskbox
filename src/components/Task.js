import React from 'react'
import PropTypes from 'prop-types'

const Task = ({ task: { id, title, state }, onArchiveTask, onPinTask }) => {
  return (
    <div className={`list-item ${state}`}>
      <label className="checkbox">
        <input
          type="checkbox"
          defaultChecked={state === 'TASK_ARCHIVED'}
          disabled={true}
          name="checked"
        />
        <span className="checkbox-custom" onClick={() => onArchiveTask(id)} />
      </label>
      <div className="title">
        <input type="text" value={title} readOnly={true} placeholder="Input title" style={{ 'text-overflow': 'ellipsis' }} />
      </div>

      <div className="actions" onClick={event => event.stopPropagation()}>
        {state !== 'TASK_ARCHIVED' && (
          <a onClick={() => onPinTask(id)}>
            <span className={`icon-star`} />
          </a>
        )}
      </div>
    </div>
  )
}

Task.propTypes = {
    task: PropTypes.object.isRequired,
    onPinTask: PropTypes.func.isRequired,
    onArchiveTask: PropTypes.func.isRequired,
}

export default Task