import React, {useState, useEffect} from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


const OnboardForm = ({values, touched, errors, status})=> {
    const [worker, setWorker] = useState([])
    useEffect(() => {
        console.log('status has changed!', status)
        status && setWorker(worker => [...worker, status])
    }, [status])
    return(
        <div>
        <Form>
            <label htmlFor='name' >
                <Field 
                id='name'
                type='text'
                name='name'
                placeholder='Your Name'
                />
            {touched.name && errors.name && (<p>{errors.name}</p>)}

            </label >
            <label htmlFor='email'>
                <Field
                id='email'
                type='text'
                name='email'
                placeholder='Your E-Mail'
                />
            {touched.email && errors.email && (<p>{errors.email}</p>)}
            </label>
            <label htmlFor='password'>
                <Field
                id='password'
                type='password'
                name='password'
                placeholder='Your Password'
                />
             {touched.password && errors.password && (<p>{errors.password}</p>)}
            </label>
            <label htmlFor='terms'>
                <Field 
                id='terms'
                type='checkbox'
                name='terms'
                />
             {touched.terms && errors.terms && (<p>{errors.terms}</p>)}
            </label>
            <button type='submit'> Submit</button>
        </Form>

        {worker.map(worker => (
            <ul key={worker.id}>
                <li>Name: {worker.name}</li>
                <li>E-Mail: {worker.email}</li>
                <li>Password: {worker.password}</li>
                <li>Terms: {worker.terms}</li>
            </ul>

        ))}
    </div>

    )
}

const FormikOnboard = withFormik({
    mapPropsToValues({name, email, password, terms}){
        return{
            name: name || '',
            email: email || '',
            password: password || '',
            terms: terms || false
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required()
    }),
    handleSubmit(values, {setStatus, resetForm}){
        console.log('submitting', values)
        axios.post('https://reqres.in/api/users',values)
        .then(response => {
            console.log('success', response)
            setStatus(response.data);
            resetForm();
        })
        .catch(errors => {
            console.log(errors)
        })
    }

})(OnboardForm);


export default FormikOnboard;