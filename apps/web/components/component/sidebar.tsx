

import Link from 'next/link';

const sidebarItems = [
    { name : 'Pay', href: '/pay' },
    { name: 'Wallet', href: '/wallet' },
    { name: 'Profile', href: '/profile' }
];

export default function Sidebar() {
    return (
        <aside className="h-screen w-64 bg-black text-white flex flex-col shadow-lg">
            <div className="p-6 text-2xl font-bold border-b border-gray-800 flex items-center space-x-3">
                <p>Kranken Wallet</p>
            </div>  <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {sidebarItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.href}
                                className="block px-4 py-2 rounded hover:bg-[#2c0c8d] transition-colors focus:bg-white focus:text-black "
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="p-4 border-t border-gray-800 text-sm text-gray-400">
                &copy; {new Date().getFullYear()} Kranken Wallet
            </div>
        </aside>
    );
}