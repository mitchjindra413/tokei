import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';
import { login, clearSessionErrors } from '../../store/session';
import { hideModal } from '../../store/ui';
import { showSignupModal } from '../../store/ui';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const errors = useSelector(state => state.errors.session);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(clearSessionErrors());
        };
    }, [dispatch]);

    const update = (field) => {
        const setState = field === 'email' ? setEmail : setPassword;
        return e => setState(e.currentTarget.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    }

    return (
        <div>
            <form className="session-form" onSubmit={handleSubmit}>
                <div className='right-align'>
                    <button onClick={() => dispatch(hideModal())} className='close-button' type='button'><i className="fa-solid fa-x"></i></button>
                </div>
                <div className='center-align'>
                    <h2>Log in</h2>
                </div>
                <div className='input-container'>
                    <h3>Email or username</h3>
                    <input type="text"
                        value={email}
                        onChange={update('email')}
                        placeholder="Email or username"
                        className='session-form-input'
                    />
                    <div className="errors">{errors?.email}</div>
                    
                    <input type="password"
                        value={password}
                        onChange={update('password')}
                        placeholder="Password"
                        className='session-form-input'
                    />
                    <div className="errors">{errors?.password}</div>
                    
                    <input
                        type="submit"
                        value="Log in"
                        disabled={!email || !password}
                        className="session-form-submit"
                    />

                    <button
                        type="button"
                        className="session-form-submit"
                    >Login with demo</button>
                </div>
            </form>
            <div className='switch-session-form'>
                <p>
                    Don't have an account? <span onClick={() => dispatch(showSignupModal())}>Sign up</span>
                </p>
            </div>
        </div>
    );
}

export default LoginForm;