'use client'


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";

const ITEMS_PER_PAGE = 12;
interface WardMember {
    ward_number: string;
    name: string;
    relation: string;
    address: string;
    phone: string;
}

const ContactPage = () => {
    const [allMembers, setAllMembers] = useState<WardMember[]>([]);
    const [filteredMembers, setFilteredMembers] = useState<WardMember[]>([]);
    const [search, setSearch] = useState("");
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("/ward_members_full.json")
            .then((res) => res.json())
            .then((data) => {
                setAllMembers(data);
                setFilteredMembers(data);
            })
            .catch(() => setError("Failed to load data."));
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
                setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredMembers.length));
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [filteredMembers]);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!");
    };

    const filterMembers = useCallback((query: string) => {
        setLoading(true);
        setTimeout(() => {
            const filtered = query.trim()
                ? allMembers.filter((member) =>
                    member.address.toLowerCase().includes(query.toLowerCase())
                )
                : allMembers;
            setFilteredMembers(filtered);
            setVisibleCount(ITEMS_PER_PAGE); // Reset visible count when new search is performed
            setLoading(false);
        }, 300);
    }, [allMembers]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
        filterMembers(value);
    };

    return (
        <div className="min-h-screen  flex flex-col items-center p-6 w-full">
            <ToastContainer position="top-right" autoClose={3000} />
            <h2 className="text-3xl font-semibold text-gray-200 mb-4 text-center">
                Search Ward Members
            </h2>
            <input
                type="text"
                placeholder="Search by Ward Member OR Address"
                value={search}
                onChange={handleSearchChange}
                className="mb-4 p-2 border text-white border-white rounded-md w-full max-w-sm hover:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 transition duration-200"
            />
            {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
            {loading ? (
                <p className="text-white text-center">Searching...</p>
            ) : filteredMembers.length > 0 ? (
                <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredMembers.slice(0, visibleCount).map((member, index) => (
                        <Card
                            key={index}
                            className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300"
                        >
                            <CardHeader className="flex flex-col items-center text-center p-4">
                                <CardTitle className="text-lg font-semibold text-green-700">
                                    {member.name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-gray-700 text-center space-y-1 px-4 pb-4">
                                <p className="font-medium text-black">Ward #{member.ward_number}</p>
                                <div className="flex items-center justify-center space-x-2">
                                    <p className="text-sm">📞 {member.phone}</p>
                                    <button
                                        onClick={() => copyToClipboard(member.phone)}
                                        className="text-gray-500 hover:text-black"
                                    >
                                        <Copy className="w-4 h-4" />
                                    </button>
                                </div>
                                <p className="text-sm">{member.relation}</p>
                                <p className="text-sm">{member.address}</p>
                            </CardContent>
                        </Card>

                    ))}
                </div>
            ) : (
                <p className="text-white text-center">No ward members found for this name!!!.</p>
            )}
        </div>
    );
};

export default ContactPage;
