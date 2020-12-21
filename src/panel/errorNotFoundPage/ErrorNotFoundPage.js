import React, { useState, useEffect, useReducer, useCallback } from 'react';

import ErrorForbidden from './../../assets/icon/ErrorForbidden'

const ErrorNotFoundPage = (props) => {


    return (
        <div>
            <div class="container">
                <div class="row justify-content-between">
                    <div class="col-6">
                        <ErrorForbidden />
                    </div>
                    <div class="col-6 d-flex justify-content-center align-items-center">
                        <div class="row align-items-center">
                            <div class="col-12 col-sm-12 d-flex justify-content-center mb-5">
                                <h1 id="forbidden-code">404</h1>
                            </div>
                            <div class="col-12 col-sm-12 d-flex justify-content-center mt-5">
                                <h1>!این صفحه یافت نشد</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ErrorNotFoundPage;
