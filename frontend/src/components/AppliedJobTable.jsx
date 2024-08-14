import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'

const AppliedJobTable = () => {
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
        [1,2,3,4].map((item,index)=>{
            return <TableRow key={index}>
              <TableCell>17-07-2024</TableCell>
              <TableCell>Frontend Developer</TableCell>
              <TableCell>Google</TableCell>
              <TableCell className="text-right"><Badge className="bg-green-700">Selected</Badge></TableCell>
            </TableRow>
        })
    }
  </TableBody>
</Table>

    </div>
  )
}

export default AppliedJobTable
