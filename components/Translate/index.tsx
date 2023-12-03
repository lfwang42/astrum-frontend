'use client'
import { useTranslation } from 'react-i18next';

type TProps = {
  str: string
};


export const Translate: React.FC<TProps> = ({ str }) => {
    const { t } = useTranslation('translation')
    return (
        <span>{t(str)}</span>
        );
  
};
