import SideNav from '@/app/ui/dashboard/sidenav';

// Here we are creating a layout for the dashboard page. SideNav creates that side menu look that we want in our application.

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
        <SideNav />
        </div>
        <div className="grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
);
}