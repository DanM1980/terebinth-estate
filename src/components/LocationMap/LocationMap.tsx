import React, { useState, useEffect, useRef } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import './LocationMap.css';

// Types
interface NearbySite {
  name: string;
  distance: string;
  description: string;
  icon: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  phone: string;
  website: string;
  image: string;
  images: string[];
}

interface MapComponentProps {
  center: { lat: number; lng: number };
  zoom: number;
  nearbySites: NearbySite[];
  isVisible: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  currentZoom: number;
  onZoomChange: (zoom: number) => void;
  selectedSiteIndex: number | null;
}

// Google Maps Component
const MapComponent: React.FC<MapComponentProps> = ({
  center,
  zoom,
  nearbySites,
  isVisible,
  onZoomIn,
  onZoomOut,
  currentZoom,
  onZoomChange,
  selectedSiteIndex
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.marker.AdvancedMarkerElement[]>([]);
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);

  const handleZoomIn = () => {
    if (map) {
      const currentZoom = map.getZoom();
      if (currentZoom !== undefined) {
        const newZoom = Math.min(currentZoom + 1, 20);
        map.setZoom(newZoom);
      }
    }
    onZoomIn();
  };

  const handleZoomOut = () => {
    if (map) {
      const currentZoom = map.getZoom();
      if (currentZoom !== undefined) {
        const newZoom = Math.max(currentZoom - 1, 1);
        map.setZoom(newZoom);
      }
    }
    onZoomOut();
  };

  useEffect(() => {
    if (map && window.google && window.google.maps) {
      try {
        // Clear existing markers
        markersRef.current.forEach(marker => {
          if (marker && marker.map) {
            marker.map = null;
          }
        });

        // Create InfoWindow if it doesn't exist
        if (!infoWindow) {
          const newInfoWindow = new window.google.maps.InfoWindow();
          setInfoWindow(newInfoWindow);
        }

        // Create Terebinth Estate marker (always visible)
        const estateMarkerElement = document.createElement('div');
        estateMarkerElement.innerHTML = `
          <div style="
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: default;
          ">
             <div style="
               width: 50px;
               height: 50px;
               background: rgba(255, 255, 255, 0.95);
               border: 3px solid rgba(30, 58, 138, 0.8);
               border-radius: 50%;
               display: flex;
               align-items: center;
               justify-content: center;
               box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
               backdrop-filter: blur(3px);
               overflow: hidden;
               margin-bottom: 5px;
             ">
               <img 
                 src="/logo.png" 
                 alt="Terebinth Estate Logo" 
                 style="
                   width: 45px;
                   height: 45px;
                   object-fit: contain;
                 "
               />
             </div>
            <div style="
              background: rgba(30, 58, 138, 0.9);
              color: white;
              padding: 4px 8px;
              border-radius: 12px;
              font-size: 11px;
              font-weight: 600;
              font-family: 'Inter', sans-serif;
              white-space: nowrap;
              box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
              backdrop-filter: blur(3px);
             ">
               Terebinth Estate
             </div>
          </div>
        `;

        const estateMarker = new window.google.maps.marker.AdvancedMarkerElement({
          position: center,
          map: map,
          title: 'Terebinth Estate',
          content: estateMarkerElement
        });

        // Add click listener for Terebinth Estate marker
        estateMarker.addListener('click', () => {
          if (infoWindow) {
            const content = `
               <div style="
                 font-family: 'Inter', sans-serif;
                 max-width: 300px;
                 padding: 0;
               ">
                <div style="
                  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
                  color: white;
                  padding: 1rem;
                  border-radius: 12px 12px 0 0;
                  text-align: center;
                ">
                   <div style="margin-bottom: 0.5rem;">
                     <img 
                       src="/logo.png" 
                       alt="Terebinth Estate Logo" 
                       style="
                         width: 40px;
                         height: 40px;
                         object-fit: contain;
                         background: rgba(255,255,255,0.2);
                         border-radius: 50%;
                         padding: 5px;
                       "
                     />
                   </div>
                   <h3 style="margin: 0; font-size: 1.1rem; font-weight: 600;">Terebinth Estate</h3>
                   <div style="
                     background: rgba(255,255,255,0.2);
                     color: white;
                     padding: 0.25rem 0.75rem;
                     border-radius: 15px;
                     font-size: 0.8rem;
                     font-weight: 500;
                     display: inline-block;
                     margin-top: 0.5rem;
                   ">Your Spiritual Retreat</div>
                </div>
                
                <div style="padding: 1rem; background: white; border-radius: 0 0 12px 12px;">
                   <p style="
                     color: #666;
                     line-height: 1.5;
                     margin: 0 0 1rem 0;
                     font-size: 0.9rem;
                   ">Experience the beauty and spirituality of the Galilee region at our peaceful estate in Neot Golan.</p>
                </div>
              </div>
            `;

            infoWindow.setContent(content);
            infoWindow.open(map, estateMarker);
          }
        });

        // Create new markers
        const newMarkers: google.maps.marker.AdvancedMarkerElement[] = [];
        newMarkers.push(estateMarker);

        nearbySites.forEach((site, index) => {
          try {
            // Create marker element with icon
            const markerElement = document.createElement('div');
            markerElement.innerHTML = `
              <div style="
                width: 40px;
                height: 40px;
                background: rgba(220, 53, 69, 0.2);
                border: 2px solid rgba(220, 53, 69, 0.6);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
                color: white;
                cursor: pointer;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                backdrop-filter: blur(3px);
              ">
                ${site.icon}
              </div>
            `;

            const marker = new window.google.maps.marker.AdvancedMarkerElement({
              position: { lat: site.coordinates.latitude, lng: site.coordinates.longitude },
              map: map,
              title: site.name,
              content: markerElement
            });

            marker.addListener('click', () => {
              if (infoWindow) {
                const content = `
                   <div style="
                     font-family: 'Inter', sans-serif;
                     max-width: 300px;
                     padding: 0;
                   ">
                    <div style="
                      background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
                      color: white;
                      padding: 1rem;
                      border-radius: 12px 12px 0 0;
                      text-align: center;
                    ">
                       <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">${site.icon}</div>
                       <h3 style="margin: 0; font-size: 1.1rem; font-weight: 600;">${site.name}</h3>
                       <div style="
                         background: rgba(255,255,255,0.2);
                         color: white;
                         padding: 0.25rem 0.75rem;
                         border-radius: 15px;
                         font-size: 0.8rem;
                         font-weight: 500;
                         display: inline-block;
                         margin-top: 0.5rem;
                       ">${site.distance} drive</div>
                    </div>
                    
                    <div style="padding: 1rem; background: white; border-radius: 0 0 12px 12px;">
                       <p style="
                         color: #666;
                         line-height: 1.5;
                         margin: 0 0 1rem 0;
                         font-size: 0.9rem;
                       ">${site.description}</p>
                    </div>
                  </div>
                `;

                infoWindow.setContent(content);
                infoWindow.open(map, marker);
              }
            });

            newMarkers.push(marker);
          } catch (error) {
            console.error('Error creating marker for site:', site.name, error);
          }
        });

        markersRef.current = newMarkers;
        setMarkers(newMarkers);
      } catch (error) {
        console.error('Error updating map markers:', error);
      }
    }
  }, [map, nearbySites, infoWindow, center]);

  // Handle site selection - open InfoWindow for selected site
  useEffect(() => {
    if (map && markersRef.current.length > 0 && selectedSiteIndex !== null && infoWindow) {
      // selectedSiteIndex 0 is Terebinth Estate, 1+ are nearby sites
      if (selectedSiteIndex === 0) {
        // Open Terebinth Estate marker
        const estateMarker = markersRef.current[0];
        if (estateMarker) {
          const content = `
             <div style="
               font-family: 'Inter', sans-serif;
               max-width: 300px;
               padding: 0;
             ">
              <div style="
                background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
                color: white;
                padding: 1rem;
                border-radius: 12px 12px 0 0;
                text-align: center;
              ">
                 <div style="margin-bottom: 0.5rem;">
                   <img 
                     src="/logo.png" 
                     alt="Terebinth Estate Logo" 
                     style="
                       width: 40px;
                       height: 40px;
                       object-fit: contain;
                       background: rgba(255,255,255,0.2);
                       border-radius: 50%;
                       padding: 5px;
                     "
                   />
                 </div>
                 <h3 style="margin: 0; font-size: 1.1rem; font-weight: 600;">Terebinth Estate</h3>
                 <div style="
                   background: rgba(255,255,255,0.2);
                   color: white;
                   padding: 0.25rem 0.75rem;
                   border-radius: 15px;
                   font-size: 0.8rem;
                   font-weight: 500;
                   display: inline-block;
                   margin-top: 0.5rem;
                 ">Your Spiritual Retreat</div>
              </div>
              
              <div style="padding: 1rem; background: white; border-radius: 0 0 12px 12px;">
                 <p style="
                   color: #666;
                   line-height: 1.5;
                   margin: 0 0 1rem 0;
                   font-size: 0.9rem;
                 ">Experience the beauty and spirituality of the Galilee region at our peaceful estate in Neot Golan.</p>
              </div>
            </div>
          `;
          infoWindow.setContent(content);
          infoWindow.open(map, estateMarker);
        }
      } else if (selectedSiteIndex > 0 && selectedSiteIndex <= nearbySites.length) {
        // Open nearby site marker
        const siteIndex = selectedSiteIndex - 1; // Convert to 0-based index
        const site = nearbySites[siteIndex];
        const marker = markersRef.current[selectedSiteIndex]; // markers[0] is estate, markers[1+] are sites

        if (marker && site) {
          const content = `
             <div style="
               font-family: 'Inter', sans-serif;
               max-width: 300px;
               padding: 0;
             ">
              <div style="
                background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
                color: white;
                padding: 1rem;
                border-radius: 12px 12px 0 0;
                text-align: center;
              ">
                 <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">${site.icon}</div>
                 <h3 style="margin: 0; font-size: 1.1rem; font-weight: 600;">${site.name}</h3>
                 <div style="
                   background: rgba(255,255,255,0.2);
                   color: white;
                   padding: 0.25rem 0.75rem;
                   border-radius: 15px;
                   font-size: 0.8rem;
                   font-weight: 500;
                   display: inline-block;
                   margin-top: 0.5rem;
                 ">${site.distance} drive</div>
              </div>
              
              <div style="padding: 1rem; background: white; border-radius: 0 0 12px 12px;">
                 <p style="
                   color: #666;
                   line-height: 1.5;
                   margin: 0 0 1rem 0;
                   font-size: 0.9rem;
                 ">${site.description}</p>
              </div>
            </div>
          `;
          infoWindow.setContent(content);
          infoWindow.open(map, marker);
        }
      }
    }
  }, [selectedSiteIndex, map, markers, nearbySites, infoWindow]);

  return (
    <>
      <div
        ref={(node) => {
          if (node && !map && window.google && window.google.maps) {
            try {
              const newMap = new window.google.maps.Map(node, {
                center,
                zoom,
                mapId: 'DEMO_MAP_ID' // Required for AdvancedMarkerElement
              });

              // Add click listener to close InfoWindow when clicking on map
              newMap.addListener('click', () => {
                if (infoWindow) {
                  infoWindow.close();
                }
              });

              // Add zoom change listener
              newMap.addListener('zoom_changed', () => {
                const newZoom = newMap.getZoom();
                if (newZoom !== undefined) {
                  onZoomChange(newZoom);
                }
              });

              setMap(newMap);
            } catch (error) {
              console.error('Error creating map:', error);
            }
          }
        }}
        style={{ width: '100%', height: '100%' }}
      />
      <ZoomControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
      />
    </>
  );
};

