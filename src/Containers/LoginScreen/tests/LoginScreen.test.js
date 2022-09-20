import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import LoginScreen from '../../LoginScreen/LoginScreen';



describe(("Login Screen"), () => {

    test('inputs should be in the document', () => {
        render(<LoginScreen />);

        const emailInput = screen.getByPlaceholderText('Email')
        expect(emailInput).toBeDefined();

        const passInput = screen.getByPlaceholderText('Password')
        expect(passInput).toBeDefined();
    })

    test('button should be in the document', async () => {
        const mockFn = jest.fn()
        render(<LoginScreen />);

        const loginButton = screen.getByText('Login')
        expect(loginButton).toBeDefined();

        const emailInput = screen.getByPlaceholderText('Email')
        fireEvent.changeText(emailInput, "test@gmail.com");

        const passInput = screen.getByPlaceholderText('Password')
        fireEvent.changeText(passInput, "12345678");




    })
})



  // fireEvent.press(navigationButton, navigate)