import Image from 'next/image';

const elements: {
    [key: string]: any;
  } = {
    // "Ice": '../../assets/icon/Ice.png',
    // "Quantum": '../../assets/icon/Quantum.png'
    "Ice": '/icon/Ice.png',
    "Quantum": '/icon/Quantum.png',
    'Wind': '/icon/Wind.png',
    'Fire': '/icon/Fire.png',
    'Thunder': '/icon/Thunder.png',
    'Imaginary': '/icon/Imaginary.png'
  }

type IconProps = {
  element: string;
};

export const ElementIcon: React.FC<IconProps> = ({ element }) => {
    return (
      <div className="justify-start">
        <Image className="h-[35px] w-auto" width={35} height={35} src={elements[element]} alt={element} />
      </div>
    );
  
};
