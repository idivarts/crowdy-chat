import React from 'react';
import ImageComponent from './ImageComponent.web';
import { IConversationUnit } from '@/types/CampaignsBoard';
import Colors from '@/constants/Colors';

interface IProps {
  task: IConversationUnit;
  handlecurrentconversation: (task: IConversationUnit) => void;
}

const ConversationCard: React.FC<IProps> = (props) => {
  const task = props.task;

  return (
    <div
      {...props}
      onClick={() => props.handlecurrentconversation(task)}
      style={{
        backgroundColor: Colors.regular.white,
        borderRadius: '10px',
        padding: '6px 8px',
        margin: '4px 0',
        fontSize: '14px',
        border: `1px solid ${task.status > 0 ? '#11ca27' : '#e2e4e6'}`,
        display: 'flex',
        flexDirection: 'row'
      }}
    >
      <ImageComponent
        url={task.user?.profilePic}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%'
        }}
      />
      <div
        style={{
          flex: 1,
          marginLeft: '10px',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div
          style={{ display: 'flex' }}
        >
          <p>
            {props.task.user.name || props.task.user.userName || props.task.igsid}
          </p>
          (<span
            style={{
              textOverflow: 'ellipsis',
            }}
          >
            {task.user?.userName}
          </span>)
        </div>
        <div className='page'>
          <div className='page-name'>
            {task.page?.name}
          </div>
        </div>
        <hr />
        <div className='user-status'>
          <div>{"Bot Message Count: " + task.botMessageCount}</div>
          {task.lastBotMessageTime > 0 && (
            <div>{"Last Message Time: " + new Date(task.lastBotMessageTime).toUTCString()}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationCard;
