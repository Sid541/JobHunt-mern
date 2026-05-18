import React, { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector((store) => store.company);
  const [filteredCompanies, setFilteredCompanies] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = companies?.filter((company) => {
      if (!searchCompanyByText) return true;
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });
    setFilteredCompanies(filtered);
  }, [companies, searchCompanyByText]);

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
                <TableCell className="text-gray-300">{new Date(company.createdAt).toLocaleDateString()}</TableCell>
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