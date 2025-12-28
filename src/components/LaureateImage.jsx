import React, { useState, useEffect } from 'react';
import './LaureateImage.css';

const LaureateImage = ({ firstName, surname }) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const fetchImage = async () => {
            setLoading(true);
            setImageUrl(null);

            const fullName = `${firstName} ${surname}`;
            // Basic cleanup for search: remove extra spaces, standard encoding
            const searchName = encodeURIComponent(fullName.trim());

            try {
                const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${searchName}`);
                if (response.ok) {
                    const data = await response.json();
                    if (isMounted && data.thumbnail && data.thumbnail.source) {
                        setImageUrl(data.thumbnail.source);
                    }
                }
            } catch (error) {
                console.warn("Could not fetch image for", fullName, error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        if (firstName || surname) {
            fetchImage();
        }

        return () => { isMounted = false; };
    }, [firstName, surname]);

    return (
        <div className="laureate-image-container">
            {loading ? (
                <div className="placeholder loading"></div>
            ) : imageUrl ? (
                <img src={imageUrl} alt={`${firstName} ${surname}`} className="laureate-photo" />
            ) : (
                <div className="placeholder no-image">
                    <span>?</span>
                </div>
            )}
        </div>
    );
};

export default LaureateImage;
