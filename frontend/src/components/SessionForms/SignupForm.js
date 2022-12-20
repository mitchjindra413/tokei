import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';
import { signup, clearSessionErrors } from '../../store/session';
import { hideModal } from '../../store/ui';
import { showLoginModal } from '../../store/ui';

function SignupForm() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const errors = useSelector(state => state.errors.session);
    const dispatch = useDispatch();

    const charsRegex = new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])")

    useEffect(() => {
        return () => {
            dispatch(clearSessionErrors());
        };
    }, [dispatch]);

    const usernameSubmit = e => {
        e.preventDefault();
        const user = {
            email,
            username,
            password
        };

        dispatch(signup(user));
    }

    return (
        <div>
            <form className="session-form" onSubmit={usernameSubmit}>
                <div className='right-align'>
                    <button onClick={() => dispatch(hideModal())} className='close-button' type='button'><i className="fa-solid fa-x"></i></button>
                </div>
                <div className='center-align'>
                    <h2>Sign up</h2>
                </div>
                <div className='input-container'>
                    <div className="errors">{errors?.email}</div>
                    <h3>Email</h3>
                    <input type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className='session-form-input'
                    />
                    
                    <div className="errors">{errors?.username}</div>
                    
                        <input type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            className='session-form-input'
                        />
                    <div className="errors">{errors?.password}</div>
                    
                        <input type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className='session-form-input'
                        />
                    <div className="needed">
                        <h4>Your password must have:</h4>
                        <p
                            style={password.length > 7 && password.length < 21 ? { color: 'green' } : { color: '#16182380'}}
                        >
                            <i className="fa-solid fa-check" style={password.length > 7 && password.length < 21 ? { color: 'green' } : { color: '#16182380' }}></i> 8 to 20 characters
                        </p>
                        <p
                            style={charsRegex.test(password) ? { color: 'green' } : { color: '#16182380' }}
                        >
                            <i className="fa-solid fa-check" style={charsRegex.test(password) ? { color: 'green' } : { color: '#16182380' }}></i> Capital letters, numbers and special characters
                        </p>
                    </div>
                    <input
                        type="submit"
                        value="Sign Up"
                        disabled={!email || !username || !(password.length > 7 && password.length < 21) || !charsRegex.test(password)}
                        className="session-form-submit"
                    />
                </div>
            </form>
            <div className='switch-session-form'>
                <p>
                    Already have an account? <span onClick={() => dispatch(showLoginModal())}>Log in</span>
                </p>
            </div>
        </div>
    );
}

export default SignupForm;