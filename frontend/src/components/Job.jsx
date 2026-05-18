import { Bookmark, MapPin, Calendar, ArrowUpRight } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const daysAgo = (mongodbTime) => {
    if (!mongodbTime) return 0;
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDiff = currentTime - createdAt;
    return Math.floor(timeDiff / (1000 * 24 * 60 * 60));
  };

  const handleBookmarkClick = (e) => {
    e.stopPropagation(); // Prevent card navigation when bookmarking
    setIsBookmarked(!isBookmarked);
  };

  const getInitials = (name) => {
    if (!name) return "";
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  return (
    <div 
      onClick={() => navigate(`/description/${job?._id}`)}
      className="group relative p-6 rounded-2xl bg-gradient-to-b from-[#131930] to-[#0F1424] border border-white/5 hover:border-indigo-500/30 transition-all duration-300 shadow-xl hover:shadow-indigo-500/5 cursor-pointer overflow-hidden transform hover:-translate-y-1"
    >
      {/* Absolute subtle background glow matching the premium cyber layout */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/[0.01] to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Dynamic Cyber Side Stripe Accent */}
      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-indigo-500 to-cyan-500 opacity-40 group-hover:opacity-100 transition-opacity" />

      {/* Top Meta Row */}
      <div className="flex justify-between items-center mb-4 pl-1">
        <p className="text-xs text-gray-400 font-medium flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5 text-indigo-400" />
          {daysAgo(job?.createdAt) === 0 ? "Today" : `${daysAgo(job?.createdAt)} days ago`}
        </p>
        <Button
          variant="none"
          size="icon"
          onClick={handleBookmarkClick}
          className={`h-8 w-8 rounded-xl transition-all border ${
            isBookmarked 
              ? 'bg-pink-500/10 border-pink-500/30 text-pink-400 shadow-[0_0_10px_rgba(244,63,94,0.2)]' 
              : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:border-white/10'
          }`}
        >
          <Bookmark className="w-4 h-4 fill-current" style={{ fillOpacity: isBookmarked ? 1 : 0 }} />
        </Button>
      </div>

      {/* Corporate Meta Profile Block */}
      <div className="flex items-center gap-3 my-3 pl-1">
        <Avatar className="h-11 w-11 rounded-xl border border-white/10 bg-[#0A0F1C] p-1">
          <AvatarImage src={job?.company?.logo} className="object-contain rounded-lg" />
          <AvatarFallback className="bg-indigo-600 text-white text-xs font-bold rounded-lg">
            {getInitials(job?.company?.name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-bold text-white tracking-wide group-hover:text-indigo-400 transition-colors text-base">
            {job?.company?.name}
          </h1>
          <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3 text-cyan-400" />
            {job?.location || 'India'}
          </p>
        </div>
      </div>

      {/* Content Parameters Paragraph Block */}
      <div className="my-4 pl-1">
        <h1 className="font-bold text-gray-200 group-hover:text-white transition-colors text-lg tracking-tight mb-2">
          {job?.title}
        </h1>
        <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
          {job?.description || 'No job description summary specifications supplied.'}
        </p>
      </div>

      {/* Metric Badge Coordinates */}
      <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-white/5 pl-1">
        <Badge className="text-cyan-400 bg-cyan-400/5 border border-cyan-400/10 font-semibold rounded-lg text-xs px-2.5 py-0.5" variant="none">
          {job?.position} Positions
        </Badge>
        <Badge className="text-pink-400 bg-pink-400/5 border border-pink-400/10 font-semibold rounded-lg text-xs px-2.5 py-0.5" variant="none">
          {job?.jobType}
        </Badge>
        <Badge className="text-indigo-400 bg-indigo-400/5 border border-indigo-400/10 font-semibold rounded-lg text-xs px-2.5 py-0.5" variant="none">
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Action Pipeline Access Triggers */}
      <div className="flex items-center gap-3 mt-5 pl-1">
        <Button 
          variant="none"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/description/${job?._id}`);
          }}
          className="flex-1 bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white border border-white/10 rounded-xl text-xs font-semibold h-10 transition-colors"
        >
          Details
        </Button>
        <Button 
          variant="none"
          className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold h-10 px-4 flex items-center gap-1 shadow-lg shadow-indigo-600/10 transition-all"
        >
          <span>Apply</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
};

export default Job;