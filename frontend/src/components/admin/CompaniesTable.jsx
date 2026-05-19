import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Read API endpoints directly into your component environment variable paths
const COMPANY_API_END_POINT = import.meta.env.VITE_USER_COMPANY_END_POINT;

const CompaniesTable = ({ searchCompanyByText }) => {
  // ⚡ Local component values capture matching database payloads 
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  console.loh(companies);

  // Fetch all user matching companies on component mount
  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        setLoading(true);
        setError(null);

        // Connect directly to your live/local authenticated get controller endpoints
        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          withCredentials: true, // Vital requirement ensuring authentication token cookies pass safely
        });
         console.log(res.data);
        if (res.data.success) {
          setCompanies(res.data.companies || []);
        } else {
          setError("Could not retrieve company listings.");
        }
      } catch (err) {
        console.error("API Fetch Error:", err);
        setError("An unexpected error occurred while loading table columns.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllCompanies();
  }, []);

  // Compute search criteria filters on-the-fly dynamically inside every rendering run
  const filteredCompanies = companies?.filter((company) => {
    if (!searchCompanyByText) return true;
    return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
  });

  if (loading) {
    return <div className="text-center py-10 text-gray-400">Loading your registers...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-400 font-medium">{error}</div>;
  }

  return (
    <div className="backdrop-blur-md bg-white/5 border border-white/10 p-6 rounded-2xl shadow-2xl overflow-hidden">
      <Table>
        <TableCaption className="text-gray-400 mt-4">A list of your recently registered companies</TableCaption>
        <TableHeader>
          <TableRow className="border-b border-white/10 hover:bg-transparent">
            <TableHead className="text-gray-300 font-semibold">Logo</TableHead>
            <TableHead className="text-gray-300 font-semibold">Name</TableHead>
            <TableHead className="text-gray-300 font-semibold">Date Registered</TableHead>
            <TableHead className="text-right text-gray-300 font-semibold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCompanies?.length > 0 ? (
            filteredCompanies.map((company) => (
              <TableRow key={company._id} className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200">
                <TableCell>
                  <Avatar className="h-10 w-10 border border-white/10">
                    <AvatarImage src={company.logo || 'https://via.placeholder.com/50'} />
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium text-white">{company.name}</TableCell>
                <TableCell className="text-gray-300">
                  {company.createdAt ? new Date(company.createdAt).toLocaleDateString() : "N/A"}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer text-gray-400 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 bg-[#121826] border border-white/10 rounded-xl shadow-xl p-1 text-gray-200">
                      <div
                        className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 cursor-pointer rounded-lg transition-colors"
                        onClick={() => navigate(`/admin/companies/${company._id}`)}
                      >
                        <Edit2 size={16} className="text-purple-400" />
                        <span className="text-sm font-medium">Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="4" className="text-center py-8 text-gray-400">
                No companies found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;