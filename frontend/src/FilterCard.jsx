import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group';
import { Label } from './components/ui/label';
import { Filter, Sparkles } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from './redux/jobSlice';

const filterData = [
  {
    filterType: "Location",
    arr: ["Delhi", "Banglore", "Hyderabad", "Pune", "Noida", "Mumbai"]
  },
  {
    filterType: "Industry",
    arr: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Data Analyst"]
  },
  {
    filterType: "Salary",
    arr: ["0-4k", "40k-1Lakh", "1Lakh-5Lakh"]
  },
];

const FilterCard = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("");

  const changeHandler = (value) => {
    setSelected(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selected));
  }, [selected, dispatch]);

  return (
    <div className="w-full bg-transparent text-gray-300">
      {/* Dynamic Header Row */}
      <div className="flex items-center justify-between pb-3 mb-5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-indigo-400" />
          <h1 className="text-sm font-bold uppercase tracking-wider text-white">Filter Pipelines</h1>
        </div>
        {selected && (
          <button 
            onClick={() => setSelected("")}
            className="text-[10px] bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-bold px-2 py-0.5 rounded transition-all"
          >
            Clear
          </button>
        )}
      </div>

      {/* Target Criteria Radio Group Mapping */}
      <RadioGroup value={selected} onValueChange={changeHandler} className="space-y-5">
        {filterData.map((data, index) => (
          <div key={index} className="space-y-2.5">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              {data.filterType}
            </h2>
            
            <div className="space-y-2 bg-[#0A0F1C]/40 border border-white/5 p-3 rounded-xl">
              {data.arr.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                const isChecked = selected === item;
                
                return (
                  <div 
                    key={itemId} 
                    className={`flex items-center gap-3 px-2.5 py-1.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                      isChecked 
                        ? 'bg-indigo-500/5 border-indigo-500/30 text-white shadow-[0_0_12px_rgba(99,102,241,0.05)]' 
                        : 'border-transparent hover:bg-white/[0.02] text-gray-400 hover:text-gray-200'
                    }`}
                    onClick={() => changeHandler(item)}
                  >
                    <RadioGroupItem 
                      value={item} 
                      id={itemId} 
                      className={`h-4 w-4 border-white/20 transition-all ${
                        isChecked 
                          ? 'border-indigo-500 text-indigo-500 ring-2 ring-indigo-500/20' 
                          : 'text-gray-600 focus:ring-0'
                      }`}
                    />
                    <Label 
                      htmlFor={itemId} 
                      className="text-xs font-medium cursor-pointer w-full select-none"
                      onClick={(e) => e.stopPropagation()} // Prevent double triggers
                    >
                      {item}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;