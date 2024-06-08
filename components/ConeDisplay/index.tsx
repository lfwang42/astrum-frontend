import Image from "next/image";

type ConeDisplayProps = {
    name: string;
    tid: number;
    imposition: number | null;
    height?: number;
    width?: number;
  };
  
  export const ConeDisplay: React.FC<ConeDisplayProps> = ({
    name,
    tid,
    imposition,
    height, width
  }) => {
    return (
        <div className="flex justify-center items-center whitespace-nowrap">
            <div className="relative flex justify-center p-[2px]" title={name} >
                <Image height={height ? height : 45} width={width ? width : 30} className="m-1" src={`/icon/${tid}.png`} alt="lightcone" unoptimized/>
                {tid != 1 ? 
                <span className="absolute right-1 bottom-1 font-medium text-gray-50 drop-shadow">
                    {imposition? `S${imposition}` : `S${1}`}
                </span>
                : 
                null}
            </div>
        </div>
    );
  };
  
