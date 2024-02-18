import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ExampleContext from '../../context/Context';
import Axios from "axios";
import profileimg from "../../assets/profile.svg";

export default function UserInfo() {
    const [imageFile, setImageFile] = useState(null);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [countryCodes, setCountryCodes] = useState([]);
    
    useEffect(() => {
        Axios.get("https://restcountries.com/v3.1/all")
            .then((response) => {
                const countries = response.data.map((country) => ({
                    name: country.name.common,
                    code: country.idd.root,
                    image: country.coatOfArms
                }));
                console.log(response.data);
                setCountryCodes(countries);
            })
            .catch((error) => {
                console.error("Error fetching country data: ", error);
            });
    }, []);

    const handleImageChange = (event) => {
        setImageFile(event.target.files[0]);
    };

    return (
        <>
            <style>
  {`
    @media (max-width: 991px) {
      .form {
        flex-direction: column !important;
        justify-content: center !important;
        align-items: center;
        font-size: 15px !important;
      }
      .profileimage {
        margin-left: 20px !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: center !important;
        align-items: center;
      }
      .imageinput {
        display: flex !important;
        flex-direction: column !important;
        justify-content: center !important;
        align-items: center;
      }
      .username{
        display: flex !important;
        flex-direction: column !important;
      }
    }
  `}
</style>

            <div className="form" style={{ border: '2px solid black', margin: '10px', display: 'flex', flexDirection: 'row', fontSize: '20px' }}>
                <div className="profileimage" style={{ margin: '20px', marginLeft: '100px' }}>
                    <img src={imageFile ? URL.createObjectURL(imageFile) : profileimg} alt="" style={{ border: '1px solid', height: '200px' }} />
                    <input className="imageinput" type="file" style={{ marginTop: '50px' }} onChange={handleImageChange} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
                    <div className="username" style={{ display: 'flex', flexDirection: 'row', gap: '50px' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px', gap: '20px', height: '60px' }}>
                            <h1>Email:</h1>
                            <input type="text" className="rounded" style={{ width: "100%" }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px', gap: '20px', height: '60px' }}>
                            <h1>Username:</h1>
                            <input type="text" className="rounded" style={{ width: '100%' }} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px', gap: '20px', height: '60px' }}>
                        <h1>Phone</h1>
                        <select className="rounded" style={{ width: '13%', height: '45px' }}>
                            {countryCodes.map((country) => (
                                <option key={country.code} value={country.code}>
                                    {country.name} {country.code} {country.coatOfArms}
                                </option>
                            ))}
                        </select>
                        <input type="text" className="rounded" style={{ width: '50%' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px', gap: '20px', height: '60px' }}>
                        <h1>Address1</h1>
                        <input type="text" className="rounded" style={{ width: '80%' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px', gap: '20px', height: '60px' }}>
                        <h1>Address2</h1>
                        <input type="text" className="rounded" style={{ width: '80%' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px', gap: '20px', height: '60px' }}>
                            <h1>State</h1>
                            <input type="text" className="rounded" style={{ width: '50%' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px', gap: '20px', height: '60px' }}>
                            <h1>Country</h1>
                            <input type="text" className="rounded" style={{ width: '50%' }} />
                        </div>
                    </div>
                    <div style={{display:'flex', justifyContent:'center'}}>
                    <button className="lg:w-1/3 w-2/3 items-center mb-5">
                        Submit
                    </button>
                    </div>
                </div>
            </div>
        </>
    );

}

