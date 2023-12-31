import React, { useState, useEffect, useContext } from 'react';
import ScrollElement from 'rc-scroll-anim/lib/ScrollElement';
import { Card, List } from 'antd';
import TeacherMessage from '../assets/teacher-message.svg'
import axios from 'axios';

import { UserContext } from '../App';

/*
GET, /messages:
  [
    {
      "courseUid": str (COMPXXXX),
      "teacher": str,
      "message": str
    },
    ...
  ]
*/

const TeacherMessageBoard = () => {
  const [messages, setMessages] = useState([]);
  const userContext = useContext(UserContext);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}messages`, {params:{uid: userContext.getUserUid()}});
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <Card hoverable title='Teacher Message Board' cover={<img src={TeacherMessage} height={300} />} style={{ width: '30%', height: 650 }}>
      <ScrollElement style={{ height: '250px', maxHeight: '250px', overflowY: 'auto' }}>
        <List
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={`${item.courseUid}: ${item.teacher}`}
                description={item.message}
              />
            </List.Item>
          )}
        />
      </ScrollElement>
    </Card>
  );
};

export default TeacherMessageBoard;