// Zoom Controls Component
const ZoomControls: React.FC<{
  onZoomIn: () => void;
  onZoomOut: () => void;
}> = ({ onZoomIn, onZoomOut }) => {
  return (
    <div style={{
      position: 'absolute',
      bottom: '20px',
      left: '20px',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }}>
      <button
        onClick={onZoomIn}
        style={{
          width: '40px',
          height: '40px',
          background: 'rgba(255, 255, 255, 0.95)',
          border: '2px solid rgba(30, 58, 138, 0.3)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#1e3a8a',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.2s ease',
          backdropFilter: 'blur(5px)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(30, 58, 138, 0.1)';
          e.currentTarget.style.borderColor = 'rgba(30, 58, 138, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
          e.currentTarget.style.borderColor = 'rgba(30, 58, 138, 0.3)';
        }}
      >
        +
      </button>
      <button
        onClick={onZoomOut}
        style={{
          width: '40px',
          height: '40px',
          background: 'rgba(255, 255, 255, 0.95)',
          border: '2px solid rgba(30, 58, 138, 0.3)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#1e3a8a',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.2s ease',
          backdropFilter: 'blur(5px)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(30, 58, 138, 0.1)';
          e.currentTarget.style.borderColor = 'rgba(30, 58, 138, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
          e.currentTarget.style.borderColor = 'rgba(30, 58, 138, 0.3)';
        }}
      >
        −
      </button>
    </div>
  );
};

