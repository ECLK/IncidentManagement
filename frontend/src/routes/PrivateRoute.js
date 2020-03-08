import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import { withRouter } from "react-router";


function PrivateRouteComponent({ component: Component, isSignedIn, children, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => {
                return (
                    isSignedIn ? (
                        <Component children={children} {...props} />
                    ) : (
                        <div>
                            <Redirect
                                to={{
                                    pathname: "/sign-in",
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
        isSignedIn: state.shared.signedInUser.isSignedIn,
        ...ownProps
    }
}

export default withRouter(connect(mapStateToProps) (PrivateRouteComponent));