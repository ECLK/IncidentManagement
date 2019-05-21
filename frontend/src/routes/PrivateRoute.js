import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux'


function PrivateRouteComponent({ component: Component, isSignedIn, ...rest }) {

    return (
        <Route
            {...rest}
            render={(props) => {
                return (
                    isSignedIn ? (
                        <Component {...props} />
                    ) : (
                        <div>
                            <Redirect
                                to={{
                                    pathname: "/",
                                    state: { from: props.location }
                                }}
                            />
                        </div>
                        )
                )
            }}
        />
    );
}


const mapStateToProps = (state, ownProps) => {
    return {
        isSignedIn: state.sharedReducer.signedInUser.isSignedIn,
        ...ownProps
    }
}

export default connect(mapStateToProps) (PrivateRouteComponent);