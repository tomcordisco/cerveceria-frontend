"use client";
import TopBar from '../components/TopBar';
import HappyHour from '../components/HappyHour';
import Carousel from '../components/Carousel';
import { useEffect, useState } from 'react';
import BottomBar from '../components/BottomBar';
import styles from './page.module.css';
// URL de la API de cervecerías
const BREWERIES_API_URL = 'https://api.openbrewerydb.org/breweries';

export default function Breweries() {
  const [breweries, setBreweries] = useState([]);
  const [californiaBreweries, setCaliforniaBreweries] = useState([]);

  // Obtener cervecerías de la API
  useEffect(() => {
    // Todas las cervecerías
    fetch(BREWERIES_API_URL)
      .then((response) => response.json())
      .then((data) => setBreweries(data));

    // Cervecerías de California
    fetch(`${BREWERIES_API_URL}?by_state=california`)
      .then((response) => response.json())
      .then((data) => setCaliforniaBreweries(data));
  }, []);

  return (
    <div className={styles.breweriesContainer}>
      <TopBar showBarsIcon={true} showArrowIcon={false} />

      <HappyHour text="16:00 - 17:00 hs MEX" />

      <Carousel items={breweries} title="Todas las opciones" />

      <Carousel items={californiaBreweries} title="Opciones en California" />

      <BottomBar />
    </div>
  );
}
