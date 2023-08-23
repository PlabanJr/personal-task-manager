import { ERouteKeys } from "@/core/enums/app"

export type TPath = {
    icon?: any,
    label: string,
    href: string,
    routeKey: ERouteKeys
}

export type TAuthPath = Pick<TPath, 'label' | 'routeKey'>

