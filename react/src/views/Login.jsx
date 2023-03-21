import {Link} from "react-router-dom";
import axiosClient from "../axios-client.jsx";
import {useRef} from "react";

export default function Login(){

    const emailRef = useRef();
    const passwordRef = useRef();

    const onSubmit = (event) => {
        event.preventDefault()
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        axiosClient.post('/login', payload)
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
                    <h1 className={'title'}>Login to your account</h1>
                    {
                        errors && <div className={'alert'}>
                            {Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    }
                    <input ref={emailRef} type={'email'} placeholder={'Email'}/>
                    <input ref={passwordRef} type={'password'} placeholder={'Password'}/>
                    <button className={'btn btn-block'}>Login</button>
                    <p className={'message'}>No account? <Link to={'/signup'} >Create here</Link></p>
                </form>

    )
}
