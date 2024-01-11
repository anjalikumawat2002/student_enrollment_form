import { useState, useEffect, useRef } from "react"
import './App.css'
function App() {

  const connectionToken = '90931837|-31949300975632722|90962961'
  const DBName = 'SCHOOL-DB'
  const DBRel = 'STUDENT-TABLE'
  const formRef = useRef();

  const [data, setData] = useState({
    'rollNo': '',
    'fullName': '',
    'class': '',
    'birthDate':'',
    'address': '',
    'enrollmentDate': '',
  });

  const [saveState, setSaveState] = useState(false);
  const [updateState, setUpdateState] = useState(false);
  const [responseData, setResponseData] = useState({});
  const [recNo, setRecNo] = useState({});
  const [errorKey, setErrorKey] = useState('')

  function validateData(){
    const keys = Object.keys(data);
    for(let i=0; i<keys.length; i++){
      if(data[keys[i]]==='') {
        setErrorKey(keys[i]);
        return '';
      }
    }
    return data;
  }

  async function createStudent(e){
    e.preventDefault();
    const jsonData = validateData();

    if(jsonData === '') return;
    const info = {
      "token": connectionToken,
    "cmd": "PUT",
    "dbName": DBName,
    "rel": DBRel,
    "jsonStr": jsonData
    }
    const response = await fetch('http://api.login2explore.com:5577/api/iml',{
      method:'POST',
      body: JSON.stringify(info)
    })

    const jsonResponse = await response.json();
    if(jsonResponse.status === 200) {
      resetForm();
      alert('student data created successfully')
    }
    
  }

  async function updateStudent(e){
    e.preventDefault();
    const jsonData = validateData();
    if(jsonData === '') return;
    const info = {
      "token": connectionToken,
    "cmd": "UPDATE",
    "dbName": DBName,
    "rel": DBRel,
    "jsonStr": {
      [recNo]: jsonData
    }
    }
    const response = await fetch('http://api.login2explore.com:5577/api/iml',{
      method:'POST',
      body: JSON.stringify(info)
    })

    const jsonResponse = await response.json();
    if(jsonResponse.status === 200) {
      resetForm();
      alert('student data updated successfully')
    }

  }

  function loadData(e){
    const name = e.target.name;
    setData(prev=>({...prev, [name]:e.target.value}))
  }

  function focusHandler(e){
    const name = e.target.name;
    if(name===errorKey) setErrorKey('');
  }

  function resetForm(){
    setData({
      'rollNo': '',
      'fullName': '',
      'class': '',
      'birthDate':'',
      'address': '',
      'enrollmentDate': ''
    })
    setResponseData({})

  }

  useEffect(()=>{
    const info = {
      "token": connectionToken,
      "dbName": DBName,
      "cmd": "GET_BY_KEY",
      "rel": DBRel,
      "createTime": true,
      "updateTime": true,
      "jsonStr": {
          "rollNo": data.rollNo
      }
  
  }
    const signal = new AbortController();
    async function getStudentData(){

      try{
        const response = await fetch('http://api.login2explore.com:5577/api/irl', {
          method:'POST',
          signal: signal.signal,
          body: JSON.stringify(info)
        })
        const jsonData = await response.json();
        setResponseData(jsonData);
        if(jsonData.status === 200){
          const {record, rec_no} = JSON.parse(jsonData.data);
          setRecNo(rec_no)
          setData(prev=>({...prev, 
            fullName: record.fullName,
            class: record.class,
            enrollmentDate: record.enrollmentDate,
            address: record.address,
            birthDate: record.birthDate
          }));
        }
      }
      catch(e){
        if(!e.name==='AbortError'){
          console.log(e)
        }
      }

    }
    if(data.rollNo) {
     getStudentData();
    }

    return(()=>{
      signal.abort();
    })

  }, [data.rollNo])

  useEffect(()=>{
    if(!data.rollNo){ 
      setSaveState(false)
      setUpdateState(false)
    }
    else if(responseData.status === 400) {
      setSaveState(true);
      setUpdateState(false);
    }
    else if(responseData.status === 200) {
      setUpdateState(true);
      setSaveState(false);
    
    }
    
  }, [responseData, data.rollNo])
  
  return (
    <>

    <form action="" ref={formRef} id="form">
      <h1 className="heading-text">Student Enrollment Form</h1>
      <label>
        <span>Roll-NO</span>
        <input 
        className="input-field" 
        type="text" name="rollNo" id="rollNo" 
        value={data.rollNo} onChange={loadData}
        disabled={responseData.status===200}
        autoFocus
        placeholder="enter Roll-NO"/>
      </label>
      <label>
        <span>Full Name</span>
        <input 
        className="input-field" 
        type="text" name="fullName" id="fullName" 
        value={data.fullName}
        onChange={loadData}
        placeholder="enter Full Name"
        disabled={!data.rollNo}
        style={{borderColor:errorKey==='fullName'&&'red'}}
        onFocus={focusHandler}
        />
        {
          errorKey==='fullName'&&<div className="error">this can not be empty</div>
        }
      </label>
      <label>
        <span>Class</span>
        <input 
        className="input-field" 
        type="text" name="class" id="class" 
        onChange={loadData}
        value={data.class}
        placeholder="enter class"
        disabled={!data.rollNo}
        style={{borderColor:errorKey==='class'&&'red'}}
        onFocus={focusHandler}
        />
        {
          errorKey==='class'&&<div className="error">this can not be empty</div>
        }
      </label>
      <label>
        <span>Birth Date</span>
        <input 
        className="input-field" 
        type="date" name="birthDate" id="birthDate" 
        value={data.birthDate}
        onChange={loadData}
        placeholder="enter Birth Date"
        disabled={!data.rollNo}
        style={{borderColor:errorKey==='birthDate'&&'red'}}
        onFocus={focusHandler}
        />
        {
          errorKey==='birthDate'&&<div className="error">this can not be empty</div>
        }
      </label>
      <label>
        <span>Address</span>
        <input 
        className="input-field" 
        type="text" name="address" id="address" 
        value={data.address}
        onChange={loadData}
        placeholder="enter Address"
        disabled={!data.rollNo}
        style={{borderColor:errorKey==='address'&&'red'}}
        onFocus={focusHandler}
        />
        {
          errorKey==='address'&&<div className="error">this can not be empty</div>
        }
      </label>
      <label>
        <span>Enrollment-Date</span>
        <input 
        className="input-field" 
        type="date" name="enrollmentDate" id="enrollmentDate" 
        value={data.enrollmentDate}
        onChange={loadData} 
        placeholder="enter Enrollment-Date"
        disabled={!data.rollNo}
        style={{borderColor:errorKey==='enrollmentDate'&&'red'}}
        onFocus={focusHandler}
        />{
          errorKey==='enrollmentDate'&&<div className="error">this can not be empty</div>
        }
      </label>

      <div>
        <button disabled={!saveState} onClick={createStudent}>Save</button>
        <button disabled={!updateState} onClick={updateStudent}>Update</button>
        <button onClick={resetForm} disabled={!data.rollNo}>Reset</button>
      </div>
    </form>

    
    </>
  )
}

export default App
