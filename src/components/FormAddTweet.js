import React, { useState } from "react";
import {Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { validationFormAddTweetAction } from "../actions/validationsActions";
import { addTweetAction } from "../actions/tweetsActions";
import { openCloseAddTweetModalAction } from '../actions/modalsActions'
import uuid from "uuid/v4";
import moment from "moment";



export default function FormAddTweet() {
    const [formValue, setFormValue] = useState({
        name:"",
        tweet:""
    });

 //   iniciacilizacon del dispatch  y ejecuacion de la accion 
 const dispatch = useDispatch();
 const errorForm = state => dispatch(validationFormAddTweetAction(state));
const addTweet = state => dispatch(addTweetAction(state));
const closeModal = state => dispatch(openCloseAddTweetModalAction(state))
 // obtener estados de la valoracion de formulario

 const errorFormValue = useSelector(
     state => state.validations.errorFormAddTweet
    );

    const onChange = e => {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        });
    };



const onSubmit = e => {
    e.preventDefault();

    const { name, tweet } = formValue;

    if(!name || !tweet) {

        errorForm(true);  
      
    } else {
        errorForm(false);
        addTweet({
            id: uuid(),
            name,
            tweet,
            date: moment()
        });
        closeModal(false);
      

    }
    

};



    return (
        <Form className="m-3" onChange={onChange} onSubmit={onSubmit}>
            <Form.Group className="text-center">
                <h1>nuevo tweet</h1>

            </Form.Group>

            <Form.Group>
                <Form.Control type="text" name="name" placeholder="escribe tu nombre" />
            </Form.Group>
            <Form.Group>
                <Form.Control
                as="textarea"
                name="tweet"
                row="3"
                placeholder="escribe cualquier mierda..."
                />
            </Form.Group>
        <Button varian="primary" type="submit">
enviar twwert
        </Button>
        {errorFormValue  && (
            <Alert variant="danger" className="mt-4">
            todos lso campos son obligatosiros putos
            </Alert>
         ) }
        </Form>
    );
}