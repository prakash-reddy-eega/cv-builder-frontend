import React, { useRef, useState } from "react";
import { useSelector } from "react-redux"
import { Preview } from "../Preview/preview"
import { useLocation, Navigate } from "react-router-dom"
import jsPDF from "jspdf";
import "jspdf-autotable";
import classes from './Download.module.css'
import html2pdf from "html2pdf.js";

export const DownloadCv = () => {
    const location = useLocation()
    const pdfRef = useRef();
    const [pdfSrc, setPdfSrc] = useState("");

    //download
    function downloadPDF() {
        const element = document.getElementById("content");
        const opt = {
          margin: 1,
          filename: "myPDF.pdf",
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait'
          }
        };
        html2pdf().set(opt).from(element).save();
      }
      


    const isAuthenticated = useSelector( (state) => state.auth.isAuthenticated)
    if(!isAuthenticated){
        return <Navigate to='/login' replace={true}/>
    }
    const localCvData = location.state.cvData
    const layoutStyle = location.state.layoutStyle
    return <div>
        <div id='content'>
             <Preview cvData={localCvData} layoutStyle={layoutStyle}/> 
        </div>
        <button type="button" onClick={downloadPDF} className={classes.saveButton} >Download PDF</button>
    </div>
}