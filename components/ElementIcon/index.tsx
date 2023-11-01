import Image from 'next/image';

const elements: {
    [key: string]: any;
  } = {
    // "Ice": '../../assets/icon/Ice.png',
    // "Quantum": '../../assets/icon/Quantum.png'
    "Ice": '/icon/Ice.png',
    "Quantum": '/icon/Quantum.png'
  }

type IconProps = {
  element: string;
};

export const ElementIcon: React.FC<IconProps> = ({ element }) => {
  console.log(elements[element])
    return (
        <div className="justify-start gap-5">
          <Image className="h-auto w-8 m-1" width={50} height={50} src={elements[element]} alt={element} />
        </div>
        );
  
};
