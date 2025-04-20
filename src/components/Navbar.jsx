import { NavLink } from 'react-router-dom';

const navItems = [
  { name: 'Make a Bet', path: '/make' },
  { name: 'Take a Bet', path: '/take' },
  { name: 'Settle a Bet', path: '/settle' },
  { name: 'Login', path: '/login' },
];

export default function Navbar() {
  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">🧃 Betcha</h1>
        <div className="space-x-4">
          {navItems.map(({ name, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive ? 'text-green-600 underline' : 'text-gray-600 hover:text-black'
                }`
              }
            >
              {name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
