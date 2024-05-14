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
        <div className="flex justify-center items-center whitespace-nowrap">
            <div className="relative flex justify-center p-[2px]" title={name} >
                <Image height={height ? height : 45} width={width ? width : 30} className="m-1" src={icon} alt="lightcone" unoptimized/>
                <span className="absolute right-1 bottom-1 font-medium text-gray-50 drop-shadow">
                    {imposition? `S${imposition}` : `S${1}`}
                </span>
            </div>
        </div>
    );
  };
  
