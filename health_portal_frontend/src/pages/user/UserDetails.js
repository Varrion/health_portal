import React, {useEffect, useState} from "react";
import {GetUserDetails} from "../../services/UserService";

function UserDetails(props) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        GetUserDetails()
            .then(res => {
                setUser(res.data);
            })
    }, [])

    return (
        <div>

        </div>
    )
}

export default UserDetails;