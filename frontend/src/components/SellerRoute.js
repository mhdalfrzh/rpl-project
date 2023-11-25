import React from 'react';
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

export default function SellerRoute({ component: Component, ...rest }) {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo1 } = userSignin;
    return (
        <Route
            {...rest}
            render={(props) =>
                userInfo1 && userInfo1.isSeller ? (
                    <Component {...props}></Component>
                ) : (
                    <Redirect to="/signin" />
                )
            }
        ></Route>
    );
}