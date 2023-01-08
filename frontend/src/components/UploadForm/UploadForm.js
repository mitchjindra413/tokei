import { useState } from "react"
import { useSelector } from "react-redux"
import './UploadForm.css'
import { BsHash } from "react-icons/bs"
import { DragDropFile } from "./DragDropFile"

export const UploadForm = () => {
    const userId = useSelector(state => state.session.user._id)

    const [caption, setCaption] = useState('')

    return (
        <div className="upload-form-container">
            <div className="upload-form">
                <div className="upload-form-heading">
                    <h2>Upload video</h2>
                    <h3>Post a video to your account</h3>
                </div>
                <div className="form-body">
                    <div className="video-upload-container">
                        <DragDropFile/>
                    </div>
                    <div className="form-right-inputs">
                        <div className="cation-container">
                            <div className="label-div">
                                <label>Caption</label>
                                <p>{caption.length}/150</p>
                            </div>
                            <div className="caption-input-container">
                                <input type='text'
                                    value={caption}
                                    onChange={e => setCaption(e.target.value)}
                                    maxLength="150"
                                ></input>
                                <button type="button" onClick={() => setCaption(caption + '#')}>
                                    <BsHash size={20}/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}