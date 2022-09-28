import {useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import axios from "axios";
import {faCloudArrowUp, faFileAlt, faCheck} from '@fortawesome/free-solid-svg-icons'
import './App.scss'

const App = () => {
    const [percentage, setPercentage] = useState(0)
    const [progress, setProgress] = useState(null)
    const [name, setName] = useState(null)
    const [size, setSize] = useState(null)

    const bytesToSize = (bytes) => {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
        if (bytes === 0) return 'n/a'
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
        if (i === 0) return `${bytes} ${sizes[i]}`
        return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
    }

    const handleInputClick = (e) => {
        e.preventDefault()
        console.log(e.target.files)
        if (e.target.files[0]) {
            const payload = new FormData()
            payload.append('file', e.target.files[0])

            const config = {
                onUploadProgress: (progress) => {
                    setProgress('upload')
                    setName(e.target.files[0].name)
                    setPercentage(Math.round((progress.loaded * 100) / progress.total))
                },
                withCredentials: true
            }

            axios.post('http://localhost:5000/api/v1/upload', payload, config)
                .then(res => {
                    setProgress('done')
                    setName(res.data.originalname)
                    setSize(res.data.size)
                })
        }
    }

    return (
        <>
            <div className='wrapper'>
                <header>Single File Uploader ReactJS</header>
                <form action="#">
                    <input type="file"
                           name='file'
                           id='file'
                           onChange={handleInputClick}
                           className="file-input"
                           style={{display: 'none'}}/>
                    <i><FontAwesomeIcon icon={faCloudArrowUp}/></i>
                    <label htmlFor='file'>
                        <p>Browser File to Upload</p>
                    </label>
                </form>
                {progress === 'upload' && (
                    <section className='progress-area'>
                        <li className='row'>
                            <i><FontAwesomeIcon icon={faFileAlt}/></i>
                            <div className="content">
                                <div className="details">
                                    <span className="name">{name} • Uploading...</span>
                                    <span className="percent">{percentage}%</span>
                                </div>
                                <div className="progress-bar">
                                    <div className="progress" style={{width: `${percentage}%`}}></div>
                                </div>
                            </div>
                        </li>
                    </section>
                )}
                {progress === 'done' && (
                    <section className='uploaded-area'>
                        <li className="row">
                            <div className="content upload">
                                <i><FontAwesomeIcon icon={faFileAlt}/></i>
                                <div className="details">
                                    <span className="name">{name} • Uploaded</span>
                                    <span className="size">{bytesToSize(size)}</span>
                                </div>
                            </div>
                            <i><FontAwesomeIcon icon={faCheck}/></i>
                        </li>
                    </section>
                )}
            </div>
        </>
    )
}

export default App