export default function Navbar() {
    return (
        <footer className="mt-auto bg-white rounded-lg shadow dark:bg-gray-800">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
              <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                  &copy; {new Date().getFullYear()} TalentPulse. All rechten voorbehouden.
            </span>
            </div>
        </footer>
    );
}



