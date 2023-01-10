import { useState, useRef } from "react";
import './DragDropFile.css'
import { uploadVideo } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";

export const DragDropFile = () => {
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([])
    const file = useSelector(state => state.session.file)

    // handle drag events
    const handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    // triggers when file is dropped
    const handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            // handleFiles(e.dataTransfer.files);
            dispatch(uploadVideo(e.dataTransfer.files[0]))
        }
    };

    // triggers when file is selected with click
    const handleChange = function (e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            // handleFiles(e.target.files);
            dispatch(uploadVideo(e.target.files[0]))
        }
    };

    // triggers the input when the button is clicked
    const onButtonClick = () => {
        inputRef.current.click();
    };

    const handleFile = (file) => {

    }

    if (file) {
        return (
            <div className="file-uploaded-container">
                <video className="uploaded-video" controls preload="auto">
                    <source src={file.Location} type="video/mp4"></source>
                    Your browser does not support the video tag.
                </video>
            </div>
        )
    }

    return (
        <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
            <input ref={inputRef} type="file" id="input-file-upload" multiple={false} onChange={handleChange} />
            <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : ""}>
                <div className="file-upload-text">
                    <i className="fa-solid fa-cloud-arrow-up fa-2x"></i>
                    <h2>Select video to upload</h2>
                    <p>Or drag and drop a file</p>
                    <div className="upload-criteria">
                        <p>MP4</p>
                        <p>Less than 5mb</p>
                    </div>
                    <button className="upload-button-form" onClick={onButtonClick}>Select file</button>
                </div>
            </label>
            {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
        </form>
    );
};