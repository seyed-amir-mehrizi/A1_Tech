import { AppAlertProps } from "../../assets/models/models"

function AppAlert({className , message} : AppAlertProps) {
    return (
        <div className={className}>
            {message}
        </div>
    )
}

export default AppAlert
