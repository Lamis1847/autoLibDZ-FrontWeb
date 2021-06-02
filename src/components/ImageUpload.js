
import React,  {useState} from 'react';
import axios from 'axios'
import { Container } from "reactstrap";

export const ImageUpload = () => {

    const [imageSelected, setImageSelected] = useState("")

    const uploadImage = (files) => {
        const formData = new FormData()
        formData.append("file", imageSelected)
        formData.append("upload_preset","autolibDz") //upload preset name

        axios.post("https://api.cloudinary.com/v1_1/melb/image/upload", formData)
        .then((response)=> {
            console.log(response)
            console.log(response.data.secure_url)
        })
    }
    
    return (
        <React.Fragment>
         <div className="main-content">
        <div>
            <input
            type="file"
            onChange={(event) => {
                setImageSelected(event.target.files[0]);
                console.log(event.target.files[0])
            }}>
            </input>
            <button onClick={uploadImage}>Upload image
            </button>
        </div>
        </div>
        </React.Fragment>
    )
}

export default ImageUpload