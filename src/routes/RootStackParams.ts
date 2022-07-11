import { IUser } from "../@types/interfaces/IUsers"

export type RootStackParamList = {
    SignIn: undefined,
    SignUpFirstStep: undefined,
    SignUpSecondStep: { user: IUser },
    Confirmation: { nextScreenRoute: string, title: string, message: string }
    Profile: undefined,
    AppRoutes: undefined
}