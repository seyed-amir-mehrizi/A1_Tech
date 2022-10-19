import { AppAlertProps } from "../../assets/models/models"

function AppAlert({className , message} : AppAlertProps) {
    return (
        <div className={className} data-testid="alert-box">
            {message}
        </div>
    )
}

export default AppAlert
