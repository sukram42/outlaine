import { Button, Form, Input } from "antd";
import { useState } from "react";
import { supabase } from "../app/supabaseClient";
import { Navigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";


interface LoginInformation {
    username: string,
    password: string
}

export function LoginView() {
    const [user, setUser] = useState<User>()
    const [loginError, setLoginError] = useState<Error>()
    console.log(loginError)
    async function logIn(values: LoginInformation) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: values.username,
            password: values.password
        })
        if (error) {
            setLoginError(error)
            return
        }
        setUser(data.user)
    }

    return (
        <>
            <div>{user ? <Navigate to={"/"}></Navigate> : ""}</div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={logIn}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"

                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input autoComplete="username" />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password autoComplete="current-password" />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form></>
    );
}