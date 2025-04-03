import React from 'react';
import Sidebar from './Admin/sidenav';

export default function AdminLayout({ children }: { children: React.ReactNode }) {

	return (
		<div className="flex h-screen bg-gray-100">
			{/* Sidebar - fixed on desktop, toggleable on mobile */}
			<div className="fixed inset-y-0 left-0 z-50 md:relative md:flex">
				<Sidebar />
			</div>

			{/* Main content area */}
			<div className="flex-1 overflow-auto">
				{children}
			</div>
		</div>
	);
}