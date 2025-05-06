import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllOffers } from '../../api';

// Define the structure of an individual offer
interface Offer {
  lenderId: number;
  lenderName: string;
  lenderLogo: string;
  offerAmountUpTo: string;
  offerTenure: string;
  offerInterestRate: string;
  offerProcessingFees: string;
  offerLink: string;
  status: string;
}

const Offers = () => {
  const [offers, setOffers] = useState<Offer[]>([]); // Specify the type of offers state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [leadId, setLeadId] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve leadId from localStorage
    const storedLeadId = localStorage.getItem('leadId');

    if (storedLeadId) {
      setLeadId(storedLeadId);  // Set it in the state if it's available
    } else {
      console.log('No leadId found in localStorage');
    }
  }, []);

  useEffect(() => {
    // Only fetch offers if leadId is available
    if (leadId) {
      const fetchOffers = async () => {
        try {
          const data = await getAllOffers(leadId);  // Assuming getAllOffers takes leadId

          console.log("🚀 ~ fetchOffers ~ data:", data);

          // Assuming the response structure is an array directly (or it could be data.offers if wrapped in an object)
          if (Array.isArray(data)) {
            setOffers(data);
          } else {
            setOffers(data.offers || []);  // If offers are wrapped under an `offers` key
          }
        } catch (err) {
          setError('Failed to fetch offers');
        } finally {
          setLoading(false);
        }
      };

      fetchOffers(); // Call the function
    }
  }, [leadId]);

  return (
    <div className="container mx-auto px-4 py-6">
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link to="/" className="text-primary hover:underline">
            Dashboard
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Merchants</span>
        </li>
      </ul>
      <div className="offers-container mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading && <p className="text-center col-span-full">Loading offers...</p>} {/* Show loading message while fetching */}
        {error && <p className="text-center col-span-full text-red-500">{error}</p>} {/* Show error message if fetching fails */}
        {offers.length > 0 ? (
          offers.map((offer) => (
            <div key={offer.lenderId} className="offer-card bg-white border border-gray-300 rounded-lg shadow-md p-4 flex flex-col h-full">
              <img
                src={offer.lenderLogo}
                alt={offer.lenderName}
                className="w-24 h-24 object-contain mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-center mb-2">{offer.lenderName}</h3>
              <p className="text-gray-700"><strong>Lender ID:</strong> {offer.lenderId}</p>
              <p className="text-gray-700"><strong>Offer Amount Up To:</strong> {offer.offerAmountUpTo}</p>
              <p className="text-gray-700"><strong>Tenure:</strong> {offer.offerTenure}</p>
              <p className="text-gray-700"><strong>Interest Rate:</strong> {offer.offerInterestRate}</p>
              <p className="text-gray-700"><strong>Processing Fees:</strong> {offer.offerProcessingFees}</p>
              <p className="text-gray-700"><strong>Status:</strong> {offer.status}</p>

              {/* The button is pushed to the bottom using mt-auto */}
              <div className="mt-auto">
                <a
                  href={offer.offerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 w-full text-center"
                >
                  View Offer
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No offers available.</p>
        )}
      </div>
    </div>
  );
};

export default Offers;
