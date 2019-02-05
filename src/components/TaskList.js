import React from 'react'
import Task from './Task'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { archiveTask, pinTask } from '../lib/redux';
import { bindActionCreators } from 'redux';


export const TaskList = ({loading, tasks, onPinTask, onArchiveTask}) => {
    const events = {
        onPinTask,
        onArchiveTask,
    }

    const LoadingRow = (
        <div className="loading-item">
            <span className="glow-checkbox" />
            <span className="glow-text">
              <span>Loading</span><span>cool</span><span>state</span>
            </span>
        </div>
    )

    if(loading){
        return <div className="list-items">{LoadingRow}{LoadingRow}{LoadingRow}{LoadingRow}{LoadingRow}</div>
    }

    if(tasks.length === 0) {
        return (
        <div className="list-items">
        <div className="wrapper-message">
          <span className="icon-check" />
          <div className="title-message">You have no tasks</div>
          <div className="subtitle-message">Sit back and relax</div>
        </div>
      </div>
      )
    }
    const tasksInOrder = [
        ...tasks.filter(t => t.state === 'TASK_PINNED'),
        ...tasks.filter(t => t.state !== 'TASK_PINNED'),
      ];
    return (
      <div className="list-items">
        {tasksInOrder.map( task => <Task key={task.id} task={task} {...events}/>)}
      </div>
    )
 }


 TaskList.propTypes = {
    loading: PropTypes.bool,
    tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,
    onPinTask: PropTypes.func.isRequired,
    onArchiveTask: PropTypes.func.isRequired,
}

TaskList.defaultProps = {
    loading: false
}

function mapStateToProps(state) {
    return {
      tasks: state.tasks.filter(t=> t.state ==='TASK_INBOX' || t.state === 'TASK_PINNED')
    }
  }
  
  const mapDispatchToProps = dispatch => bindActionCreators({
    onArchiveTask: id => archiveTask(id),
    onPinTask: id => pinTask(id)
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)