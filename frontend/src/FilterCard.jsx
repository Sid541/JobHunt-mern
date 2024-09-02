import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group';
import { Label } from './components/ui/label';
import { Filter } from 'lucide-react';
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
    <div className="w-full bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Filter Jobs</h1>
        <Filter className="text-lg text-gray-600" />
      </div>
      <hr className="mb-4 border-gray-300" />
      <RadioGroup value={selected} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={index} className="mb-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">{data.filterType}</h2>
            <div className="space-y-2">
              {data.arr.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                return (
                  <div key={itemId} className="flex items-center gap-2">
                    <RadioGroupItem value={item} id={itemId} className="h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    <Label htmlFor={itemId} className="text-gray-700">{item}</Label>
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
