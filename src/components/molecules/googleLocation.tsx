import React from "react";

interface GoogleLocationProps {
  address: string;
  addressLines?: string[];
  mapSrc: string;
  mapLink: string;
  className?: string;
}

const GoogleLocation: React.FC<GoogleLocationProps> = ({
  address,
  addressLines,
  mapSrc,
  mapLink,
  className = "",
}) => (
  <div className={`flex flex-col items-center ${className}`}>
    <a
      href={mapLink}
      target="_blank"
      rel="noopener noreferrer"
      className="mb-2"
    >
      <div className="rounded-lg overflow-hidden shadow-lg w-full aspect-video border border-gray-200">
        <iframe
          src={mapSrc}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map Location"
          className="w-full h-full"
        />
      </div>
    </a>
    <div className="text-sm mt-2 text-center drop-shadow">
      {addressLines
        ? addressLines.map((line, i) => <div key={i}>{line}</div>)
        : address}
    </div>
  </div>
);

export default GoogleLocation;