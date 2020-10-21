import React, {useEffect, useState} from "react";
import {GetCompanyDetails} from "../../services/CompanyService";

function CompanyDetails(props) {
    const [company, setCompany] = useState(null);

    useEffect(() => {
        GetCompanyDetails(props.companyId)
            .then(res => {
                setCompany(res.data);
            })
    }, [])

    console.log(props)

    return (
        <>
            {company && <div>
                {company.name}
            </div>}
        </>
    )
}

export default CompanyDetails;