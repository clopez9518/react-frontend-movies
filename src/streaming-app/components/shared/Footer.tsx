import { Link } from "react-router"

export const Footer = () => {
    return (
        <footer className="bg-[var(--footer-background)] border-t border-gray-800 py-12 px-6 lg:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h4 className="text-gray-400 text-sm mb-3">Company</h4>
                        <ul className="space-y-2">
                            <li><Link to="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">About Us</Link></li>
                            <li><Link to="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Careers</Link></li>
                            <li><Link to="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Press</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-gray-400 text-sm mb-3">Support</h4>
                        <ul className="space-y-2">
                            <li><Link to="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Help Center</Link></li>
                            <li><Link to="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Contact Us</Link></li>
                            <li><Link to="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Account</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-gray-400 text-sm mb-3">Legal</h4>
                        <ul className="space-y-2">
                            <li><Link to="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Privacy Policy</Link></li>
                            <li><Link to="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Terms of Service</Link></li>
                            <li><Link to="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-gray-400 text-sm mb-3">Connect</h4>
                        <ul className="space-y-2">
                            <li><Link to="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Twitter</Link></li>
                            <li><Link to="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Facebook</Link></li>
                            <li><Link to="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Instagram</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-gray-800">
                    <p className="text-gray-600 text-sm">© 2026 Streamify. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}