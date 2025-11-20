import DocsSidebar from '@/components/docs/DocsSidebar';
import Navbar from '@/components/layout/Navbar';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex flex-1 relative">
        <DocsSidebar />
        <main className="flex-1 overflow-y-auto lg:ml-0 ml-0">
          {children}
        </main>
      </div>
    </div>
  );
}