import { Preview } from "../../components/Preview/preview"
import { useState } from "react"
import classes from './CreateCv.module.css'
import { DUMMY_CV } from "../../utils/constants"
import { InputCard } from "../../UI/InputCard"

export const CreateCv = () => {
    const [cvData, setCvData] = useState([])
    const [sectionsCount, setSectionsCount] = useState({employmentDetails: 1,education: 1, socialProfiles: 1})
    const [basicDetailsOpen, setbasicDetailsOpen] = useState(false)
    const [employmentDetailsOpen, setemploymentDetailsOpen] = useState(false)
    const onToggeleBasicDetailsCard = () => {
        setbasicDetailsOpen(!basicDetailsOpen)
    }
    const onToggeleEmploymentDetailsCard = () => {
        setemploymentDetailsOpen(!employmentDetailsOpen)
    }
    return<>
        <div className={classes.div}>
        <div className={classes.inputsContainer}>
          <div >
            <h4>Basic Details</h4>
            <InputCard label='Basic Details' toggle={onToggeleBasicDetailsCard} isOpen={basicDetailsOpen}>
              {basicDetailsOpen && <div className={classes.inputsFeildsCard}>  
                <input/>
                <label>name</label>
              </div> } 
            </InputCard>
          </div>
          <div>
            <h4>Employement Details</h4>
            <InputCard label={`Employment Details-${sectionsCount.employmentDetails}`} toggle={onToggeleEmploymentDetailsCard} isOpen={employmentDetailsOpen}>
              {employmentDetailsOpen && <div className={classes.inputsFeildsCard}>  
                <input/>
                <label>name</label>
              </div> } 
            </InputCard>
          </div>
        </div>
        <div className={classes.previewContainer}>
        <h3>Cv Preview</h3>
        <Preview cvData={DUMMY_CV}/>
        </div>
    </div>
    </>
}