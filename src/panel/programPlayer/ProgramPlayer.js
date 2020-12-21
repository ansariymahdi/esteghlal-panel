import React, { useState } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import { validateEmpty } from './../../App/components/formValidator/FormValidator'
import Aux from "../../hoc/_Aux";

const ProgramPlayer = props => {
    const [errors, setErrors] = useState({});
    const [name, setName] = useState();
    return (
        <Aux>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">ثبت نظر سنجی</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <h5>Form controls</h5>
                            <hr />
                            <Row>

                                <Col md={3} className="text-right">

                                    <Form.Label> نام نظرسنجی</Form.Label>
                                    <Form.Control placeholder="نام نظر سنجی را وارد نمایید" className="text-right"
                                        required
                                        type="text"
                                        onBlur={(e) => {
                                            validateEmpty({
                                                name: e.target.name,
                                                value: e.target.value,
                                                handler: setErrors,

                                            });
                                        }}
                                        onChange={(event) => {
                                            setName(event.target.value);
                                        }}
                                        value={name}
                                        name="name"
                                    />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                    <Button variant="primary">
                                        Submit
                                            </Button>
                                </Col>

                            </Row>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>


    )
}

export default ProgramPlayer;