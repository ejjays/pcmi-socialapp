     import { FaCheckCircle } from 'react-icons/fa';

     interface VerifiedCheckmarkProps {
       isVerified: boolean;
     }

     const VerifiedCheckmark: React.FC<VerifiedCheckmarkProps> = ({ isVerified }) => {
       if (!isVerified) return null;

       return (
         <span className="ml-1 text-blue-500">
           <FaCheckCircle />
         </span>
       );
     };

     export default VerifiedCheckmark;