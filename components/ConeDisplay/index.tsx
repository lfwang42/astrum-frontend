type ConeDisplayProps = {
    icon: string;
    imposition: number | null;
  };
  
  export const WeaponMiniDisplay: React.FC<ConeDisplayProps> = ({
    icon,
    imposition,
  }) => {
    return (
        <div className="flex justify-start whitespace-nowrap gap-5">
            <div className="relative">
                <img className="h-auto w-8 m-1" src={icon} />
                <span className="absolute right-0 bottom-0">
                    {imposition? `S${imposition}` : `S${1}`}
                </span>
            </div>
        </div>
    );
  };
  
