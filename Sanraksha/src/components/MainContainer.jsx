import { Link } from "react-router-dom";
import { MapPin } from 'lucide-react';
import { MAIN_BG } from '../utils/constants';

const MainContainer = () => {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 z-20">
          <div className="absolute inset-0 bg-gradient-to-b from-clr5 via-transparent to-clr5 z-30" />
          <img 
            src={MAIN_BG}
            alt="background"
            className="w-full h-full object-cover object-center opacity-30"
          />
        </div>

        <div className="absolute inset-0 z-10 bg-gradient-to-b from-clr5 via-clr4 to-clr5 opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse z-30" />
        <div className="relative px-6 py-16 mt-[-100px] text-center space-y-8 transform hover:scale-105 transition-transform duration-500 max-w-4xl mx-auto z-40">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-clr1">
            Navigate Safer Paths 
            <span className="block mt-2 relative">
              with Confidence
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-clr2 rounded-full" />
            </span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl mb-12 text-clr2 font-medium">
            Identify Safe Zones, Empower Your Decisions
          </h2>
          
          <button className="group px-8 py-4 text-white bg-clr2 hover:bg-clr1 ring-clr4 rounded-lg text-xl font-semibold shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-1 focus:outline-none focus:ring-4">
            <Link to="/dashboard" className="flex items-center justify-center space-x-2">
              <span>View Safety Dashboard</span>
              <MapPin className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </button>
        </div>
        </div>
  );
};

export default MainContainer;