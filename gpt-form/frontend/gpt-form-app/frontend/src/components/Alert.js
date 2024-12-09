import React from 'react'
import { useAlert } from '../contexts/AlertContext'

function Alert(props) {
    const {alert} = useAlert();
    return (
        alert &&
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
            {alert.msg}
        </div>
    )
}

export default Alert