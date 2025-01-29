import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Tooltip } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

import img9 from "../../../assets/img9.jpg";
import img10 from "../../../assets/img10.jpg";
import img13 from "../../../assets/img10.jpg";
import img14 from "../../../assets/img14.jpg";
import img15 from "../../../assets/img15.jpg";
import img16 from "../../../assets/img16.jpg";
import img17 from "../../../assets/img17.jpg";
import img18 from "../../../assets/img18.jpg";
import img19 from "../../../assets/img19.jpg";
import img20 from "../../../assets/img20.jpg";

const images = [
    img9,
    img10,
    img13,
    img14,
    img15,
    img16,
    img17,
    img18,
    img19,
    img20
];

const ImageSlider = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [autoplay, setAutoplay] = useState(true);

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    useEffect(() => {
        let intervalId;
        if (autoplay) {
            intervalId = setInterval(() => {
                setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
            }, 3000); // Change the interval time as needed (3 seconds in this example)
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [autoplay]);

    const toggleAutoplay = () => {
        setAutoplay((prevAutoplay) => !prevAutoplay);
    };

    return (
        <Box sx={{ position: 'relative', overflow: 'hidden', boxShadow: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative', height: '500px' }}>
                <img
                    className='image-slider'
                    src={images[activeIndex]}
                    alt={`Slide ${activeIndex + 1}`}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'opacity 0.5s ease-in-out',
                        opacity: 1,
                    }}
                />
                <Typography
                    variant="caption"
                    component="div"
                    sx={{
                        position: 'absolute',
                        top: 16,
                        left: 16,
                        color: 'white',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.875rem',
                    }}
                >
                    {`${activeIndex + 1} / ${images.length}`}
                </Typography>

                {/* Conditionally render Prev and Next buttons based on autoplay state and activeIndex */}
                {!autoplay && (
                    <>
                        {/* Hide Prev button when activeIndex is 0 */}
                        {activeIndex !== 0 && (
                            <Tooltip title="Previous">
                                <Button
                                    onClick={handlePrev}
                                    variant="contained"
                                    sx={{
                                        position: 'absolute',
                                        left: 16,
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        minWidth: 'auto',
                                        padding: '8px',
                                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 0, 0, 0.9)',
                                        },
                                    }}
                                >
                                    <NavigateBeforeIcon />
                                </Button>
                            </Tooltip>
                        )}

                        {/* Hide Next button when activeIndex is the last image */}
                        {activeIndex !== images.length - 1 && (
                            <Tooltip title="Next">
                                <Button
                                    onClick={handleNext}
                                    variant="contained"
                                    sx={{
                                        position: 'absolute',
                                        right: 16,
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        minWidth: 'auto',
                                        padding: '8px',
                                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 0, 0, 0.9)',
                                        },
                                    }}
                                >
                                    <NavigateNextIcon />
                                </Button>
                            </Tooltip>
                        )}
                    </>
                )}

                <Button
                    onClick={toggleAutoplay}
                    variant="contained"
                    sx={{
                        position: 'absolute',
                        bottom: 16,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        },
                        fontSize: '0.875rem',
                        padding: '8px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}
                >
                    {autoplay ? 'Pause' : 'Play'}
                    {autoplay ? <PauseIcon /> : <PlayArrowIcon />}
                </Button>
            </Box>
        </Box>
    );
};

export default ImageSlider;