import { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import './styles.css';

export default function ImageSlider({ url, limit = 5, page = 1 }) {
    const [images, setImages] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);


    async function fetchImages(getUrl) {
        try {
            setLoading(true);

            const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
            const data = await response.json();

            if (data) {
                setImages(data)
                setLoading(false)
            }
        } catch (e) {
            setErrorMsg(e.message);
            setLoading(false)
        }
    }
    console.log(images)

    useEffect(() => {
        if (url !== '') fetchImages(url)
    }, [url]);

    if (loading) {
        return <div>loading data ! please wait</div>
    }
    if (errorMsg !== null) {
        return <div>Error occured ! {errorMsg}</div>
    }
    function handlePrev() {
        setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1)
    }
    function handleNext() {
        setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1)
    }
    return (
        <div className="container">
            <BsArrowLeftCircleFill onClick={handlePrev} className="arrow arrow-left" />
            {
                images && images.length ?
                    images.map((imagesItem, index) =>
                        <img
                            key={imagesItem.id}
                            alt={imagesItem.download_url}
                            src={imagesItem.download_url}
                            className={
                                currentSlide === index
                                    ? "current-image"
                                    : "current-image hide-current-image"
                            }
                        />
                    )
                    : null
            }
            <BsArrowRightCircleFill onClick={handleNext} className="arrow arrow-right" />
            <span className="cricle-indicators">{
                images && images.length ?
                    images.map((_, index) => <button key={index}
                        className={currentSlide === index ? "currentcurrent-indicator" 
                            : "current-indicator inactive-indicator"}
                    
                    onClick={()=> setCurrentSlide(index)}>

                    </button>
                    )
                    : null
            }
            </span>

        </div>
    );
}