
/** @format */
import { CareerServices } from "../../../../services";

function CareerProfileFunction() {
    if (!(this instanceof CareerProfileFunction)) {
        return new CareerProfileFunction();
    }
}

/**
 * Get user job title
 * @param userDataToken
 */
CareerProfileFunction.prototype.getUserProfile = function (userDataToken) {
    return new Promise((resolve, reject) => {
        CareerServices.getJobProfile(userDataToken)
            .then((response) => { if (response.data.code == 200) resolve(response.data.data); else reject(response.data.data); })
            .catch((err) => { reject(err.response.data); })
    })
}



var CareerProfile = new CareerProfileFunction()
export default CareerProfile

