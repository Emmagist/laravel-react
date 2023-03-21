import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import axiosClient from "../axios-client.jsx";

export default function Signup(){

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [errors, setErrors] = useState(null);

    const {setUser, setToken} = useStateContext();
    const onSubmit = (event) => {
        event.preventDefault()
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            confirm_password: confirmPasswordRef.current.value
        }

        axiosClient.post('/signup', payload)
            .then(({data}) => {
                setUser(data.user)
                setToken(data.token);
            })
            .catch( err => {
                const  response = err.response;
                if (response && response.status == 422) {
                    setErrors(response.data.errors);
                }
            })
    }
    return (

        <form onSubmit={onSubmit}>
            <h1 className={'nameRef'}>Signup for free.</h1>
            {
                errors && <div className={'alert'}>
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
            }
            <input ref={nameRef} placeholder={'Full Name'}/>
            <input ref={emailRef} placeholder={'Email'}/>
            <input type={'password'} ref={passwordRef} placeholder={'Password'}/>
            <input type={'password'} ref={confirmPasswordRef} placeholder={'Password Confirmation'}/>
            <button className={'btn btn-block'}>Signup</button>
            <p className={'message'}>Already Registered? <Link to={'/login'} >Sign In</Link></p>
        </form>
    )
}
