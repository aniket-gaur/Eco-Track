export default function Header() {
    return (
        <header className="absolute top-0 left-0 w-full flex justify-between items-center p-6 bg-gray-800 bg-opacity-75">
            <h2 className="text-2xl font-bold text-white">Eco-Track</h2>
            <nav>
                <ul className="flex space-x-10 text-white ">
                    <li><a href="#" className="hover:text-blue-400">Home</a></li>
                    <li><a href="#" className="hover:text-blue-400">About</a></li>
                    <li><a href="#" className="hover:text-blue-400">Contact</a></li>
                    <li><a href="#" className="hover:text-blue-400">Articles</a></li>

                </ul>
            </nav>
        </header>

    )
}