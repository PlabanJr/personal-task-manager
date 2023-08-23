import { ERouteKeys } from "@/core/enums/app";
import { TAuthPath, TPath } from "@/core/types/app";
import { CgCheck, CgLogIn, CgSandClock } from 'react-icons/cg';

const Paths: TPath[] = [
    { icon: CgLogIn, label: 'All Tasks', href: '/', routeKey: ERouteKeys.ALL_TASKS },
    { icon: CgCheck, label: 'Done', href: '/done', routeKey: ERouteKeys.DONE },
    { icon: CgSandClock, label: 'Pending', href: '/pending', routeKey: ERouteKeys.PENDING },

]

const AuthPaths: TAuthPath[] = [
    { label: 'Login', routeKey: ERouteKeys.LOGIN },
    { label: 'Signup', routeKey: ERouteKeys.SIGNUP },
]

export { AuthPaths, Paths };

