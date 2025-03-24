'use client'

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export default function StatisticsPage() {
    const [filters, setFilters] = useState({ date: "", type: "", status: "All" });
    return (
        <div className="border-violet-600 border-1">
            <ul className="text-3xl font-semibold text-white mb-6 list-disc pl-5">
                <li>Statistics</li>
            </ul>
            <div className="h-screen flex  p-2 items-start justify-start w-full">

                <div className="flex flex-wrap w-full max-w-5xl gap-2 border-2 border-yellow-300 items-center">
                    <Input
                        type="date"
                        placeholder="Filter by Due Date"
                        value={filters.date}
                        onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                        className="p-2 border rounded-2xl flex-1 min-w-[200px] text-white placeholder:text-white"
                    />

                    <Input
                        type="text"
                        placeholder="Filter by Bill Name"
                        value={filters.type}
                        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                        className="p-2 border rounded-2xl flex-1 min-w-[200px] text-white placeholder:text-white"
                    />

                    {/* Status Filter */}
                    <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                        <SelectTrigger className="flex-1 min-w-[200px] rounded-2xl text-white">
                            <SelectValue placeholder="Filter by Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All</SelectItem>
                            <SelectItem value="Paid">Paid</SelectItem>
                            <SelectItem value="Unpaid">Unpaid</SelectItem>
                            <SelectItem value="Overdue">Overdue</SelectItem>
                        </SelectContent>
                    </Select>
                </div>




            </div>


        </div>

    )
}