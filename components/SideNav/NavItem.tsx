import { TPath } from '@/core/types/app';
import Link from 'next/link';
import { FC } from 'react';

type NavItemProps = {
    active: boolean;
} & Omit<TPath, 'routeKey'>

const NavItem: FC<NavItemProps> = (props) => {
    const { href, label, icon: Icon, active } = props

    return (
        <Link href={href} className={`flex flex-row h-auto items-center w-full gap-x-4 cursor-pointer hover:text-black transition py-1 ${active ? "text-black" : "text-neutral-500"}`}>
            {Icon && <Icon size={24} />}
            <p>{label}</p>
        </Link>
    )
}

export default NavItem