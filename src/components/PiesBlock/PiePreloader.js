import React from 'react'
import ContentLoader from 'react-content-loader';


const PiePreloader = () => {
  return (
      <ContentLoader
          className='pizza-block'
          speed={2}
          width={280}
          height={460}
          viewBox="0 0 280 460"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
      >
        <circle cx="135" cy="134" r="118"/>
        <rect x="-1" y="267" rx="3" ry="3" width="281" height="28"/>
        <rect x="-1" y="303" rx="6" ry="6" width="281" height="89"/>
        <rect x="0" y="416" rx="3" ry="3" width="80" height="30"/>
        <rect x="119" y="408" rx="25" ry="25" width="156" height="45"/>
      </ContentLoader>
  );
};

export default PiePreloader;

