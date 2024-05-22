import Link from "next/link";
import Image from "next/image";
import { footerLinks } from "@/constants";
import { GrInstagram } from "react-icons/gr";

const Footer = () => {
  return (
    <footer className="py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <div className="flex flex-col items-center md:items-start">
          <Image src="/new-logo-gearup.png" alt="logo" width={118} height={18} className="object-contain" />
          <p className="text-base text-gray-700 mt-4">
            GearUp 2024 <br />
            All rights reserved &copy;
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center mt-6 md:mt-0">
          <div className="flex flex-col md:flex-row gap-6 pt-10 mt-5">
            <Link href="/privacyPolicy" className="font-semibold text-primary-blue transition-transform duration-500 ease-in-out hover:scale-110">Privacy Policy</Link>
            <Link href="/termOfUse" className="font-semibold text-primary-blue transition-transform duration-500 ease-in-out hover:scale-110">Terms of Use</Link>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-200"></div> {/* Separator line */}
      <div className="text-sm text-gray-500 mt-4 mx-auto text-center">
        &copy; 2024 GearUp. All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;

