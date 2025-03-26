"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Filter, Settings, X, Bell, Menu, ChevronDown } from "lucide-react";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react"
import loansData from "./loansData.json";

export default function LoanDashboard() {
  const [search, setSearch] = useState("");
  const [selectedLoans, setSelectedLoans] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">Resollect</h1>
        </div>
        <div className="flex items-center gap-6">
          <Bell className="text-gray-500 cursor-pointer" />
          <div className="flex items-center gap-2 relative group">
            <div className="text-sm">
              <p className="font-semibold flex items-center gap-1">
                Piyush
                <ChevronDown className="w-4 h-4" />
              </p>
              <p className="text-gray-500 hidden sm:block flex items-center gap-1">
                kumarchspiyush@gmail.com
                {/* <ChevronDown className="w-4 h-4" /> */}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* Mobile Sidebar */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="fixed top-0 left-0 h-full w-3/4 bg-gray-900 text-white z-50 p-4 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Menu</h2>
                <X className="w-6 h-6 cursor-pointer" onClick={() => setMobileSidebarOpen(false)} />
              </div>

              <nav className="flex flex-col gap-2">

                <Button variant="ghost" className="w-full justify-start">Dashboard</Button>
                <Button variant="secondary" className="w-full justify-start">Portfolio</Button>
                <Button variant="ghost" className="w-full justify-start">Notifications</Button>
                <Button variant="ghost" className="w-full justify-start">Data Upload</Button>
                <Button variant="ghost" className="w-full justify-start">Control Panel</Button>
                <Button variant="ghost" className="w-full justify-start">User Management</Button>
                <Button variant="ghost" className="w-full justify-start">Permissions</Button>
              </nav>
            </div>
          </div>
        )}

        {/* Desktop Sidebar */}
        <aside className={`bg-gray-900 text-white transition-all duration-300 ${sidebarOpen ? "w-60" : "w-16"} overflow-hidden flex flex-col hidden md:flex`}>
          <div className="flex justify-between items-center p-4">
            {sidebarOpen && <h2 className="text-xl font-bold">Menu</h2>}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-full transition-transform duration-300 hover:scale-110 hover:bg-gray-700 shadow-lg"
            >
              {sidebarOpen ? (
                <ArrowLeftCircle className="w-5 h-5" />
              ) : (
                <ArrowRightCircle className="w-5 h-5" />
              )}
            </Button>
          </div>

          {/* Compact Sidebar Buttons */}
          {sidebarOpen && (
            <nav className="flex flex-col gap-1 px-4">
              <Button variant="ghost" className="w-full text-sm justify-start">Dashboard</Button>
              <Button variant="secondary" className="w-full text-sm justify-start">Portfolio</Button>
              <Button variant="ghost" className="w-full text-sm justify-start">Notifications</Button>
              <Button variant="ghost" className="w-full text-sm justify-start">Data Upload</Button>
              <Button variant="ghost" className="w-full text-sm justify-start">Control Panel</Button>
              <Button variant="ghost" className="w-full text-sm justify-start">User Management</Button>
              <Button variant="ghost" className="w-full text-sm justify-start">Permissions</Button>
            </nav>
          )}
        </aside>

        {/* Main Content Section */}
        <div className={`transition-all duration-300 flex-1 p-4 md:p-6 overflow-auto`}>
          {/* Portfolio Header and Filter Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
            <h1 className="text-2xl font-semibold">Portfolio</h1>
            <div className="flex gap-2 md:gap-4 w-full md:w-auto">
              <Button onClick={() => setShowUpload(true)} className="flex-1 md:flex-none">
                <Upload className="mr-2" size={16} />
                <span className="hidden sm:inline">Upload Document</span>
              </Button>
              <Button variant="outline" className="flex-1 md:flex-none">
                <Filter className="mr-2" size={16} />
                <span className="hidden sm:inline">More Filters</span>
              </Button>
            </div>
          </div>

          {/* Header Buttons - Scrollable on mobile */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            <Button variant="outline" className="whitespace-nowrap">All</Button>
            <Button variant="destructive" className="whitespace-nowrap">Pre Sarfesi</Button>
            <Button variant="outline" className="whitespace-nowrap">NPA</Button>
            <Button variant="outline" className="whitespace-nowrap">13(3) Responses</Button>
            <Button variant="outline" className="whitespace-nowrap">Symbolic Possession</Button>
            <Button variant="outline" className="whitespace-nowrap">DM Order</Button>
            <Button variant="outline" className="whitespace-nowrap">Physical Possessions</Button>
            <Button variant="outline" className="whitespace-nowrap">Auctions</Button>
          </div>

          <Card>
            <CardContent>
              {/* Search and Filter Section */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <Input
                  placeholder="Search Loan Number"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full md:w-auto"
                />
                <div className="flex gap-2 md:gap-4 w-full md:w-auto">
                  <Button variant="outline" className="flex-1 md:flex-none">
                    <Settings size={16} className="mr-2" />
                    <span className="hidden sm:inline">Select Columns</span>
                  </Button>
                </div>
              </div>

              <p className="text-gray-500 mb-2">
                {selectedLoans.length} loans selected
              </p>

              <div className="overflow-x-auto">
                <Table className="min-w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-8"></TableHead>
                      <TableHead>Loan No.</TableHead>
                      <TableHead className="sm:table-cell">Loan Type</TableHead>
                      <TableHead>Borrower</TableHead>
                      <TableHead className=" md:table-cell">Borrower Address</TableHead>
                      <TableHead className=" lg:table-cell">Co-Borrower</TableHead>
                      <TableHead className=" xl:table-cell">Co-Borrower Address</TableHead>
                      <TableHead>DPD</TableHead>
                      <TableHead>Sanction Amount</TableHead>
                      <TableHead className=" sm:table-cell">Region</TableHead>
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
                            className="w-4 h-4"
                          />
                        </TableCell>
                        <TableCell>{loan.loanNumber}</TableCell>
                        <TableCell className=" sm:table-cell">{loan.loanType}</TableCell>
                        <TableCell>{loan.borrower}</TableCell>
                        <TableCell className="md:table-cell">{loan.borrowerAddress}</TableCell>
                        <TableCell className="lg:table-cell">{loan.coBorrower || "N/A"}</TableCell>
                        <TableCell className="xl:table-cell">{loan.coBorrowerAddress}</TableCell>
                        <TableCell>{loan.dpd}</TableCell>
                        <TableCell>₹ {loan.sanction.toLocaleString()}</TableCell>
                        <TableCell className="sm:table-cell">{loan.region}</TableCell>
                        <TableCell>{loan.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar (Upload) */}
        {showUpload && (
          <div className="fixed inset-0 z-50 bg-black/50 md:bg-transparent">
            <div className="fixed right-0 top-0 h-full w-full md:w-1/3 bg-white shadow-lg p-4 md:p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Upload Document</h2>
                <X
                  size={24}
                  className="cursor-pointer"
                  onClick={() => setShowUpload(false)}
                />
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
                    <option>JSON</option>
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
          </div>
        )}
      </div>
    </div>
  );
}