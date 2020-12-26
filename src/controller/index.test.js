import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
// import react-testing methods
import { render, fireEvent, waitFor, screen } from '@testing-library/react'


import { isLoggedIn } from './../controller'

test('has correct welcome text', async () => {
    render(isLoggedIn())
    // expect(screen.getByRole('heading')).toHaveTextContent('Welcome, John Doe')

    // await waitFor(() =>
    //     // getByRole throws an error if it cannot find an element
    //     screen.getByRole('heading')
    // )
    // expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!')
})