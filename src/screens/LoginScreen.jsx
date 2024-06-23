import { Button, Card, Form, Input } from 'antd';
import axios from 'axios';
import React from 'react';

const LoginScreen = () => {

    const [form] = Form.useForm();

    const handleLogin = async (values) => {
        const { username, password } = values


        const api = `/auth/login`;

        try {
            const res = await axios({
                method: 'post',
                url: `http://localhost:3001/api-v1${api}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: values,
            });

            console.log(res);

            if (res && res.status === 200 && res.data) {
                const data = res.data.data;

                localStorage.setItem('user', JSON.stringify(data));
                // console.log(data);

            }
        } catch (error) {
            console.log(error);
        }


        // console.log(values);

    }


    return (
        <div>
            <div className="container">
                <div className="col-6 offset-3 mt-4">
                    <Card>
                        <h1>Login</h1>
                        <Form
                            form={form}
                            layout='vertical'
                            onFinish={handleLogin}>

                            <Form.Item name={'username'} rules={[{
                                required: true,
                                message: 'Email is required'
                            }]}>
                                <Input placeholder='Email' />
                            </Form.Item>


                            <Form.Item name={'password'} rules={[{
                                required: true,
                                message: 'Password is required'
                            }]}>
                                <Input.Password placeholder='Password' />

                            </Form.Item>

                        </Form>

                        <div className="mt-2 text-right">
                            <Button type='primary' onClick={() => form.submit()}>Login</Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default LoginScreen;
