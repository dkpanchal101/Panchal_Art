import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
      <div className="text-center px-4">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-bold text-text mb-4">Page Not Found</h2>
          <p className="text-xl text-muted mb-8 max-w-md mx-auto">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center bg-primary text-primary-contrast px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300 mx-2"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-primary-contrast transition-colors duration-300 mx-2"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted mb-4">Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/services" className="text-primary hover:underline">Our Services</Link>
            <Link to="/gallery" className="text-primary hover:underline">Portfolio</Link>
            <Link to="/about" className="text-primary hover:underline">About Us</Link>
            <Link to="/contact" className="text-primary hover:underline">Contact</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;