export default function ExtendLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex justify-center">
            {children}
        </div>
    )
};