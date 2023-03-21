import { useState, useEffect } from "react"
import './UploadForm.css'
import { BsHash } from "react-icons/bs"
import { VscTriangleDown } from "react-icons/vsc"
import { DragDropFile } from "./DragDropFile"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { createPost } from "../../store/posts"
import { removeFile } from "../../store/session"

export const UploadForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const file = useSelector(state => state.session.file)
    // if(file) {
    //     dispatch(removeFile())
    // }
    const userId = useSelector(state => state.session.user._id)
    
    const [caption, setCaption] = useState('')
    const [comments, toggleComments] = useState(false)
    const [sound, setSound] = useState('')
    const [topic, setTopic] = useState()

    const [pub, togglePub] = useState(true)
    const [showMenu, setShowMenu] = useState(false)
    const [showTopics, setShowTopics] = useState(false)

    const menu = () => {
        if (showMenu) setShowMenu(false);
        setShowMenu(true);
    }

    const topicsMenu = () => {
        if (showTopics) setShowTopics(false);
        setShowTopics(true);
    }

    useEffect(() => {
        if (!showMenu && !showTopics) return

        const closeMenu = () => {
            setShowMenu(false)
            setShowTopics(false)
        }

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu)
    }, [showMenu, showTopics])

    // to lower for topic

    const handleSubmit = (e) => {
        e.preventDefault()
        let topic_form = topic
        if (topic_form) {
            topic_form = topic.toLowerCase()
        }
        const fields = {
            author: userId,
            caption,
            sound,
            topic: topic_form,
            pub,
            allowComments: comments,
            videoUrl: file.Location
        }
        dispatch(removeFile())
        dispatch(createPost(fields)).then(history.push('/'))
    }

    const handleDiscard = (e) => {
        e.preventDefault()
        dispatch(removeFile())
        history.push('/')
    }

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
                                <label htmlFor="caption-input">Caption</label>
                                <p>{caption.length}/150</p>
                            </div>
                            <div className="caption-input-container">
                                <input type='text'
                                    value={caption}
                                    onChange={e => {debugger; setCaption(e.target.value)}}
                                    maxLength="150"
                                    id="caption-input"
                                ></input>
                                <button type="button" onClick={() => setCaption(caption + '#')}>
                                    <BsHash size={20}/>
                                </button>
                            </div>
                        </div>
                        <div className="cation-container">
                            <div className="label-div">
                                <label htmlFor="sound-input">Sound title</label>
                            </div>
                            <div className="caption-input-container">
                                <input type='text'
                                    value={sound}
                                    onChange={(e) => setSound(e.target.value)}
                                    maxLength="150"
                                    id="sound-input"
                                ></input>
                            </div>
                        </div>
                        <div className="view-container">
                            <div className="label-div">
                                <label >Select video topic</label>
                            </div>
                            <div className="view-input-container" onClick={() => topicsMenu()}>
                                <p>{topic}</p>
                                <VscTriangleDown size={20} />
                            </div>
                            {showTopics && (
                                <div className="view-dropdown">
                                    <div onClick={() => setTopic('Comedy')}>
                                        <p style={topic === 'Comedy' ? { backgroundColor: '#F1F1F2' } : {}}>Comedy</p>
                                    </div>
                                    <div onClick={() => setTopic('Dance')}>
                                        <p style={topic === 'Dance' ? { backgroundColor: '#F1F1F2' } : {}}>Dance</p>
                                    </div>
                                    <div onClick={() => setTopic('Gaming')}>
                                        <p style={topic === 'Gaming' ? { backgroundColor: '#F1F1F2' } : {}}>Gaming</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="view-container">
                            <div className="label-div">
                                <label >Who can watch this video</label>
                            </div>
                            <div className="view-input-container" onClick={() => menu()}>
                                <p>{pub ? 'Public' : 'Private'}</p>
                                <VscTriangleDown size={20} />
                            </div>
                            {showMenu && (
                                <div className="view-dropdown">
                                    <div onClick={() => togglePub(false)}>
                                        <p style={!pub ? { backgroundColor: '#F1F1F2'} : {}}>Private</p>
                                    </div>
                                    <div onClick={() => togglePub(true)}>
                                        <p style={pub ? { backgroundColor: '#F1F1F2' } : {}}>Public</p>
                                    </div>
                                </div>
                            ) }
                        </div>
                        <div className="form-action-buttons">
                            <button className="discard-post" type="button" onClick={handleDiscard}>
                                Discard
                            </button>
                            <button className="submit-post" 
                                onClick={handleSubmit}
                                disabled={!caption || !userId || !file || !file.Location || !topic || !sound}
                                >
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}