const LocationMap: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [nearbySites, setNearbySites] = useState<NearbySite[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentZoom, setCurrentZoom] = useState(11);
  const [selectedSiteIndex, setSelectedSiteIndex] = useState<number | null>(null);

  const handleZoomIn = () => {
    setCurrentZoom(prev => Math.min(prev + 1, 20));
  };

  const handleZoomOut = () => {
    setCurrentZoom(prev => Math.max(prev - 1, 1));
  };

  const handleZoomChange = (newZoom: number) => {
    setCurrentZoom(newZoom);
  };

  const handleSiteClick = (index: number) => {
    // index 0 = Terebinth Estate, index 1+ = nearby sites
    setSelectedSiteIndex(index + 1); // +1 because 0 is reserved for Terebinth Estate
  };

  // Load nearby sites data from JSON file
  useEffect(() => {
    const loadNearbySites = async () => {
      try {
        const response = await fetch('/data/nearby-sites.json');
        const data = await response.json();
        setNearbySites(data.nearbySites);
      } catch (error) {
        console.error('Error loading nearby sites:', error);
        // Fallback data in case JSON fails to load
        setNearbySites([
          {
            name: 'Sea of Galilee',
            distance: '15 minutes',
            description: 'Where Jesus walked on water and performed many miracles',
            icon: '🌊',
            coordinates: { latitude: 32.7940, longitude: 35.5900 },
            phone: '+972-4-672-0000',
            website: 'https://www.galilee.gov.il',
            image: '/images/nearby-sites/sea-of-galilee.jpg',
            images: [
              'https://images.unsplash.com/photo-1544966503-7cc4ac81b4c4?w=800&h=600&fit=crop&q=80',
              'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80',
              'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&h=600&fit=crop&q=80',
              'https://images.unsplash.com/photo-1544966503-7cc4ac81b4c4?w=800&h=600&fit=crop&q=80',
              'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80',
              'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&h=600&fit=crop&q=80',
              'https://images.unsplash.com/photo-1544966503-7cc4ac81b4c4?w=800&h=600&fit=crop&q=80',
              'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80'
            ]
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadNearbySites();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.querySelector('.location-map');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const handleDirectionsClick = () => {
    // Coordinates for Terebinth Estate in Neot Golan
    const coordinates = '32.7940,35.6900'; // Neot Golan, Golan Heights
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${coordinates}`, '_blank');
  };


  return (
    <section className="location-map section">
      <div className="container">
        <div className="section-header">
          <h2 className={`section-title ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
            Our Location
          </h2>
          <p className={`section-subtitle ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
            Located in Neot Golan, only 15 minutes from the Sea of Galilee
          </p>
        </div>

        <div className="location-content">
          <div className="map-container">
            <div className={`map-wrapper ${isVisible ? 'fade-in visible' : 'fade-in'}`} style={{ position: 'relative' }}>
              <Wrapper
                apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'AIzaSyCwmNz5zxUwPlT7S1TfX4xXyrpo226X2BE'}
                render={(status: Status) => {
                  switch (status) {
                    case Status.LOADING:
                      return (
                        <div style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%',
                          background: '#f8f9fa',
                          borderRadius: '1rem'
                        }}>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{
                              width: '40px',
                              height: '40px',
                              border: '4px solid #e9ecef',
                              borderTop: '4px solid #007bff',
                              borderRadius: '50%',
                              animation: 'spin 1s linear infinite',
                              margin: '0 auto 1rem'
                            }}></div>
                            <p style={{ color: '#666', fontSize: '1.1rem' }}>Loading map...</p>
                          </div>
                        </div>
                      );
                    case Status.FAILURE:
                      return (
                        <div style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%',
                          background: '#f8f9fa',
                          borderRadius: '1rem'
                        }}>
                          <div style={{ textAlign: 'center' }}>
                            <p style={{ color: '#e74c3c', fontSize: '1.1rem', marginBottom: '1rem' }}>
                              Error loading map
                            </p>
                            <p style={{ color: '#666', fontSize: '0.9rem' }}>
                              Please check your internet connection or try again later
                            </p>
                          </div>
                        </div>
                      );
                    case Status.SUCCESS:
                      return (
                        <>
                          <MapComponent
                            center={{ lat: 32.7940, lng: 35.6900 }}
                            zoom={currentZoom}
                            nearbySites={nearbySites}
                            isVisible={isVisible}
                            onZoomIn={handleZoomIn}
                            onZoomOut={handleZoomOut}
                            currentZoom={currentZoom}
                            onZoomChange={handleZoomChange}
                            selectedSiteIndex={selectedSiteIndex}
                          />
                        </>
                      );
                    default:
                      return (
                        <div style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%',
                          background: '#f8f9fa',
                          borderRadius: '1rem'
                        }}>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{
                              width: '40px',
                              height: '40px',
                              border: '4px solid #e9ecef',
                              borderTop: '4px solid #007bff',
                              borderRadius: '50%',
                              animation: 'spin 1s linear infinite',
                              margin: '0 auto 1rem'
                            }}></div>
                            <p style={{ color: '#666', fontSize: '1.1rem' }}>Loading map...</p>
                          </div>
                        </div>
                      );
                  }
                }}
                libraries={['places', 'marker']}
              />
            </div>

            <div className={`location-info ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
              <h3>Perfectly Positioned in Neot Golan</h3>
              <p>
                Located in the beautiful Neot Golan settlement in the Golan Heights,
                Terebinth Estate offers easy access to all the most important biblical sites.
                Our central location means you can visit multiple holy sites in a single day
                while returning to the comfort and tranquility of our luxury suites.
              </p>
              <div className="location-stats">
                <div className="stat-item">
                  <span className="stat-number">15</span>
                  <span className="stat-label">Minutes to Sea of Galilee</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">6</span>
                  <span className="stat-label">Major Biblical Sites Nearby</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">4</span>
                  <span className="stat-label">Luxury Suites Available</span>
                </div>
              </div>
              <button
                className="btn btn-primary"
                onClick={handleDirectionsClick}
              >
                Get Directions
              </button>
            </div>
          </div>

          <div className="nearby-sites">
            <h3 className={`sites-title ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
              Nearby Biblical Sites
            </h3>
            {loading ? (
              <div className="loading-message">Loading nearby sites...</div>
            ) : (
              <div className="sites-grid">
                {nearbySites.map((site, index) => (
                  <div
                    key={index}
                    className={`site-card ${isVisible ? 'fade-in visible' : 'fade-in'}`}
                    style={{ animationDelay: `${index * 0.1}s`, cursor: 'pointer' }}
                    onClick={() => handleSiteClick(index)}
                  >
                    <div className="site-icon">
                      <span>{site.icon}</span>
                    </div>
                    <div className="site-content">
                      <h4>{site.name}</h4>
                      <p className="site-distance">{site.distance} drive</p>
                      <p className="site-description">{site.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default LocationMap;
