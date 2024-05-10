import Image from "next/image";

type ConeDisplayProps = {
    name: string;
    icon: string;
    imposition: number | null;
    height?: number;
    width?: number;
  };
  
  export const ConeDisplay: React.FC<ConeDisplayProps> = ({
    name,
    icon,
    imposition,
    height, width
  }) => {
    return (
        <div className="flex justify-center items-center whitespace-nowrap gap-2">
            <div className="relative flex justify-center p-[2px]" title={name} >
                <Image height={height ? height : 45} width={width ? width : 30} className="m-1" src={icon} alt="lightcone" />
                <span className="absolute right-0 bottom-0 font-medium text-orange-300">
                    {imposition? `S${imposition}` : `S${1}`}
                </span>
            </div>
        </div>
    );
  };
  
