import { Shield } from 'lucide-react'; // Using Shield as a generic secure wallet icon
import Link from 'next/link';

interface LogoProps {
  className?: string;
  textColorClassName?: string;
  iconSize?: number;
  textSize?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  className = "", 
  textColorClassName = "text-primary",
  iconSize = 8,
  textSize = "text-2xl"
}) => {
  return (
    <Link href="/" className={`flex items-center space-x-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm p-1 -m-1 ${className}`}>
      <Shield className={`h-${iconSize} w-${iconSize} ${textColorClassName}`} aria-hidden="true" />
      <span className={`font-bold ${textSize} ${textColorClassName}`}>Kraken Wallet</span>
    </Link>
  );
};

export default Logo;
