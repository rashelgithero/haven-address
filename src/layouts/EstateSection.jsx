import React, { useEffect, useState } from 'react';
import PropertyCard from './PropertyCard';

export default function EstatesSection() {
  const [estates, setEstates] = useState([]);

  useEffect(() => {
    fetch('/estates.json')
      .then((res) => res.json())
      .then((data) => setEstates(data));
  }, []);

  return (
    <section className="py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-7xl text-black">
          Residential <span className="text-[#F9A51A]">Estates</span>
        </h2>
        <p className="text-slate-400 text-sm mt-2">
          Explore our handpicked selection of premium villas, apartments, and suburban family homes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {estates.map((estate) => (
          <PropertyCard key={estate.id} estate={estate} />
        ))}
      </div>
    </section>
  );
}