import { useForm } from 'react-hook-form';
import { object,string,date } from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import './App.css';
import Onito from "./onito.png";
import { useState } from 'react';

function App() {
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const schema = object({
    name: string().required('Name is required'),
    dateOfBirth: date().required("Date of birth is required"),
    sex: string().required("Sex of the user is required"),
    mobile: string().matches(phoneRegExp,'Mobile number not valid'),
    contact: string().matches(phoneRegExp,'Contact number not valid')
  })

  const {register,handleSubmit,formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  });

  //const handleRegistration = (data) => console.log(data);

  const [name,setName] = useState("");
  const [dateOfBirth,setDateOfBirth] = useState("");
  const [sex,setSex] = useState("");
  const [address,setAddress] = useState("");
  const [city,setCity] = useState("");
  const [state,setState] = useState("");
  const [country,setCountry] = useState("");
  const [idValue,setIdValue] = useState("");
  const [guardianName,setGuardianName] = useState("");
  const [nationality,setNationality] = useState("");
  const [mobile,setMobile] = useState("");
  const [guardian,setGuardian] = useState("");
  const [email,setEmail] = useState("");
  const [contact,setContact] = useState("");
  const [pincode,setPincode] = useState("");
  const [occupation,setOccupation] = useState("");
  const [religion,setReligion] = useState("");
  const [marital,setMarital] = useState("");
  const [bloodGroup,setBloodGroup] = useState("");

  const handleRegistration = async (e) => {
    let result = await fetch(
      'http://localhost:5000/register',{
        method: "post",
        body: JSON.stringify({name,dateOfBirth,sex,address,city,state,country,idValue,guardianName,nationality}),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    result = await result.json();
    console.warn(result);
    if(result){
      alert("Data saved successfully");
      setName(name);
      setDateOfBirth(dateOfBirth);
      setSex(sex);
      setAddress(address);
      setCity(city);
      setState(state);
      setCountry(country);
      setIdValue(idValue);
      setGuardianName(guardianName);
      setNationality(nationality);
    }
  }

  return (
    <div className='main-container'>
      <nav className='navigation-bar'>
        <h1 className='heading'>User Registration Form</h1>
        <img src={Onito} alt="onito" className='logo'/>
      </nav>
      <hr style={{width:"100%",marginTop:"-3%",border:"1px solid black"}}/>
      <form className='form-container' onSubmit={handleSubmit(handleRegistration)}>
        <h4 className='form-heading'>Personal Details</h4>
        <div className='form-section'>
          <div style={{display:"flex"}}>
            <label htmlFor='name' style={{marginRight:5}}>Name</label>
            <span>{errors?.name?.message}</span>
            <input type="text" placeholder='Enter Name' id="name" required={true} name="name" {...register('name',{required: true})} onChange={(e) => setName(e.target.value)}/>
          </div>
          <div style={{display:"flex"}}>
            <label htmlFor="dateOfBirth" style={{marginRight:5}}>Date of Birth</label>
            <input type="date" id="dateOfBirth" required={true} name="dateOfBirth" {...register("dateOfBirth",{required: true})} onChange={(e) => setDateOfBirth(e.target.value)}/>
          </div>
          <div style={{display:"flex"}}>
            <label htmlFor='sex' style={{marginRight:5}}>Sex</label>
            <select name="sex" id="sex" {...register("sex")} onChange={(e) => setSex(e.target.value)}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>
        </div>
        <div className='form-section' style={{marginTop:20}}>
          <div style={{display:"flex"}}>
            <label htmlFor='mobile' style={{marginRight:5}}>Mobile</label>
            <input type="number" id="mobile" placeholder="Enter Mobile" name="mobile" {...register("mobile")} onChange={(e) => setMobile(e.target.value)}/>
          </div>
          <div style={{display:"flex"}}>
            <label htmlFor='id' style={{marginRight:5}}>Govt Issued ID</label>
            <select name="id" id="id" style={{marginRight:5}} {...register("id")}>
              <option value="aadhar">Aadhar</option>
              <option value="pan">PAN</option>
            </select>
            <input type="text" name="idValue" id="idValue" {...register("idValue")} placeholder="Enter Govt ID" onChange={(e) => setIdValue(e.target.value)}/>
          </div>
        </div>
        <h4 className='form-heading'>Contact Details</h4>
        <div className='form-section'>
          <div style={{display:"flex"}}>
            <label htmlFor="guardian" style={{marginRight:5}}>Guardian Details</label>
            <select name="guardian" id="guardian" style={{marginRight:5}} {...register("guardian")} onChange={(e) => setGuardian(e.target.value)}>
              <option value="father">Father</option>
              <option value="mother">Mother</option>
            </select>
            <input type="text" name="guardianName" id="guardianName" {...register("guardianName")} placeholder="Enter Guardian Name" onChange={(e) => setGuardianName(e.target.value)}/>
          </div>
          <div style={{display:"flex"}}>
            <label htmlFor="email" style={{marginRight:5}}>Email</label>
            <input type="email" name="email" id="email" {...register("email")} placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div style={{display:"flex"}}>
            <label htmlFor='contact' style={{marginRight:5}}>Emergency Contact Number</label>
            <input type="number" name="contact" id="contact" {...register("contact")} placeholder="Enter Emergency No" onChange={(e) => setContact(e.target.value)}/>
          </div>
        </div>
        <h4 className='form-heading'>Address Details</h4>
        <div className='form-section'>
          <div style={{display:"flex"}}>
            <label htmlFor="address" style={{marginRight:5}}>Address</label>
            <input type="text" name="address" id="address" {...register("address")} placeholder="Enter Address" onChange={(e) => setAddress(e.target.value)}/>
          </div>
          <div style={{display:"flex"}}>
            <label htmlFor="state" style={{marginRight:5}}>State</label>
            <input type="text" name="state" id="state" {...register("state")} placeholder="Enter State" onChange={(e) => setState(e.target.value)}/>
          </div>
          <div style={{display:"flex"}}>
            <label htmlFor='city' style={{marginRight:5}}>City</label>
            <input type="text" name="city" id="city" {...register("city")} placeholder="Enter City" onChange={(e) => setCity(e.target.value)}/>
          </div>
        </div>
        <div className='form-section' style={{marginTop:20}}>
          <div style={{display:"flex"}}>
            <label htmlFor='country' style={{marginRight:5}}>Country</label>
            <input type="text" name="country" id="country" {...register("country")} placeholder="Enter Country" onChange={(e) => setCountry(e.target.value)}/>
          </div>
          <div style={{display:"flex"}}>
            <label htmlFor='pincode' style={{marginRight:5}}>Pincode</label>
            <input type="number" name="pincode" id="pincode" {...register("pincode")} placeholder="Enter pincode" onChange={(e) => setPincode(e.target.value)}/>
          </div>
        </div>
        <h4 className='form-heading'>Other Details</h4>
        <div className='form-section'>
          <div style={{display:"flex"}}>
            <label htmlFor='occupation' style={{marginRight:5}}>Occupation</label>
            <input type="text" name="occupation" id="occupation" {...register("occupation")} placeholder="Enter Occupation" onChange={(e) => setOccupation(e.target.value)}/>
          </div>
          <div style={{display:"flex"}}>
            <label htmlFor='religion' style={{marginRight:5}}>Religion</label>
            <input type="text" name="religion" id="religion" {...register("religion")} placeholder="Enter Religion" onChange={(e) => setReligion(e.target.value)}/>
          </div>
          <div style={{display:"flex"}}>
            <label htmlFor='marital' style={{marginRight:5}}>Marital Status</label>
            <select name="marital" id="marital" {...register("marital")} onChange={(e) => setMarital(e.target.value)}>
              <option value="married">Married</option>
              <option value="unmarried">Unmarried</option>
            </select>
          </div>
          <div style={{display:"flex"}}>
            <label htmlFor='bloodGroup' style={{marginRight:5}}>Blood Group</label>
            <select name="bloodGroup" id="bloodGroup" {...register("bloodGroup")} onChange={(e) => setBloodGroup(e.target.value)}>
              <option value="a">A</option>
              <option value="b">B</option>
              <option value="ab">AB</option>
              <option value="o">O</option>
            </select>
          </div>
        </div>
        <div className='form-section' style={{marginTop:20}}>
          <div style={{display:"flex"}}>
            <label htmlFor="nationality" style={{marginRight:5}}>Nationality</label>
            <input type="text" name="nationality" id="nationality" {...register("nationality")} placeholder="Enter Nationality" onChange={(e) => setNationality(e.target.value)}/>
          </div>
        </div>
        <div style={{display:"flex",justifyContent:"flex-end"}}>
          <button type="submit" className='submit-button'>SUBMIT</button>
        </div>
      </form>
    </div>
  );
}

export default App;
