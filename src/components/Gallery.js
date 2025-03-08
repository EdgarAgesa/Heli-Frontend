import React, { useState, useEffect } from "react";
import "../css/gallery.css";
import { FaPlane, FaCamera, FaUmbrellaBeach, FaGlassCheers, FaBinoculars } from "react-icons/fa"; // Import icons for services

const fleetSlides = [
  {
    description: "Luxury and comfort for executive travel.",
    image: "https://res.cloudinary.com/djflnbgur/image/upload/v1741262271/WhatsApp_Image_2025-02-25_at_21.21.23_mei0s3.jpg"
  },
  {
    description: "Perfect for scenic tours and aerial photography.",
    image: "https://res.cloudinary.com/djflnbgur/image/upload/v1741262271/WhatsApp_Image_2025-03-05_at_17.07.22_wnozau.jpg"
  },
  {
    description: "Reliable air ambulance services for emergencies.",
    image: "https://res.cloudinary.com/djflnbgur/image/upload/v1741262276/WhatsApp_Image_2025-03-05_at_17.07.25_1_ab4hij.jpg"
  },
];

const Gallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % fleetSlides.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="gallery-container">
      <h1 className="title">Welcome to Dejair</h1>
      <p className="description">
        Experience the ultimate luxury and convenience with Dejair Helicopter Rentals.
        Whether you're looking for executive travel, scenic tours, air ambulance services, or aerial photography, we have the perfect helicopter for you.
      </p>

      {/* Image Grid Section */}
      <div className="image-grid">
        <img src="https://res.cloudinary.com/djflnbgur/image/upload/v1741262276/WhatsApp_Image_2025-03-05_at_17.07.25_1_ab4hij.jpg" alt="Helicopter 1" className="grid-image" />
        <img src="https://res.cloudinary.com/djflnbgur/image/upload/v1741262274/WhatsApp_Image_2025-03-05_at_17.07.42_y5kcqg.jpg" alt="Helicopter 2" className="grid-image" />
        <img src="https://res.cloudinary.com/djflnbgur/image/upload/v1741262276/WhatsApp_Image_2025-03-05_at_17.07.24_qgotv8.jpg" alt="Helicopter 3" className="grid-image" />
      </div>

      {/* Our Fleet Section with Slider */}
      <section className="fleet-slider">
        <h2 className="section-title">Our Fleet</h2>
        <div className="slider-content">
          <div className="slider-text">
            <h3>{fleetSlides[currentSlide].title}</h3>
            <p>{fleetSlides[currentSlide].description}</p>
          </div>
          <div className="slider-image">
            <img src={fleetSlides[currentSlide].image} alt={fleetSlides[currentSlide].title} />
          </div>
        </div>
      </section>

      {/* Why Choose Dejair? */}
      <h2 className="section-title">Why Choose Dejair?</h2>
      <div className="benefits-grid">
        <div className="benefit">
          <div className="benefit-icon">✈️</div>
          <h3>Luxury & Comfort</h3>
          <p>Fly in state-of-the-art helicopters with premium interiors.</p>
        </div>
        <div className="benefit">
          <div className="benefit-icon">👨‍✈️</div>
          <h3>Experienced Pilots</h3>
          <p>Our pilots are highly trained and certified for safe and smooth flights.</p>
        </div>
        <div className="benefit">
          <div className="benefit-icon">📅</div>
          <h3>Flexible Booking</h3>
          <p>Customize your flight experience according to your schedule.</p>
        </div>
        <div className="benefit">
          <div className="benefit-icon">🛡️</div>
          <h3>Unmatched Safety</h3>
          <p>Regular maintenance and strict safety protocols ensure a worry-free journey.</p>
        </div>
      </div>

      {/* Our Services */}
      <h2 className="section-title">Our Services</h2>
      <div className="services-grid">
        <div className="service">
          <div className="service-icon">
            <FaPlane />
          </div>
          <h3>Executive & VIP Charters</h3>
        </div>
        <div className="service">
          <div className="service-icon">
            <FaUmbrellaBeach />
          </div>
          <h3>Scenic Tours</h3>
        </div>
        <div className="service">
          <div className="service-icon">
            <FaCamera />
          </div>
          <h3>Aerial Photography & Filming</h3>
        </div>
        <div className="service">
          <div className="service-icon">
            <FaGlassCheers />
          </div>
          <h3>Event & Wedding Transport</h3>
        </div>
        <div className="service">
          <div className="service-icon">
            <FaBinoculars />
          </div>
          <h3>Helicopter Safari</h3>
        </div>
      </div>
    </div>
  );
};

export default Gallery;