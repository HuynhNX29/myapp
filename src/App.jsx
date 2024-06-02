import React, { useState, useEffect } from 'react';
import { Button, Card, Input, List, message, Space } from 'antd';
import axios from 'axios';
import { BiEdit, BiTrash } from 'react-icons/bi';

const App = () => {

  const [content, setContent] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState();

  useEffect(() => {
    getTasks()
  }, []);

  useEffect(() => {

    if (task) {
      setContent(task.content);
    }
  }, [task]);


  const handleAddNewTask = async () => {
    if (!content) {
      message.error('Please enter your task')

    }

    else {
      setIsCreating(true);
      try {
        const res = await axios({
          method: task ? 'PUT' : 'POST',
          url: `http://localhost:3001/${task ? `update-task?id=${task._id}` : 'add-new-task'
            }`,
          headers: { 'Content-Type': 'application/json' },
          data: { content }
        })


        setTask(undefined)
        // console.log(res);
        setContent('')
        setIsCreating(false);
        await getTasks();

      } catch (error) {
        console.log(error);
      }
    }
  }

  const getTasks = async () => {
    const api = 'http://localhost:3001/get-tasks';
    try {

      const res = await axios(api)
      // console.log(res);
      if (res && res.status === 200 && res.data) {
        setTasks(res.data.data)
      }

    } catch (error) {
      console.log(error);
    }
  }

  const removeTask = async (id) => {
    const api = `http://localhost:3001/remove-task?id=${id}`;
    try {
      await axios({
        method: 'delete',
        url: api,
      });

      await getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row mt-3">
          <div className="col-6 offset-3">
            <Card title='Todo List'>
              <Input
                disabled={isCreating}
                value={content}
                onChange={(val) => { setContent(val.target.value) }}
                allowClear
                size='large'
                onPressEnter={handleAddNewTask}
                placeholder='Write your plan here'
              />
              <div className="mt-2">
                <List dataSource={tasks}
                  renderItem={(item) => <List.Item key={item._id}
                    extra={
                      <Space>
                        <Button type='text'
                          icon={<BiEdit
                            size={20}
                            color='coral'
                            onClick={() => setTask(item)}
                          />}>
                        </Button>

                        <Button
                          onClick={() => removeTask(item._id)}
                          type='text'
                          icon={<BiTrash size={20} color='red' />}
                        />
                      </Space>}>

                    <List.Item.Meta title={item.content}
                      description={item.createAt} />
                  </List.Item>}
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}


//github new practice
export default App;

