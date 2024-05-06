import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Make sure to import useLocation

function SearchData({role}) {
  const location = useLocation();
  const results = location.state?.results || [];
  const results2 = location.state?.results2;
  const [showPassword, setShowPassword] = useState(false);
  const [userRole, setRole] = useState([]);
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:8081/home')
      .then(res => {
        if (res.data.Status === "Success") {
          setRole(res.data.role);
        }
      })
      .catch(error => {
        console.error('CORS Error:', error);
      });
  }, []);
  const togglePasswordVisibility = (apartmentId) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [apartmentId]: !prevState[apartmentId],
    }));
  };
  return (
    <div className="mt-2 mx-auto">
      <div className="row" style={{ marginTop:"80px" }}>
      {results2 && (
          <div className="alert alert-warning" role="alert">
            <h1>{results2}</h1>
          </div>
        )}
        {results?.map((apartment) => (
          apartment.active && (
            <div className="col-sm-4" key={apartment._id}>
              <div className="card border-2 shadow mb-2 bg-white rounded">
                <div className="card-header text-center">
                  <h5 className="card-title">{apartment.name}</h5>
                  {apartment.address}, {apartment.city} {apartment.district} India
                </div>
                <img
                  src={'http://localhost:8081/images/' + apartment.pic1}
                  style={{ height: '300px' }}
                  className="img-fluid rounded-start"
                  alt="..."
                />
                <div className="card-body">
                  <p className="card-text font-weight-bold">
                    <div className="float-start">
                      Type <span className="fw-bold">{apartment.furnish}</span>
                    </div>
                    <div className="float-end fw-bold">For {apartment.gender} only</div>
                    <div className="clearfix"></div>
                    <div className="fw-bold">{apartment.atype}</div>
                  </p>
                  <p className="card-text">
                    Facility: {apartment.extra}
                    <br />
                    Rent ₹ {apartment.rent}+₹ {apartment.ebill}(Electricity) (Negotiable)
                  </p>
                  <p>
                    Owner Details:{' '}
                    <span className="fw-bold text-success" style={{ position: 'relative' }}>
                        {apartment.ownerId.username} (Ph:{" "}{showPassword[apartment._id] ? apartment.ownerId.contactNo : "********"})
                        <span
                          style={{
                            position: 'absolute',
                            right: '-40px',
                            top: '69%',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer',
                            padding: "11px",
                            color: "blue"
                          }}
                          className={`input-group-text toggle-password-2 ${showPassword[apartment._id] ? "fa fa-eye-slash" : "fa fa-eye"}`}
                          onClick={() => togglePasswordVisibility(apartment._id)}
                        ></span>
                      </span>
                  </p>
                  <p className="card-text">
                  {userRole==='user'?(
                    <Link
                      className="btn btn-warning"
                      to={"/apartmentdetails/" + apartment._id}
                    >
                      Book Room
                    </Link>
                    ):(
                      ""
                  )}
                  </p>
                </div>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

export default SearchData;
