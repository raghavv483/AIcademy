import React, { ReactNode } from 'react';
import UserInputProvider from './_components/UserInputProvider';

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <UserInputProvider>
            {children}
        </UserInputProvider>
    );
}

export default Layout;