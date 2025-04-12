import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { designSystem } from '../styles/design-system';
import type { Feature, Polygon, Position } from 'geojson';

interface Territory {
  id: string;
  name: string;
  coordinates: Position[][];
  properties: {
    density: number;
    performance: number;
    owner: string;
  };
}

interface TerritoryVisualizationProps {
  territories: Territory[];
  onTerritoryClick?: (territory: Territory) => void;
}

const MapContainer = styled.div`
  width: 100%;
  height: 500px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
`;

const Controls = styled.div`
  position: absolute;
  top: ${designSystem.layout.spacing.md};
  right: ${designSystem.layout.spacing.md};
  background: ${designSystem.colors.neutral.snow};
  padding: ${designSystem.layout.spacing.md};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const ControlButton = styled.button`
  background: ${designSystem.colors.primary.empireBlue};
  color: ${designSystem.colors.neutral.snow};
  border: none;
  padding: ${designSystem.layout.spacing.sm} ${designSystem.layout.spacing.md};
  border-radius: 4px;
  cursor: pointer;
  font-size: ${designSystem.typography.fontSize.small.mobile};
  margin-left: ${designSystem.layout.spacing.sm};
  
  &:hover {
    background: ${designSystem.colors.primary.territoryTeal};
  }
`;

const TerritoryTooltip = styled.div`
  background: ${designSystem.colors.neutral.snow};
  padding: ${designSystem.layout.spacing.sm};
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: absolute;
  z-index: 1;
  pointer-events: none;
  transform: translate(-50%, -100%);
  margin-top: -10px;
`;

export const TerritoryVisualization: React.FC<TerritoryVisualizationProps> = ({
  territories,
  onTerritoryClick,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [activeTerritory, setActiveTerritory] = useState<Territory | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || '';

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-98.5795, 39.8283], // Center of US
      zoom: 4,
    });

    map.current.on('load', () => {
      if (!map.current) return;

      // Add territory data source
      const geoJsonData: Feature<Polygon>[] = territories.map(territory => ({
        type: 'Feature',
        properties: territory.properties,
        geometry: {
          type: 'Polygon',
          coordinates: territory.coordinates
        }
      }));

      map.current.addSource('territories', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: geoJsonData,
        },
      });

      // Add territory layer
      map.current.addLayer({
        id: 'territories',
        type: 'fill',
        source: 'territories',
        paint: {
          'fill-color': [
            'interpolate',
            ['linear'],
            ['get', 'density'],
            0, designSystem.colors.neutral.mist,
            1, designSystem.colors.primary.empireBlue,
          ],
          'fill-opacity': 0.7,
          'fill-outline-color': designSystem.colors.neutral.charcoal,
        },
      });

      // Add hover effect
      map.current.on('mousemove', 'territories', (e: mapboxgl.MapMouseEvent & { features?: mapboxgl.MapboxGeoJSONFeature[] }) => {
        if (!e.features?.[0] || !e.features[0].geometry) return;
        
        const geometry = e.features[0].geometry;
        if (geometry.type !== 'Polygon') return;
        
        const coordinates = geometry.coordinates[0][0] as [number, number];
        const territory = territories.find(t => 
          t.coordinates[0][0][0] === coordinates[0] &&
          t.coordinates[0][0][1] === coordinates[1]
        );
        
        if (territory) {
          setActiveTerritory(territory);
          setTooltipPosition([e.lngLat.lng, e.lngLat.lat]);
        }
      });

      map.current.on('mouseleave', 'territories', () => {
        setActiveTerritory(null);
        setTooltipPosition(null);
      });

      // Add click handler
      map.current.on('click', 'territories', (e: mapboxgl.MapMouseEvent & { features?: mapboxgl.MapboxGeoJSONFeature[] }) => {
        if (!e.features?.[0] || !e.features[0].geometry || !onTerritoryClick) return;
        
        const geometry = e.features[0].geometry;
        if (geometry.type !== 'Polygon') return;
        
        const coordinates = geometry.coordinates[0][0] as [number, number];
        const territory = territories.find(t => 
          t.coordinates[0][0][0] === coordinates[0] &&
          t.coordinates[0][0][1] === coordinates[1]
        );
        
        if (territory) {
          onTerritoryClick(territory);
        }
      });
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [territories, onTerritoryClick]);

  const handleZoomToTerritory = (territory: Territory) => {
    if (!map.current) return;

    const coordinates = territory.coordinates[0];
    const bounds = coordinates.reduce((bounds, coord) => {
      return bounds.extend(new mapboxgl.LngLat(coord[0], coord[1]));
    }, new mapboxgl.LngLatBounds(
      new mapboxgl.LngLat(coordinates[0][0], coordinates[0][1]),
      new mapboxgl.LngLat(coordinates[0][0], coordinates[0][1])
    ));

    map.current.fitBounds(bounds, {
      padding: 50,
      duration: 1000,
    });
  };

  return (
    <MapContainer ref={mapContainer}>
      <Controls>
        {activeTerritory && (
          <ControlButton onClick={() => handleZoomToTerritory(activeTerritory)}>
            Zoom to Territory
          </ControlButton>
        )}
      </Controls>
      
      {activeTerritory && tooltipPosition && (
        <TerritoryTooltip style={{
          left: `${tooltipPosition[0]}px`,
          top: `${tooltipPosition[1]}px`,
        }}>
          <h4>{activeTerritory.name}</h4>
          <p>Density: {activeTerritory.properties.density}</p>
          <p>Performance: {activeTerritory.properties.performance}%</p>
          <p>Owner: {activeTerritory.properties.owner}</p>
        </TerritoryTooltip>
      )}
    </MapContainer>
  );
}; 