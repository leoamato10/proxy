import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { HeroesProvider } from '../../../Context/HeroesProvider';
import { UserProvider } from '../../../Context/UserProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from '../../LoginScreen/LoginScreen';


describe(("Login Screen"), () => {

    test('inputs should be in the document', () => {
        render(<LoginScreen />);

        const emailInput = screen.getByPlaceholderText('Email')
        expect(emailInput).toBeDefined();

        const passInput = screen.getByPlaceholderText('Password')
        expect(passInput).toBeDefined();
    })

    test('button should be in the document', () => {
        render(<LoginScreen />);

        const loginButton = screen.getByRole('button')
        expect(loginButton).toBeDefined();

        const emailInput = screen.getByPlaceholderText('Email')
        fireEvent.changeText(emailInput, "test@gmail.com");

        const passInput = screen.getByPlaceholderText('Email')
        fireEvent.changeText(passInput, "12345678");

        fireEvent.press(loginButton)

        // const test = screen.getByText('Hi, Test')
        // expect(loginButton).toHaveBeenCalledTimes(1)
    })
})



  // fireEvent.press(navigationButton, navigate)