"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Filter, Settings, X, ChevronLeft, ChevronRight, Bell } from "lucide-react";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react"
import loansData from "./loansData.json"; 

export default function LoanDashboard() {
  const [search, setSearch] = useState("");
  const [selectedLoans, setSelectedLoans] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleLoanSelection = (loanNumber) => {
    setSelectedLoans((prev) =>
      prev.includes(loanNumber)
        ? prev.filter((num) => num !== loanNumber)
        : [...prev, loanNumber]
    );
  };

  const filteredLoans = loansData.filter((loan) =>
    loan.loanNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen">

      {/* HEADER */}
      <header className="bg-white shadow-md w-full p-4 flex justify-between items-center z-10">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">Resollect</h1>
        </div>
        <div className="flex items-center gap-6">
          <Bell className="text-gray-500 cursor-pointer" />
          <div className="flex items-center gap-2">
            <div className="text-sm">
              <p className="font-semibold">Piyush</p>
              <p className="text-gray-500">kumarchspiyush@gmail.com</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">

        {/* Sidebar */}


        <aside className={`bg-gray-900 text-white transition-all duration-300 ${sidebarOpen ? "w-60" : "w-16"} overflow-hidden flex flex-col`}>

          <div className="flex justify-between items-center p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-full transition-transform duration-300 hover:scale-110 hover:bg-gray-700 shadow-lg"
            >
              {sidebarOpen ? (
                <ArrowLeftCircle className="w-20 h-20" />
              ) : (
                <ArrowRightCircle className="w-20 h-20" />
              )}
            </Button>
          </div>

          {/* Compact Sidebar Buttons */}
          {sidebarOpen && (
            <nav className="flex flex-col gap-1 px-4">
              <Button variant="ghost" className="w-full text-sm">Dashboard</Button>
              <Button variant="secondary" className="w-full text-sm">Portfolio</Button>
              <Button variant="ghost" className="w-full text-sm">Notifications</Button>
              <Button variant="ghost" className="w-full text-sm">Data Upload</Button>
              <Button variant="ghost" className="w-full text-sm">Control Panel</Button>
              <Button variant="ghost" className="w-full text-sm">User Management</Button>
              <Button variant="ghost" className="w-full text-sm">Permissions</Button>
            </nav>
          )}
        </aside>




        {/* Main Content Section */}
        <div className={`transition-all duration-300 ${sidebarOpen ? "w-full" : "w-full"} p-6`}>

          {/* Portfolio Header and Filter Section */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">Portfolio</h1>
            <div className="flex gap-4">
              <Button onClick={() => setShowUpload(true)}>
                <Upload className="mr-2" size={16} /> Upload Document
              </Button>
              <Button variant="outline">
                <Filter className="mr-2" size={16} /> More Filters
              </Button>
            </div>
          </div>

          {/* Header Buttons */}
          <div className="flex gap-4 mb-4">
            <Button variant="outline">All</Button>
            <Button variant="destructive">Pre Sarfesi</Button>
            <Button variant="outline">NPA</Button>
            <Button variant="outline">13(3) Responses</Button>
            <Button variant="outline">Symbolic Possession</Button>
            <Button variant="outline">DM Order</Button>
            <Button variant="outline">Physical Possessions</Button>
            <Button variant="outline">Auctions</Button>
          </div>

          <Card>
            <CardContent>

              {/* Search and Filter Section */}
              <div className="flex justify-between items-center mb-4">
                <Input
                  placeholder="Search Loan Number"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="flex gap-4">
                  <Button variant="outline">
                    <Settings size={16} className="mr-2" />
                    Select Columns
                  </Button>
                </div>
              </div>

              <p className="text-gray-500 mb-2">
                {selectedLoans.length} loans selected
              </p>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead></TableHead>
                    <TableHead>Loan No.</TableHead>
                    <TableHead>Loan Type</TableHead>
                    <TableHead>Borrower</TableHead>
                    <TableHead>Borrower Address</TableHead>
                    <TableHead>Co-Borrower</TableHead>
                    <TableHead>Co-Borrower Address</TableHead>
                    <TableHead>DPD</TableHead>
                    <TableHead>Sanction Amount</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLoans.map((loan, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedLoans.includes(loan.loanNumber)}
                          onChange={() => toggleLoanSelection(loan.loanNumber)}
                        />
                      </TableCell>
                      <TableCell>{loan.loanNumber}</TableCell>
                      <TableCell>{loan.loanType}</TableCell>
                      <TableCell>{loan.borrower}</TableCell>
                      <TableCell>{loan.borrowerAddress}</TableCell>
                      <TableCell>{loan.coBorrower || "N/A"}</TableCell>
                      <TableCell>{loan.coBorrowerAddress}</TableCell>
                      <TableCell>{loan.dpd}</TableCell>
                      <TableCell>₹ {loan.sanction.toLocaleString()}</TableCell>
                      <TableCell>{loan.region}</TableCell>
                      <TableCell>{loan.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar (Upload) */}
        {showUpload && (
          <div className="fixed right-0 top-0 h-full w-1/3 bg-white shadow-lg z-50 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Upload Document</h2>
              <X size={24} className="cursor-pointer" onClick={() => setShowUpload(false)} />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Document Name</label>
                <Input placeholder="Enter Document Name" />
              </div>
              <div>
                <label className="block text-sm font-medium">Document Type</label>
                <select className="w-full border p-2 rounded">
                  <option>Select</option>
                  <option>PDF</option>
                  <option>Image</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Document Remarks</label>
                <Input placeholder="Enter Remarks" />
              </div>
              <div>
                <label className="block text-sm font-medium">Select File</label>
                <input type="file" className="w-full border p-2 rounded" />
              </div>
              <Button className="w-full">Submit</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
