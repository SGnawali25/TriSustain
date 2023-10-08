import React, { Fragment, useEffect, useState } from 'react';

import MetaData from '../layout/MetaData';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearErrors } from '../../actions/userActions';
import { useNavigate } from 'react-router-dom';
import Connex from '@vechain/connex'



const Register = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const [name, setName] =  useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");


    const {isAuthenticated, error, loading} = useSelector(state => state.registerUser)

    useEffect(() => {
        if (isAuthenticated){
            navigate('/');
        }

        if (error){
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, isAuthenticated, error]);

    // const connex = new Connex({
    //     node: 'https://mainnet.vechain.net/'
    // })

    const submitHandler = (e) => {
        e.preventDefault();
        // Connex.thor.link().open();
        dispatch(register(name, email, password, role));
        
    }

  return (
    <Fragment>

            <MetaData title={'Register User'} />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className="mb-3">Register</h1>

                        <div className="form-group">
                            <label htmlFor="name_field">Name</label>
                            <input
                                type="name"
                                id="name_field"
                                className="form-control"
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>



                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                name='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="role_dropdown">Role</label>
                            <select
                                id="role_dropdown"
                                className="form-control"
                                name="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="">Please select a role</option>
                                <option value="host">Host</option>
                                <option value="user">User</option>
                            </select>
                        </div>

                        

                        <button
                            id="register_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false}
                        >
                            REGISTER
                        </button>
                    </form>
                </div>
            </div>

        </Fragment>
  )
}

export default Register