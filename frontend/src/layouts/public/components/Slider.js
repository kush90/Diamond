import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Tooltip } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

import img9 from "../../../assets/img9.jpg"
import img10 from "../../../assets/img10.jpg"
import img13 from "../../../assets/img10.jpg"
import img14 from "../../../assets/img14.jpg"
import img15 from "../../../assets/img15.jpg"
import img16 from "../../../assets/img16.jpg"
import img17 from "../../../assets/img17.jpg"
import img18 from "../../../assets/img18.jpg"
import img19 from "../../../assets/img19.jpg"
import img20 from "../../../assets/img20.jpg"



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
            }, 2000); // Change the interval time as needed (5 seconds in this example)
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [autoplay]);

    const toggleAutoplay = () => {
        setAutoplay((prevAutoplay) => !prevAutoplay);
    };


    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                <img className='image-slider' src={images[activeIndex]} alt={`Slide ${activeIndex + 1}`} 

                />
                <Typography
                    variant="caption"
                    component="div"
                    sx={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        color: 'white',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        padding: '2px 6px',
                        borderRadius: 4,
                    }}
                >
                    {`${activeIndex + 1} / ${images.length}`}
                </Typography>
                {!autoplay && (
                    <>
                        <Tooltip title="Previous">
                            <Button onClick={handlePrev} variant="contained" color="primary" disabled={activeIndex === 0}
                                sx={{
                                    position: 'absolute',
                                    left: 20,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    minWidth: 'auto',
                                    padding: 0,
                                    '&:disabled': {
                                        color: 'rgba(255, 255, 255, 0.3)', // Customize the text color for disabled state
                                        cursor: 'not-allowed', // Customize the cursor for disabled state
                                        // Add any additional styles for disabled state
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background color with opacity (50%)
                                    },
                                    // Add these styles for the active state (when not disabled)
                                    '&:not(:disabled)': {
                                        color: 'white', // Change text color to black
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Change background color to black with opacity
                                    },
                                }}
                            >

                                <NavigateBeforeIcon />
                            </Button>
                        </Tooltip>
                        <Tooltip title="Next">
                            <Button onClick={handleNext} variant="contained" color="primary" disabled={activeIndex === images.length - 1}
                                sx={{
                                    position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', minWidth: 'auto',
                                    padding: 0,
                                    '&:disabled': {
                                        color: 'rgba(255, 255, 255, 0.3)', // Customize the text color for disabled state
                                        cursor: 'not-allowed', // Customize the cursor for disabled state
                                        // Add any additional styles for disabled state
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background color with opacity (50%)

                                    },
                                    '&:not(:disabled)': {
                                        color: 'white', // Change text color to black
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Change background color to black with opacity
                                    },
                                }}>

                                <NavigateNextIcon />
                            </Button>
                        </Tooltip>
                    </>
                )}
                <Button onClick={toggleAutoplay} variant="contained" sx={{
                    color: 'white', // Text color
                    backgroundColor: 'rgba(0,0,0,0.5)', // Button color
                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.5)' }, position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', fontSize: '.650rem', padding: '6px 12px'
                }}>
                    {autoplay ? 'Pause' : 'Auto Play'}
                    {autoplay ? <PauseIcon /> : <PlayArrowIcon />}
                </Button>
            </Box>
        </Box>
    );
};

export default ImageSlider;
