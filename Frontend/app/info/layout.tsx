export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex justify-center">
            {children}
        </div>
    )
};
