// components/Footer.jsx
export default function Footer() {
  return (
    <footer className="max-h-50 min-w-full bg-[#e8e8e8]  border-t-2 border-orange-500 shadow-inner text-center py-4">
      <p className="text-base mb-2 text-black">
        Consider applying for YC's Fall 2025 batch! Applications are open till Aug 4
      </p>
      <div className="flex flex-wrap justify-center text-xs text-gray-700 mb-3">
        <a href="#" className="hover:underline"><span className="text-black">Guidelines</span> </a>|
        <a href="#" className="hover:underline"><span className="text-black"> FAQ</span> </a>|
        <a href="#" className="hover:underline"><span className="text-black"> Lists</span> </a>|
        <a href="#" className="hover:underline"><span className="text-black"> API</span> </a>|
        <a href="#" className="hover:underline"><span className="text-black"> Security</span> </a>|
        <a href="#" className="hover:underline"><span className="text-black"> Legal</span> </a>|
        <a href="#" className="hover:underline"><span className="text-black"> Apply to YC</span> </a>|
        <a href="#" className="hover:underline"><span className="text-black"> Contact</span></a>
      </div>
      <div className="flex justify-center items-center space-x-2">
        <label htmlFor="footer-search" className="text-gray-600 font-medium">Search:</label>
        <input
          id="footer-search"
          type="text"
          className="border border-gray-400 rounded px-2 w-48 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
    </footer>
  );
}
