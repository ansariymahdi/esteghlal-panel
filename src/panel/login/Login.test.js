import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
// import react-testing methods
import { render, fireEvent, waitFor, screen, cleanup } from '@testing-library/react'

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import Login from './Login'

// import App from './../../index'
// test('allows the user to login successfully', async () => {
//     const mockStore = configureStore()
//     render(<Login />)

//     // fill out the form
//     fireEvent.change(screen.getByLabelText(/username/i), {
//         target: { value: 'chuck' },
//     })
//     fireEvent.change(screen.getByLabelText(/password/i), {
//         target: { value: 'norris' },
//     })

//     fireEvent.click(screen.getByText(/submit/i))

//     // just like a manual tester, we'll instruct our test to wait for the alert
//     // to show up before continuing with our assertions.
//     const alert = await screen.findByRole('alert')

//     // .toHaveTextContent() comes from jest-dom's assertions
//     // otherwise you could use expect(alert.textContent).toMatch(/congrats/i)
//     // but jest-dom will give you better error messages which is why it's recommended
//     expect(alert).toHaveTextContent(/congrats/i)
//     // expect(window.localStorage.getItem('token')).toEqual(fakeUserResponse.token)
// })
// describe('With React Testing Library', () => {
//     const initialState = { output: 10 }
//     const mockStore = configureStore()
//     let store, wrapper

//     test('Shows "Hello world!"', () => {
//         store = mockStore(initialState)
//         const { getByText } = render(<Provider store={store}><Login /></Provider>)
//         // render(<Login />)
//         // fireEvent.
//         // fireEvent.change(screen.getByText(/password/i), {
//         //     target: { value: 'norris' },
//         // })
//         // expect(getByText('Hello Worldd!')).not.toBeNull()
//         // const mockOnClick = jest.fn()
//         const clickIndicator = getByTestId('ClickIndicator')

//         fireEvent.click(clickIndicator)

//         // expect().toHaveBeenCalledTimes(1)

//     })
// })

afterEach(cleanup);
describe('With React Testing Library', () => {
    it('increments counter', () => {
        const initialState = {
            reducer: {
                showLoader: false
            }
        }
        const mockStore = configureStore()
        let store = mockStore(initialState)
        const { getByTestId } = render(<Provider store={store}><Login /></Provider>)
        // const { getByTestId } = render(<Login />);

        fireEvent.click(getByTestId('btn-login'))

        expect(getByTestId('counter')).toHaveTextContent("2")
    });
})

// it('decrements counter', () => {
//     const { getByTestId } = render(<TestEvents />);

//     fireEvent.click(getByTestId('button-down'))

//     expect(getByTestId('counter')).toHaveTextContent('-1')
// });