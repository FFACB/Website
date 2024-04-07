import type { ToastSettings } from '@skeletonlabs/skeleton';

class ToastSettingsClient{

    toastSettings

    constructor(_toastSettings: ToastSettings){
        this.toastSettings  = _toastSettings
    }

    addMessage(message:string | null){
        this.toastSettings.message = message ?? ""
        return this;
    }

    addColor(cssClass:string){
        this.toastSettings.background = cssClass
        return this;
    }

    toToast(){
        return this.toastSettings
    }

}


export const ENREGISTREMENT_SUCCES : ToastSettingsClient =  new ToastSettingsClient({ timeout: 1000, message: "Enregistrement effecté !", background: 'variant-filled-success' })
export const ENREGISTREMENT_FAILED : ToastSettingsClient =  new ToastSettingsClient({ timeout: 2000, message: "Echec de l'enregistrement", background: 'variant-filled-error' })
export const ENREGISTREMENT_ERROR : ToastSettingsClient =  new ToastSettingsClient({ timeout: 2000, message: "Echec de l'enregistrement", background: 'variant-filled-error' })

export const SUPRESSION_SUCCES : ToastSettingsClient =  new ToastSettingsClient({ timeout: 1000, message: "Suppression effecté !", background: 'variant-filled-success' })
export const SUPRESSION_FAILED : ToastSettingsClient =  new ToastSettingsClient({ timeout: 2000, message: "Echec de la suppression", background: 'variant-filled-error' })
export const SUPRESSION_ERROR : ToastSettingsClient =  new ToastSettingsClient({ timeout: 2000, message: "Echec de la suppression", background: 'variant-filled-error' })

export const FAILED : ToastSettingsClient =  new ToastSettingsClient({ timeout: 2000, message: "Une erreur est survenue", background: 'variant-filled-error' })
export const ERROR : ToastSettingsClient =  new ToastSettingsClient({ timeout: 2000, message: "Une erreur est survenue", background: 'variant-filled-error' })




