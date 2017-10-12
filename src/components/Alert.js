import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hideAlert } from '../actions/index';

// alert shown when something goes right or wrong
export const Alert = ({message, type, hideAlert}) => {
    if (!message) {
        return null;
    }

    return (
        <div className="row justify-content-center mt-4">
            <div className="col-8">
                <div className={`alert alert-${type} alert-dismissible`}>
                    <button type="button" className="close pointer" onClick={hideAlert}>
                        <span>&times;</span>
                    </button>
                    {message}
                </div>
            </div>
        </div>
    );
};

Alert.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    hideAlert: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    const { message, type } = state.alert;

    return {
        message,
        type
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        hideAlert: () => dispatch(hideAlert())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);