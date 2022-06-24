<<<<<<< HEAD
import GalleryItem from './GalleryItem'
import { useContext } from 'react'
import { DataContext } from '../DataContext'


function Gallery() {
    const data = useContext(DataContext)

    const display = data.map((item, index) => {
        return (
            <GalleryItem item={item} key={index} />
=======
import GalleryItem from "./GalleryItem"

function Gallery(props) {
    const data = props.data.result.read()

    const display = data.map((item, index) => {
        return(
            <GalleryItem item={item} key={index}/>
>>>>>>> with_suspense
        )
    })

    return (
        <div>
            {display}
        </div>
    )
}

export default Gallery