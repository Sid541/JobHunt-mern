import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
  const {allAppliedJobs}=useSelector(store=>store.job);
  
  return (
    <div>
      <Table>
  <TableCaption></TableCaption>
  <TableHeader>
    <TableRow className="text-xl">
      <TableHead >Date</TableHead>
      <TableHead>Job Role</TableHead>
      <TableHead>Company</TableHead>
      <TableHead className="text-right">Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {
        allAppliedJobs <= 0 ? <span>You haven't applied any job yet.</span>: allAppliedJobs.map((item)=>{
            return <TableRow key={item._id}>
              <TableCell>{item?.job?.createdAt.split("T")[0]}</TableCell>
              <TableCell>{item?.job?.title}</TableCell>
              <TableCell>{item?.job?.company?.name}</TableCell>
              <TableCell className="text-right"><Badge className={`${item?.status === "rejected" ? 'bg-red-600' : item?.status === 'pending' ? 'bg-gray-500' : 'bg-green-700'}`}>{item?.status.toUpperCase()}</Badge></TableCell>
            </TableRow>
        })
    }
  </TableBody>
</Table>

    </div>
  )
}

export default AppliedJobTable
