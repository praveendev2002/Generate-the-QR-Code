

import { useState } from "react";
import './App.css';

const Qrcode = () => {
  const [ img,setImg]=useState("")
  const [ loading,setLoding]=useState("");
  const [qrData,setQrData]=useState("");
  const [ size,setSize]=useState("")
   function generate(){
    setLoding(true);
    try{
      const url=`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${ encodeURIComponent(qrData)}`;
      setImg(url);
    }catch (error){
      console.log("Error generating QR Code",error);
    } finally{
        setLoding(false)
    }
  }
  function download(){
    alert(" Are You Download Your QRcode Picture")
    fetch(img).then((Response)=>Response.blob())
    .then((blob)=>{
const link=document.createElement("a");
link.href=URL.createObjectURL(blob)
link.download="QRcode.png";
document.body.appendChild(link)
link.click();
document.body.removeChild(link)
 })
 .catch((error)=>{
        console.log( " Error downloding QR code",error);
    });
  }
   
  return (
    <div className="container">
        <h1> QR CODE GENERATOR</h1>
        { img &&<img src={img} className="img"/>}
        {loading && <p> please wait....</p>}

        <div>
            <label htmlFor="dataInput" className="input-lable"> Data For QR code</label>
            <input type="text"  value={qrData}   id="dataInput"  placeholder="Enter the data Qrcode"
             onChange={(e)=>setQrData(e.target.value)}/>
            <label htmlFor="sizeInput" className="input-lable"> img size (eg.150)</label>
            <input type="text" value={size} id="sizeInput"  placeholder="Enter image Size" 
            onChange={(e)=>setSize(e.target.value)} />
             <button className="Generate-btn" disabled={loading} onClick={generate} > Generate Qrcode</button>
             <button className="download-btn" onClick={download}> Download Qrcode</button>

            
        </div>
        <p> Designed By <a href="https://wa.link/m08lsw"> Praveen Dev</a> </p>
     
    </div>
  );
}

export default Qrcode;
